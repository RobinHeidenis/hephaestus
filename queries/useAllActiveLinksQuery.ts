import { useQuery } from "@tanstack/react-query";
import { getActiveLinks } from "@/db/methods/links";

export const useAllActiveLinksQuery = () => {
  return useQuery({
    queryKey: ["links", "active"],
    queryFn: getActiveLinks,
  });
};
