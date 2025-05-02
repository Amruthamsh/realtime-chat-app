import PotentialChats from "../components/chat/PotentialChats";
import UserChat from "../components/chat/UserChat";
import { useAuth } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatsError } = useChatContext();
  const { user } = useAuth();
  console.log("userChats", userChats);

  return (
    <div className="flex flex-row">
      <div className="w-1/4 px-4">
        <h1 className="text-xl text-amber-500">All Chats</h1>
        <PotentialChats />
        <div className="mt-2">
          {isUserChatsLoading && <p>Loading chats...</p>}
          {userChatsError && <p>Error: {userChatsError}</p>}
          {userChats.length > 0 ? (
            userChats.map((chat) => (
              <div key={chat._id} className="mb-2">
                <UserChat chat={chat} user={user} />
              </div>
            ))
          ) : (
            <p>No chats available.</p>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-xl text-amber-500">Messages</h1>
      </div>
    </div>
  );
};

export default Chat;
