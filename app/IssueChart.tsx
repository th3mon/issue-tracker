"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In-Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  const fill = "var(--accent-9)";

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fill }} />
          <YAxis tick={{ fill }} />
          <Bar dataKey="value" barSize={60} fill={fill} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
