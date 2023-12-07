"use client";

import { updateEntry } from "@/utils/api";
import { invertHexColor } from "@/utils/common";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [entryContent, setEntryContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, subject, color, negative } = analysis;
  const analysisData = [
    { name: "Summary", value: analysis?.summary || "Write about your day!" },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];
  const fontInvertedColor = invertHexColor(color, true);

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
      <div className="col-span-2 bg-white">
        {isLoading && <div>...Saving in progress</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-non"
          value={entryContent}
          onChange={(text) => setEntryContent(text.target.value)}
        />
      </div>

      <div className="col-span-1 bg-highlight">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2
            className="text-2xl font-bold"
            style={{ color: fontInvertedColor }}
          >
            Analysis
          </h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-4 py-4 flex items-center justify-between border-y border-white "
              >
                <span className="text-lg font-semibold mr-2">{item.name}</span>
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
