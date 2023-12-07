import { ScribeEntry } from "@prisma/client";
import { Document } from "langchain/document";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { loadQARefineChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe(
        "infer the mood of the person who wrote the journal entry. Use descriptive words to describe the mood."
      ),
    summary: z
      .string()
      .describe("provide a quick summary of the entire journal entry."),
    subject: z
      .string()
      .describe("quickly describe the subject of the journal entry."),
    sentimentScore: z
      .number()
      .describe(
        "conduct sentiment analysis of the journal entry and rate it on a scale from 0 to 100, where 0 is extremely negative, 50 is neutral, and 100 is extremely positive."
      ),
    negative: z
      .boolean()
      .describe(
        "is the provided journal entry negative? (i.e. does it contain any negative emotions?)."
      ),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that repersents the mood of the journal entry. Example #03ff07 for the color green can repersent happiness. Use vibrant colors."
      ),
  })
);

const getPrompt = async (entry) => {
  const formatted_schema_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the given format instructions, no matter what!\n{formatted_schema_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { formatted_schema_instructions },
  });

  const input = await prompt.format({
    entry: entry,
  });

  return input;
};

export const analyze = async (entry) => {
  const prompt = await getPrompt(entry);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.call(prompt);

  try {
    console.log(result);
    return parser.parse(result);
  } catch (error) {
    console.log(error);
  }
};

export const questionAnswer = async (question, entries) => {
  // construct document object based off entries to feed into model
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    });
  });

  // below finds the relevant entries based on the question passed in using a memory vector storage to find similarity
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relavantDocs = await store.similaritySearch(question);

  // load model
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  // creates a refine chain that we can pass in relevant documents
  const chain = loadQARefineChain(model);

  const answer = await chain.call({
    input_documents: relavantDocs,
    question:
      "Question: " +
      question +
      ". Give a single response to the question based on all the provided journal entries.",
  });

  return answer.output_text;
};
