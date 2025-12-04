import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma";

type Color = "red" | "violet" | "green";
type Props = {
  status: Status;
};

const statusMap: Record<Status, { label: string; color: Color }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

export const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};
