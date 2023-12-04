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
          disabled={loading}
          onChange={onChange}
          type="text"
          value={question}
          placeholder="Ask a question?"
          className="border border-black/20 px-2 py-2 text-lg rounded-lg"
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
      {loading && (<div>...loading</div>)}
    </div>
  );
};

export default Question;
