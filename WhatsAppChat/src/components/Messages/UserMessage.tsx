import { FC } from "react";
import { Message } from "../../types/types";
import moment from "moment";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

interface UserMessageProps {
  message: Message,
}

const UserMessage: FC<UserMessageProps> = ({ message, ...props }) => {
  return (
    <div {...props} className={"userMessage"}>
      <span>{message.textMessage}</span>
      <span className={"userMessageDate"}>{moment(message.timestamp * 1000).format("HH:mm")}</span>
      {message.statusMessage === "sent" ?
        <IoCheckmark style={{ position: "relative", top: 8, marginLeft: 1 }} /> : message.statusMessage === "read" ?
          <IoCheckmarkDone color={"#128acb"} style={{ position: "relative", top: 8, marginLeft: 1 }} /> :
          <IoCheckmarkDone style={{ position: "relative", top: 8, marginLeft: 1 }} />}
    </div>
  );
};

export default UserMessage;