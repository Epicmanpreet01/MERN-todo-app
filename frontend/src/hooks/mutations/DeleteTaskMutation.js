import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useDeleteTaskMutation(mode) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      try {
        const res = await axios.delete(`/api/todo/${id}`);
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data.data;
      } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Deleted task successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", mode] });
    },
    onError: (error) => {
      console.error(`Error logging user out: ${error.message}`);
      toast.error(error.response?.data?.error || `Failed to delete task`);
    },
  });
}
