import React from "react";

function useAction<T, P = void>({
  apiAction,
  execOnMount = undefined,
  onSuccess,
  onError,
  onSettled,
}: {
  apiAction: (params: P) => Promise<T>;
  execOnMount?: P | true;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const onSuccessRef = React.useRef(onSuccess);
  const onErrorRef = React.useRef(onError);
  const onSettledRef = React.useRef(onSettled);

  React.useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onSettledRef.current = onSettled;
  }, [onSuccess, onError, onSettled]);

  const exec = React.useCallback(
    async (params?: P, optimistic = false): Promise<T> => {
      setError(null);
      setLoading(optimistic ? false : true);
      try {
        const response = await apiAction(params as P);
        setData(response);
        if (onSuccessRef.current) onSuccessRef.current(response);
        return response;
      } catch (error) {
        setError(error as Error);
        if (onErrorRef.current) onErrorRef.current(error as Error);
        throw error;
      } finally {
        if (onSettledRef.current) onSettledRef.current();
        setLoading(false);
      }
    },
    [apiAction]
  );

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  React.useEffect(() => {
    if (execOnMount === true) {
      exec();
    } else if (execOnMount !== undefined) {
      exec(execOnMount);
    }
  }, [execOnMount, exec]);

  return {
    data,
    loading,
    error,
    exec,
    reset,
  };
}

export default useAction;
