import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useFormMutation(mode) {
  return useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await axios.post(`/api/auth/${mode}`, formData);
        const data = res.data;
        if (data.error) throw new Error(data.error);
        return data.data;
      } catch (error) {
        console.error(`Error signing up user: ${error.message} `);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(
        `${mode === "login" ? "Logged in" : "Signed up"} successfully`
      );
    },
    onError: (error) => {
      console.error(`Error while signing up user: ${error.message}`);
      toast.error(error.response?.data?.error || `Failed to ${mode} `);
    },
  });
}
