"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createIssueSchema,
  CreateIssueSchemaType,
} from "@/app/validationSchemas";
import { FormErrorText } from "@/app/components/FormErrorText";
import Spinner from "@/app/components/Spinner";

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueSchemaType>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);

      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <FormErrorText>{errors.title?.message}</FormErrorText>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <MDEditor
            textareaProps={{
              placeholder: "Description",
            }}
            {...field}
          />
        )}
      />
      <FormErrorText>{errors.description?.message}</FormErrorText>

      {error && (
        <Callout.Root color="tomato">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Button disabled={isSubmitting}>
        Submit New Issue
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};
export default NewIssuePage;
