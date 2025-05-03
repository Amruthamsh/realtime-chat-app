import { useChatContext } from "../../context/ChatContext";
import { FaCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const PotentialChats = () => {
  const { potentialChats, createChat, onlineUsers } = useChatContext();
  const { user } = useAuth();

  return (
    <div className="flex flex-wrap gap-1">
      {potentialChats.length > 0 ? (
        potentialChats.map((potentialChatUser) => (
          <div
            key={potentialChatUser._id}
            className="bg-blue-200 rounded-lg p-2 hover:bg-blue-300 cursor-pointer relative"
            onClick={() => createChat(potentialChatUser._id, user!.id)}
          >
            {onlineUsers.some(
              (user) => user.userId === potentialChatUser._id
            ) && (
              <FaCircle
                className="text-green-500 absolute top-0 right-0 -mr-1"
                size={12}
              />
            )}

            <h3 className="font-bold text-sm">{potentialChatUser.name}</h3>
          </div>
        ))
      ) : (
        <p>No potential chats available.</p>
      )}
    </div>
  );
};

export default PotentialChats;
