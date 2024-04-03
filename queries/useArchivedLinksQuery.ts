import { useQuery } from "@tanstack/react-query";
import { getArchivedLinks } from "@/db/methods/links";

export const useArchivedLinksQuery = () => {
  return useQuery({
    queryKey: ["links", "archived"],
    queryFn: getArchivedLinks,
  });
};
