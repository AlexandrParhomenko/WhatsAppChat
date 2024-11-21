import { FC } from "react";
import { Message } from "../../types/types";
import moment from "moment";

interface OtherUserMessageProps {
  message: Message,
}
const OtherUserMessage: FC<OtherUserMessageProps> = ({message, ...props}) => {

  return (
    <div {...props} className={"otherUserMessage"}>
      <span>{message.textMessage}</span>
      <span className={"otherUserMessageDate"}>{moment(message.timestamp * 1000).format("HH:mm")}</span>
    </div>
  );
};

export default OtherUserMessage;