import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import TagIcon from "@mui/icons-material/Tag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar } from "@mui/material";
import NewMessageFormOption from "./NewMessageFormOption";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import LinkIcon from "@mui/icons-material/Link";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ViewListIcon from "@mui/icons-material/ViewList";
import CodeIcon from "@mui/icons-material/Code";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import AddIcon from "@mui/icons-material/Add";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import SendIcon from "@mui/icons-material/Send";
import { useLocation } from "react-router";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectChannelName } from "../features/channelSlice";
import { selectUserInfo } from "../features/userSlice";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  return [date, month, year, hour, min];
}
function MainContents() {
  const [messageValue, setMessageValue] = useState("");
  const [channelMessages, setChannelMessages] = useState([]);
  const location = useLocation();
  const channelName = useSelector(selectChannelName);
  const userInfo = useSelector(selectUserInfo);
  const lastMsgElem = useRef(null);
  useEffect(()=>{
    if(lastMsgElem.current){
        lastMsgElem.current.scrollIntoView({behavior:'smooth'})
    }
  },[channelMessages])
  useEffect(() => {
    if (location.pathname !== "/") {
      const channelDocIc = location.pathname.slice(1);
      const q = query(
        collection(doc(db, "channels", channelDocIc), "messages"),
        orderBy("timestamp")
      );
      onSnapshot(q, (querySnapshot) => {
        setChannelMessages(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    }
  }, [location]);
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (messageValue.length > 0) {
      const channelDocIc = location.pathname.slice(1);
      addDoc(collection(doc(db, "channels", channelDocIc), "messages"), {
        message: messageValue,
        timestamp: serverTimestamp(),
        creatorName: userInfo.email.split("@")[0],
        creatorPhoto: userInfo.photo,
        creatorEmail: userInfo.email,
      });
      setMessageValue("");
    }
  };
  const messagesElem = channelMessages.map((message,index) => {
    const time = timeConverter(message.timestamp && message.timestamp.seconds);
    return (
      <MessageContainer key={message.id}>
        <span className="message__day">
          {time[0]},{time[1]} {time[2]}
        </span>
        <MessageAvatar
          src={message.creatorPhoto}
          sx={{ width: 34, height: 34 }}
          variant="rounded"
        >
          {message.creatorEmail[0]}
        </MessageAvatar>
        <MessageInfo>
          <h3>
            {message.creatorName}
            <span>
              {time[3]}:{time[4]} {time[3] >= 1 && time[3] <= 12 ? "AM" : "PM"}
            </span>
          </h3>
          <p>{message.message}</p>
        </MessageInfo>
      </MessageContainer>
    );
  });
  return (
    <MainContentsContainer>
      <MainContentsHeader>
        <ChannelName>
          <TagIcon />
          {channelName}
          <ExpandMoreIcon />
        </ChannelName>
      </MainContentsHeader>
      <WarningMessageContainer>
        <CampaignIconContainer>
          <CampaignIcon />
        </CampaignIconContainer>
        <WarningInfo>
          <p className="warning__header">
            You’re looking at the <span>#{channelName}</span> channel
          </p>
          <p className="warning__text">
            This is the one channel that will always include everyone. It’s a
            great spot for announcements and team-wide conversations.
          </p>
          <button className="warning__btn">
            <PersonAddAlt1Icon />
            Add people
          </button>
        </WarningInfo>
      </WarningMessageContainer>
      <MainContentsMessagesList>
            {messagesElem}
            <ScrollElem ref={lastMsgElem}/>
        </MainContentsMessagesList>
      <MainContentsNewMessageContainer>
        <NewMessageForm>
          <FormHeader>
            <NewMessageFormOption Icon={FormatBoldIcon} />
            <NewMessageFormOption Icon={FormatItalicIcon} />
            <NewMessageFormOption Icon={StrikethroughSIcon} />
            <NewMessageFormOption Icon={LinkIcon} />
            <NewMessageFormOption Icon={ListAltIcon} />
            <NewMessageFormOption Icon={ViewListIcon} />
            <NewMessageFormOption Icon={CodeIcon} />
            <NewMessageFormOption Icon={DeveloperModeIcon} />
          </FormHeader>
          <input
            type="text"
            placeholder="Message"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <FormBottom>
            <NewMessageFormOption Icon={AddIcon} />
            <NewMessageFormOption Icon={EmergencyRecordingIcon} />
            <NewMessageFormOption Icon={KeyboardVoiceIcon} />
            <NewMessageFormOption Icon={TagFacesIcon} />
            <NewMessageFormOption Icon={AlternateEmailIcon} />
            <NewMessageFormOption Icon={FormatColorTextIcon} />
            <FormSubmit
              messageValue={messageValue}
              onClick={(e) => sendMessageHandler(e)}
            >
              <SendIcon />
            </FormSubmit>
          </FormBottom>
        </NewMessageForm>
      </MainContentsNewMessageContainer>
    </MainContentsContainer>
  );
}

export default MainContents;

const MainContentsContainer = styled.div`
  flex: 0.8;
  height: calc(100vh - 46px);
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const MainContentsHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e2e2e2;
  position: sticky;
  left: 0;
  top: 0;
  background-color: var(--white-color);
  z-index: 999;
`;
const ChannelName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 21px;
  cursor: pointer;
  width: fit-content;
  > .MuiSvgIcon-root {
    font-size: 21px;
  }
`;
const WarningMessageContainer = styled.div`
  padding: 30px 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;
const CampaignIconContainer = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 6px;
  background-color: #f4ede4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  > .warning__header {
    font-weight: bold;
    > span {
      color: #1164a3;
    }
  }
  > .warning__text {
    color: gray;
  }

  > .warning__btn {
    width: fit-content;
    cursor: pointer;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
    color: #1164a3;
    font-weight: bold;
  }
`;
const MainContentsMessagesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  padding: 30px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #e2e2e2;
  position: relative;
  :hover {
    background-color: whitesmoke;
  }
  > .message__day {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--white-color);
    padding: 5px 10px;
    border: 1px solid #e2e2e2;
    border-radius: 15px;
    font-weight: 500;
    font-size: 13px;
    cursor: pointer;
    :hover {
      box-shadow: 0 1px 4px #0000004d;
    }
  }
`;

const MessageAvatar = styled(Avatar)`
  cursor: pointer;
`;

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  > h3 {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    > span {
      color: gray;
      font-weight: normal;
      font-size: 13px;
    }
  }
  > p {
    font-weight: normal;
  }
`;

const MainContentsNewMessageContainer = styled.div`
  padding: 0 15px 30px 15px;
  position: sticky;
  left: 0;
  bottom: 0;
  z-index: 999;
  background-color: var(--white-color);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const NewMessageForm = styled.form`
  width: 100%;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  > input {
    background: none;
    border: none;
    outline: none;
    padding: 15px 20px;
    width: 100%;
    ::placeholder {
      font-size: 18px;
      color: gray;
    }
  }
`;

const FormHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: whitesmoke;
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const FormBottom = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const FormSubmit = styled.button`
  display: block;
  width: fit-content;
  margin-left: auto;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${(props) =>
    props.messageValue.length > 0 ? "#007a5a" : "transparent"};
  pointer-events: ${(props) =>
    props.messageValue.length > 0 ? "all" : "none"};
  .MuiSvgIcon-root {
    color: ${(props) =>
      props.messageValue.length > 0 ? "var(--white-color)" : "gray"};
  }
`;

const ScrollElem = styled.div`
    width: 100%;
`