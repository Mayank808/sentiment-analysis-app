"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [entryContent, setEntryContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, subject, color, negative } = analysis;
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  useAutosave({
    data: entryContent,
    onSave: async (_entryContent) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _entryContent);
      setAnalysis(updated.analysis);
      setIsLoading(false);
    },
    interval: 1000,
  });

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0">
      <div className="col-span-2">
        {isLoading && <div>...Saving in progress</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={entryContent}
          onChange={(text) => setEntryContent(text.target.value)}
        />
      </div>

      <div className="border-l border-black/10 col-span-1">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-y border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
