import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export const FormErrorText = ({ children }: PropsWithChildren) =>
  children && (
    <Text color="red" as="p">
      {children}
    </Text>
  );
