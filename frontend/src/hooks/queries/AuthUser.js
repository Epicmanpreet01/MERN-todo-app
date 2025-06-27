import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAuthUserQuery() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/user/");
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data;
      } catch (error) {
        console.error(`Erroor fetching current user: ${error.message}`);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
