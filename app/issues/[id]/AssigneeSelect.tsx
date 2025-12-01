"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/generated/prisma/client";
import { Select } from "@radix-ui/themes";
import { Endpoints } from "@/app/Endpoints";
import { Skeleton, SkeletonThemeWithSetup } from "@/app/components";

const AssigneeSelect = () => {
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get(Endpoints.API_USERS).then((responce) => responce.data),
    staleTime: 60000,
    retry: 3,
  });

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

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
