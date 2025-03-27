import updatePassword from "@/lib/actions/auth/updatePassword";
import { useMutation } from "@tanstack/react-query";

const useUpdatePassword = ({
  onSuccess = undefined,
}: {
  onSuccess?: () => void;
}) => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return { mutate, isPending, error };
};

export default useUpdatePassword;
