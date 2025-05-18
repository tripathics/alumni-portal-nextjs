"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SchemaForm from "@/components/forms";
import React from "react";
import updateMessages, { type UpdateMessagesProp } from "@/lib/actions/admin/content/updateMessages";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import useMessages from "@/hooks/queries/useMessages";
import { LoaderCircle } from "lucide-react";
import { SchemaField } from "@/components/forms/SchemaForm/Schema.type";
import { mediaUrl } from "@/lib/utils";
import Alert from "@/components/custom-ui/Alert";
import { toast } from "react-toastify";
import { queryKey } from "@/lib/constants/queryKey";

const schema: SchemaField[] = [
  {
    name: "full_name",
    type: "text",
    required: "Director's name is required",
    label: "Director's name"
  },
  {
    name: "email",
    type: "email",
    required: "Director's email is required",
    label: "Director's email"
  },
  {
    name: "phone",
    type: "text",
    required: "Director's phone is required",
    label: "Director's phone"
  },
  {
    name: "message",
    type: "textarea",
    required: "Director's message is required",
    label: "Director's message",
  },
  {
    name: "avatar",
    type: "file",
    required: "A picture of the director is required",
    label: "Director's picture",
    allowedFormats: ["image/png", "image/jpeg"],
  }
]

const DirectorsMessageForm: React.FC = () => {
  const queryClient = useQueryClient()
  const messageQuery = useMessages("director")
  const directorsMessage = messageQuery.data?.messages[0]

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMessages,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.messages] })
      toast.success(data?.message || 'Message updated!')
    }
  })

  const handleSubmit = (data: FieldValues) => {
    data.avatar = data.avatar[0]
    mutate({
      ...data as Omit<UpdateMessagesProp, 'message_from'>,
      message_from: "director",
    })
  }

  return messageQuery.isLoading
    ? <LoaderCircle className="animate-spin" />
    : (<div>
      {isError && (
        <Alert severity="error">
          {error.message}
        </Alert>
      )}
      {directorsMessage ? (
        <SchemaForm
          prefillData={{
            ...directorsMessage,
            avatar: mediaUrl(directorsMessage.avatar)
          }}
          schema={schema}
          onSubmit={handleSubmit}
          actions={(
            <div className="flex gap-2 *:grow">
              <Button variant="ghost">Cancel</Button>
              <Button loading={isPending} type="submit">Submit</Button>
            </div>
          )}
        />) : (
        <SchemaForm
          schema={schema}
          onSubmit={handleSubmit}
          actions={(
            <div className="flex gap-2 *:grow">
              <Button variant="ghost">Cancel</Button>
            </div>
          )}
        />
      )}
    </div>)
}

export default DirectorsMessageForm;
