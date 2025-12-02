"use client";

import { Endpoints } from "@/app/Endpoints";
import { Status } from "@/app/generated/prisma/enums";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        const orderBy = searchParams.get("orderBy");

        if (status) {
          params.append("status", status);
        }

        if (orderBy) {
          params.append("orderBy", orderBy);
        }

        const query = params.size ? "?" + params.toString() : "";

        router.push(`${Endpoints.ISSUES}/${query}`);
      }}
    >
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
