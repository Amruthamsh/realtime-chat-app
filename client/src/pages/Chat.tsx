import PotentialChats from "../components/chat/PotentialChats";
import UserChat from "../components/chat/UserChat";
import { useAuth } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
    useChatContext();
  const { user } = useAuth();

  return (
    <div className="flex flex-row gap-4">
      <div className="w-1/4 pl-4">
        <h1 className="text-xl text-amber-500">All Chats</h1>
        <PotentialChats />
        <div className="mt-2">
          {isUserChatsLoading && <p>Loading chats...</p>}
          {userChatsError && <p>Error: {userChatsError}</p>}
          {userChats.length > 0 ? (
            userChats.map((chat) => (
              <div
                key={chat._id}
                className="mb-2"
                onClick={() => updateCurrentChat(chat)}
              >
                <UserChat chat={chat} user={user} />
              </div>
            ))
          ) : (
            <p>No chats available.</p>
          )}
        </div>
      </div>
      <div className="w-3/4 pr-16 h-180">
        <h1 className="text-xl text-amber-500">Messages</h1>
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
