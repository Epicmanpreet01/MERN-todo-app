import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUpdateTaskMutation(mode) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ task, id }) => {
      try {
        const res = await axios.post(`/api/todo/${id}`, task);
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data.data;
      } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Updated task successfully");
      queryClient.setQueriesData(["tasks", mode], (oldTasks) => {
        if (!Array.isArray(oldTasks)) return [data];
        return oldTasks.map((task) => {
          return task._id === data._id ? data : task;
        });
      });
    },
    onError: (error) => {
      console.error(`Error logging user out: ${error.message}`);
      toast.error(error.response?.data?.error || `Failed to update task`);
    },
  });
}
