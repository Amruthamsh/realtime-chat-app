import { useState, useEffect } from "react";
import { getUserById } from "../services/userService";

export const useFetchRecipient = (chat: any, user: any) => {
  const [recipient, setRecipient] = useState();
  const [error, setError] = useState<string | null>(null);

  const recipientId = chat?.members?.find((id: string) => id !== user?.id);
  useEffect(() => {
    const fetchRecipient = async () => {
      if (recipientId) {
        const response = await getUserById(recipientId);
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          setError(null);
          setRecipient(data);
        } else {
          setError("Error fetching recipient: " + response.statusText);
        }
      }
    };

    fetchRecipient();
  }, [recipientId]);
  return { recipient, error };
};
