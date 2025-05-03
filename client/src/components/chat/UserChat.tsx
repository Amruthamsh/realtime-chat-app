import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { RxAvatar } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { useChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }: { chat: any; user: any }) => {
  const { recipient } = useFetchRecipient(chat, user);
  const { onlineUsers } = useChatContext();

  const isOnline = onlineUsers?.some((user) => user.userId === recipient?._id);

  return (
    <div className="flex flex-row items-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-100 cursor-pointer">
      <RxAvatar className="text-teal-500" size={36} />

      <div className="flex flex-col px-2 w-full">
        <div className="flex flex-row items-center justify-between relative">
          <h3 className="font-bold text-lg">{recipient?.name}</h3>
          <h3 className="text-sm">Date: 12/2/25</h3>
          {isOnline && (
            <FaCircle
              className="text-green-500 absolute right-0 top-0 -mt-1 -mr-3"
              size={12}
            />
          )}
        </div>
        <p className="text-sm">Message</p>
      </div>
    </div>
  );
};

export default UserChat;
