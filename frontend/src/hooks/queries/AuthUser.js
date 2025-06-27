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
        console.log(data);
        return data;
      } catch (error) {
        console.error(`Erroor fetching current user: ${error.message}`);
        return error;
      }
    },
    retry: 1,
  });
}
