import { Text } from "@radix-ui/themes";

type Props = {
  message: string | undefined;
};

export const FormErrorText = ({ message }: Props) =>
  message && (
    <Text color="red" as="p">
      {message}
    </Text>
  );
