const ScribeCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div
      className="divide-y divide-background overflow-hiddin bg-highlight_white shadow-xl border-[3px] border-solid rounded-lg rounded-lgshadow"
      style={{ borderColor: entry.analysis.color }}
    >
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{entry.analysis?.summary || "Summary"}</div>
      <div className="px-4 py-4">{entry.analysis?.mood || "Mood"}</div>
    </div>
  );
};

export default ScribeCard;
