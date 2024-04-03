import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveLink } from "@/db/methods/links";

export const useArchiveLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["links"] }),
  });
};
