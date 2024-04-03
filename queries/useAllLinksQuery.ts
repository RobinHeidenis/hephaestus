import { useQuery } from "@tanstack/react-query";
import { getAllLinks } from "@/db/methods/links";

export const useAllLinksQuery = () => {
  return useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });
};
