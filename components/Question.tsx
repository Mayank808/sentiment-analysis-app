"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const _answer = await askQuestion(question);
    setAnswer(_answer);
    setQuestion("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={question}
          placeholder="Ask a question?"
          className="border border-white px-4 py-2 text-lg rounded-lg"
        />

        <button
          type="submit"
          className=" bg-highlight_white mx-5 px-8 py-2 rounded-lg text-lg text-background font-bold"
        >
          Ask
        </button>
      </form>
      {loading && <div className="text-white">...loading</div>}
      {answer && <div className="text-white px-2 py-2">{answer}</div>}
    </div>
  );
};

export default Question;
