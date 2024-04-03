import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteLink } from "@/db/methods/links";

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, number>({
    mutationFn: deleteLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["links"] }),
  });
};
