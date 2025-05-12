import { useState } from "react";
import { MdChatBubble } from "react-icons/md";
import { useChatContext } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useChatContext();

  const unreadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );

  const modifiedNotifications = notifications.map((notification) => {
    const sender = allUsers.find(
      (user: any) => user._id === notification.senderId
    );
    return {
      ...notification,
      senderName: sender ? sender.name : "Unknown",
    };
  });

  console.log("unreadNotifications", unreadNotifications);
  console.log("modifiedNotifications", modifiedNotifications);

  return (
    <div className="relative">
      <MdChatBubble
        size={20}
        className="cursor-pointer"
        onClick={() => setIsOpen((current) => !current)}
      />
      {unreadNotifications.length > 0 && (
        <span className="absolute top-0 -mr-2 -mt-2 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {unreadNotifications.length}
        </span>
      )}
      {isOpen && (
        <div className="absolute bg-gray-100 px-2 py-1 w-50 right-0 top-8">
          {modifiedNotifications.length > 0 ? (
            modifiedNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer ${
                  notification.isRead ? "bg-gray-200" : "bg-blue-200"
                }`}
                onClick={() => {
                  markNotificationAsRead(
                    notification,
                    userChats,
                    user,
                    notifications
                  );
                  setIsOpen(false);
                }}
              >
                <div>
                  <p className="text-xs font-semibold">
                    {notification.senderName} sent you a message at{" "}
                    {new Date(notification.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No notifications</p>
          )}
          {modifiedNotifications.length > 0 && (
            <div
              className="cursor-pointer text-blue-500 hover:underline text-sm mt-2"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark all as read
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
