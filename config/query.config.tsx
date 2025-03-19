"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 300000,
      },
    },
  });

export const QueryProvider = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(() => createQueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};
