import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createLink } from "@/db/methods/links";

export const useCreateLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, { title: string; url: string }>({
    mutationFn: ({ title, url }) => {
      return createLink(title, url);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["links"] }),
  });
};
