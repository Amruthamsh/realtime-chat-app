import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getUserChats, createChatService } from "../services/chatService";
import { getAllUsers } from "../services/userService";
import User from "../types/UserType.ts";

type ChatContextType = {
  userChats: any[];
  isUserChatsLoading: boolean;
  userChatsError: string | null;
  potentialChats: any[];
  createChat: (firstId: string, secondId: string) => Promise<void>;
};

const chatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  const [userChats, setUserChats] = useState<any[]>([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(true);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);
  const [potentialChats, setPotentialChats] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers();
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        const pChats = data.filter((potentialChat: any) => {
          let isChatCreated = false;
          if (user?.id === potentialChat._id) return false;
          if (userChats) {
            isChatCreated = userChats.some((chat: any) => {
              return (
                chat.members[0] === potentialChat._id ||
                chat.members[1] === potentialChat._id
              );
            });
          }

          return !isChatCreated;
        });
        setPotentialChats(pChats);
      }
    };
    getUsers();
  }, [userChats]);

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

  const createChat = useCallback(async (firstId: string, secondId: string) => {
    const response = await createChatService(firstId, secondId);
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      setUserChats((prevChats) => [...prevChats, data]);
    } else {
      setUserChatsError("Error creating chat: " + response.statusText);
    }
  }, []);

  return (
    <chatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
      }}
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
