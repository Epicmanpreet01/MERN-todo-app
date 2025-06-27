import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useAddTaskMutation(mode) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task) => {
      try {
        const res = await axios.post("/api/todo/", task);
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data.data;
      } catch (error) {
        console.error(`Error adding task: ${error.message}`);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Task added successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", mode] });
    },
    onError: (error) => {
      console.error(`Error adding task: ${error.message}`);
      toast.error(error.response?.data?.error || `Failed to add task `);
    },
  });
}
