import React from "react";

export type UseActionExec<T, P = void> = (options?: {
  params?: P;
  optimistic?: boolean;
}) => Promise<T | null>;

/**
 * Represents the result of a custom hook action.
 *
 * @template T - The type of the data returned by the action.
 * @template P - The type of the parameters accepted by the action. Defaults to `void`.
 */
export type UseActionResult<T, P = void> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  exec: UseActionExec<T, P>;
  reset: () => void;
};

function useAction<T, P = void>({
  apiAction,
  initialParams = undefined,
  onSuccess,
  onError,
  onSettled,
}: {
  apiAction: (params: P) => Promise<T>;
  initialParams?: P | true;
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

  const exec: UseActionExec<T, P> = React.useCallback(
    async (options) => {
      const { params, optimistic = false } = options || {};
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
        else throw error;
      } finally {
        if (onSettledRef.current) onSettledRef.current();
        setLoading(false);
      }
      return null;
    },
    [apiAction]
  );

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  React.useEffect(() => {
    if (initialParams === true) {
      exec();
    } else if (initialParams !== undefined) {
      exec({
        params: initialParams,
      });
    }
  }, [initialParams, exec]);

  return {
    data,
    loading,
    error,
    exec,
    reset,
  };
}

export default useAction;
