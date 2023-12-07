"use client";

import { ResponsiveContainer, Line, XAxis, LineChart, Tooltip } from "recharts";
import CustomToolTip from "./Tooltip";

const SentimentGraph = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#9dd9d2"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomToolTip />} cursor={{ fill: "transparent" }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SentimentGraph;
