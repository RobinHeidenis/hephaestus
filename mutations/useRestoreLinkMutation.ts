import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreLink } from "@/db/methods/links";

export const useRestoreLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["links"] }),
  });
};
