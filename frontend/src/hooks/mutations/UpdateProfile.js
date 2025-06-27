import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      try {
        const res = await axios.post("/api/user/", user);
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data.data;
      } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      document.getElementById("my_modal_2").close();
    },
    onError: (error) => {
      console.error(`Error updating profile: ${error.message}`);
      toast.error(error.response?.data?.error || `Failed to update profile`);
    },
  });
}
