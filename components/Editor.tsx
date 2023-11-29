"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [entryContent, setEntryContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: entryContent,
    onSave: async (_entryContent) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _entryContent);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      {isLoading && <div>...Saving in progress</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={entryContent}
        onChange={(text) => setEntryContent(text.target.value)}
      />
    </div>
  );
};

export default Editor;
