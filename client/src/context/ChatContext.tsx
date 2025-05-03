import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getUserChats, createChatService } from "../services/chatService";
import {
  getMessagesService,
  sendTextMessageService,
} from "../services/messagesService";
import { getAllUsers } from "../services/userService";
import User from "../types/UserType.ts";
import { io } from "socket.io-client";

type ChatContextType = {
  userChats: any[];
  isUserChatsLoading: boolean;
  userChatsError: string | null;
  potentialChats: any[];
  currentChat: any;
  createChat: (firstId: string, secondId: string) => Promise<void>;
  updateCurrentChat: (chat: any) => void;
  messages: any[];
  isMessagesLoading: boolean;
  messagesError: string | null;
  sendTextMessage: (
    textMessage: string,
    sender: string,
    currentChatId: string,
    setTextMessage: (text: string) => void
  ) => Promise<void>;
  onlineUsers: any[];
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
  const [currentChat, setCurrentChat] = useState<any>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<any>(null);
  const [sendTextMessageError, setSendTextMessageError] = useState<
    string | null
  >(null);
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  console.log("userChats", userChats);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null || user === null) return;
    socket.emit("addNewUser", user?.id);
    socket.on("getOnlineUsers", (res: any[]) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send message
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members?.find(
      (id: string) => id !== user?.id
    );
    console.log("recipientId", recipientId);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // receive message
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res: any) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prevMessages) => [...prevMessages, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

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
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getUserChats(user.id);

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

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getMessagesService(currentChat?._id);

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;

        setMessages(data);
      } else {
        setMessagesError("Error fetching user chats: " + response.statusText);
      }

      setIsMessagesLoading(false);
    };

    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (
      textMessage: string,
      sender: string,
      currentChatId: string,
      setTextMessage: (text: string) => void
    ) => {
      if (!textMessage) return console.log("No message to send");
      console.log(currentChatId);
      const response = await sendTextMessageService(
        textMessage,
        sender,
        currentChatId
      );
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;

        setNewMessage(data);
        setMessages((prevMessages) => [...prevMessages, data]);
        setTextMessage("");
      } else {
        setSendTextMessageError(
          "Error sending message: " + response.statusText
        );
      }
    },
    []
  );

  const updateCurrentChat = useCallback((chat: any) => {
    setCurrentChat(chat);
  }, []);

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
        currentChat,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
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
