import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SendIcon from '@mui/icons-material/Send';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SideBarOption from './SideBarOption';
import TagIcon from '@mui/icons-material/Tag';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux';
import { openCreateChannelForm } from '../features/channelSlice';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

function SideBar() {
    const [isHiddenOptionsOpen,setIsHiddenOptionsOpen] = useState(false);
    const [isChannelsListOpen,setIsChannelsListOpen] = useState(true);
    const [channels,setChannels] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        const q = query(collection(db,'channels'),orderBy('timestamp','asc'));
        onSnapshot(q,querySnapshot=>{
            setChannels(querySnapshot.docs.map((doc,index)=>{
                return {...doc.data(),id:doc.id,isActive:index===querySnapshot.docs.length-1}
            }))
        })
    },[])
  return (
    <SideBarContainer>
        <SideBarHeader>
            <SideBarUserInfo>
                username
                <KeyboardArrowDownIcon/>
            </SideBarUserInfo>
            <AddCircleOutlineIcon/>
        </SideBarHeader>
        <SideBarOptionsContainer>
            <SideBarOption Icon={InsertCommentIcon} title='threads' isHidden={false}/>
            <SideBarOption Icon={MoreVertIcon} title='more' isHidden={false} setIsHiddenOptionsOpen={setIsHiddenOptionsOpen}/>
            {isHiddenOptionsOpen && <HiddenOptionsContainer>
                <SideBarOption Icon={MarkUnreadChatAltIcon} title='unreads' isHidden={true}/>
                <SideBarOption Icon={QuestionAnswerIcon} title='direct messages' isHidden={true}/>
                <SideBarOption Icon={AlternateEmailIcon} title='mentions & reactions' isHidden={true}/>
                <SideBarOption Icon={SendIcon} title='drafts & sent' isHidden={true}/>
                <SideBarOption Icon={TurnedInIcon} title='saved items' isHidden={true}/>
                <SideBarOption Icon={ApartmentIcon} title='slack connect' isHidden={true}/>
                <SideBarOption Icon={TagIcon} title='all channels' isHidden={true}/>
                <SideBarOption Icon={FolderCopyIcon} title='files' isHidden={true}/>
                <SideBarOption Icon={AssignmentIndIcon} title='people & user groups' isHidden={true}/>
                <SideBarOption Icon={AppsIcon} title='apps' isHidden={true}/>
            </HiddenOptionsContainer>}
        </SideBarOptionsContainer>
        <SideBarChannelsContainer>
            <SideBarOption Icon={isChannelsListOpen ? ExpandMoreIcon : ExpandLessIcon} title='channels' isHidden={false} extraIcons={[MoreVertIcon,AddIcon]} setIsChannelsListOpen={setIsChannelsListOpen}/>
            <ChannelsList>
                {channels.map((channel,index)=>{
                    return <SideBarOption Icon={TagIcon} title={channel.name} isHidden={false} isChannel={true} key={channel.id} isActive={channel.isActive} setChannels={setChannels} channelId={channel.id}/>
                }).filter((channel)=> {
                    return isChannelsListOpen || channel.props.isActive
                })}
            </ChannelsList>
            <AddNewChannelBtn onClick={()=>dispatch(openCreateChannelForm())}>
                <SideBarOption Icon={AddBoxIcon} title='add channels' isHidden={false}/>
            </AddNewChannelBtn>
        </SideBarChannelsContainer>
    </SideBarContainer>
  )
}

export default SideBar

const SideBarContainer = styled.div`
    position: relative;
    min-width: 250px;
    background-color:var(--purple-color-20);
    height: calc(100vh - 46px);
    flex: 0.2;
    ::before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: var(--purple-color-30);
    }
`

const SideBarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid var(--purple-color-30);
    color: var(--white-color);
    :hover{
        background-color: var(--purple-color-10);
    }
    cursor: pointer;
    > .MuiSvgIcon-root{
        font-size: 36px;
    }
`

const SideBarUserInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 21px;
    font-weight: bold;
    > .MuiSvgIcon-root{
        font-size: 18px;
    }
`

const SideBarOptionsContainer = styled.div`
    border-bottom: 1px solid var(--purple-color-30);
    position: relative;
    padding: 10px 0px;
`
const HiddenOptionsContainer = styled.div`
    position: absolute;
    background-color: var(--white-color);
    border : 1px solid whitesmoke;
    padding: 15px 0;
    border-radius: 8px;
    width: 300px;
    top: calc(100% - 10px);
    left: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const SideBarChannelsContainer = styled.div`

`

const ChannelsList = styled.div`

`

const AddNewChannelBtn = styled.button`
    background: none;
    border: none;
    outline: none;
    width:100%
`