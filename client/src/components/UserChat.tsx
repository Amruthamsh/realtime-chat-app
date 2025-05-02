import { useFetchRecipient } from "../hooks/useFetchRecipient";
import { RxAvatar } from "react-icons/rx";

const UserChat = ({ chat, user }: { chat: any; user: any }) => {
  const { recipient } = useFetchRecipient(chat, user);
  console.log(chat);
  return (
    <div className="flex flex-row items-center border-2 rounded-lg p-2 hover:bg-gray-100 cursor-pointer">
      <RxAvatar className="text-teal-500" size={36} />
      <div className="flex flex-col px-2 w-full">
        <div className="flex flex-row items-center justify-between">
          <h3 className="font-bold text-lg">{recipient?.name}</h3>
          <h3 className="text-sm">Date: 12/2/25</h3>
        </div>
        <p className="text-sm">Message</p>
      </div>
    </div>
  );
};

export default UserChat;
