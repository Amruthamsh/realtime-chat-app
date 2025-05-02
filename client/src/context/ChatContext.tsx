import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { getUserChats } from "../services/chatService";
import { getAllUsers } from "../services/userService";
import User from "../types/UserType.ts";

type ChatContextType = {
  userChats: any[];
  isUserChatsLoading: boolean;
  userChatsError: string | null;
};

const chatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(true);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserChats = async () => {
      if (user?.id) {
        const response = await getUserChats(user.id);
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          setUserChats(data);
        } else {
          setUserChatsError(
            "Error fetching user chats: " + response.statusText
          );
        }

        setIsUserChatsLoading(false);
      }
    };

    fetchUserChats();
  }, [user]);

  return (
    <chatContext.Provider
      value={{ userChats, isUserChatsLoading, userChatsError }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(chatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};
