import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
export default function useLogoutMutation(mode) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post("/api/auth/logout");
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data.message;
      } catch (error) {
        console.error(`Error logging out: ${error.message}`);
        throw error;
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", mode] });
    },
    onError: (error) => {
      console.error(`Error logging user out: ${error.message}`);
      toast.error(error.response?.data?.error || `Failed to log out `);
    },
  });
}
