import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useTasksQuery(mode) {
  if (mode === "/") mode = "all";
  return useQuery({
    queryKey: ["tasks", mode],
    queryFn: async () => {
      try {
        const res = await axios(`/api/todo/${mode}`);
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data.data;
      } catch (error) {
        console.error(`Error fetching tasks: ${error.message}`);
        return [];
      }
    },
  });
}
