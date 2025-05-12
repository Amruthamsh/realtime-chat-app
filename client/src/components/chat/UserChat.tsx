import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { RxAvatar } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { useChatContext } from "../../context/ChatContext";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";

const UserChat = ({ chat, user }: { chat: any; user: any }) => {
  const { recipient } = useFetchRecipient(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useChatContext();

  // const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );

  const thisUserNotifications = unreadNotifications?.filter(
    (notification) => notification.senderId === recipient?._id
  );

  const isOnline = onlineUsers?.some((user) => user.userId === recipient?._id);

  console.log("thisUserNotifications", thisUserNotifications);

  const truncateText = (text: string) => {
    if (text.length > 20) {
      return text.substring(0, 20) + "...";
    }
    return text;
  };

  return (
    <div
      className="flex flex-row items-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        if (thisUserNotifications?.length > 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <RxAvatar className="text-teal-500" size={36} />
      <div className="flex flex-col px-2 w-full">
        <div className="flex flex-row items-center justify-between relative">
          <h3 className="font-bold text-lg">{recipient?.name}</h3>
          {/* <h3 className="text-sm">{latestMessage?.createdAt}</h3> */}
          <h3 className="text-sm">12/11/25</h3>
          {isOnline && (
            <FaCircle
              className="text-green-500 absolute right-0 top-0 -mt-1 -mr-3"
              size={12}
            />
          )}
        </div>
        <div className="flex flex-row items-center justify-between">
          {/* <p className="text-sm">
            {latestMessage?.text && truncateText(latestMessage?.text)}
          </p> */}
          <p className="text-sm">Message</p>
          {thisUserNotifications?.length > 0 && (
            <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {thisUserNotifications.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChat;
