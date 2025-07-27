import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export function useCreateUser() {
  const createUser = useMutation(api.users.user.createUser);
  return async (formData: FormData) => {
    const user = await createUser({
      name: formData.get("artist") as string,
      email: "",
      // avatar: "",
      bio: "",
    });
    return user;
  };
}
