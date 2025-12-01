"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Issue, User } from "@/app/generated/prisma/client";
import { Select } from "@radix-ui/themes";
import { Endpoints } from "@/app/Endpoints";
import { Skeleton, SkeletonThemeWithSetup } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
  const { data: users = [], error, isLoading } = useUsers();

  if (isLoading) {
    return (
      <SkeletonThemeWithSetup>
        <Skeleton height={32} />
      </SkeletonThemeWithSetup>
    );
  }

  if (error) {
    return null;
  }

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(Endpoints.API_ISSUES + issue.id, {
        assigned_to_user_id: userId || null,
      });
    } catch {
      toast.error("Cannot use assign user");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assigned_to_user_id || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get(Endpoints.API_USERS).then((responce) => responce.data),
    staleTime: 60000,
    retry: 3,
  });

export default AssigneeSelect;
