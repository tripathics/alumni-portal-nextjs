"use client"
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/lib/constants/queryKey";
import fetchMessages from "@/lib/actions/public/fetchMessages";

const useMessages = (messageFrom?: "director" | "president") => {
  const messagesQuery = useQuery({
    queryKey: [queryKey.messages, messageFrom],
    queryFn: async () => fetchMessages(messageFrom)
  })

  return messagesQuery;
}

export default useMessages
