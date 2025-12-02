"use client";

import { Status } from "@/app/generated/prisma/enums";
import { Select } from "@radix-ui/themes";

type Props = {};

const statues: { label: string; value?: Status }[] = [
  {
    label: "All",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssueStatusFilter = (props: Props) => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statues.map((status) => (
          <Select.Item key={status.label} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
