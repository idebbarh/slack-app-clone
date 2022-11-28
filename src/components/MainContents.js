import React from 'react'
import styled from 'styled-components'
import TagIcon from '@mui/icons-material/Tag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from '@mui/material';


function MainContents() {
  return (
    <MainContentsContainer>
        <MainContentsHeader>
            <ChannelName>
                <TagIcon/>
                channel name
                <ExpandMoreIcon/>
            </ChannelName>
        </MainContentsHeader>
        <MainContentsMessagesList>
            <MessageContainer>
                <MessageAvatar src='' sx={{ width: 34, height: 34 }} variant="rounded">
                    I
                </MessageAvatar>
                <MessageInfo>
                    <h3>usamdh07 <span>10PM</span></h3>
                    <p>test message</p>
                </MessageInfo>
            </MessageContainer>
            <MessageContainer>
                <MessageAvatar src='' sx={{ width: 34, height: 34 }} variant="rounded">
                    I
                </MessageAvatar>
                <MessageInfo>
                    <h3>usamdh07 <span>10PM</span></h3>
                    <p>test message</p>
                </MessageInfo>
            </MessageContainer>
            <MessageContainer>
                <MessageAvatar src='' sx={{ width: 34, height: 34 }} variant="rounded">
                    I
                </MessageAvatar>
                <MessageInfo>
                    <h3>usamdh07 <span>10PM</span></h3>
                    <p>test message</p>
                </MessageInfo>
            </MessageContainer>
            <MessageContainer>
                <MessageAvatar src='' sx={{ width: 34, height: 34 }} variant="rounded">
                    I
                </MessageAvatar>
                <MessageInfo>
                    <h3>usamdh07 <span>10PM</span></h3>
                    <p>test message</p>
                </MessageInfo>
            </MessageContainer>
            <MessageContainer>
                <MessageAvatar src='' sx={{ width: 34, height: 34 }} variant="rounded">
                    I
                </MessageAvatar>
                <MessageInfo>
                    <h3>usamdh07 <span>10PM</span></h3>
                    <p>test message</p>
                </MessageInfo>
            </MessageContainer>
            <MessageContainer>
                <MessageAvatar src='' sx={{ width: 34, height: 34 }} variant="rounded">
                    I
                </MessageAvatar>
                <MessageInfo>
                    <h3>usamdh07 <span>10PM</span></h3>
                    <p>test message</p>
                </MessageInfo>
            </MessageContainer>
        </MainContentsMessagesList>
        <MainContentsNewMessageContainer>
            <NewMessageForm>
                <FormHeader>

                </FormHeader>
                <FormInput>
                    
                </FormInput>
            </NewMessageForm>
        </MainContentsNewMessageContainer>
    </MainContentsContainer>
  )
}

export default MainContents

const MainContentsContainer = styled.div`
    flex:0.8;
    height: calc(100vh - 46px);
    overflow: auto;
`
const MainContentsHeader = styled.div`
    padding:15px 20px;
    border-bottom: 1px solid #e2e2e2;
    position: sticky;
    left:0;
    top:0;
    background-color: var(--white-color);
    z-index: 999;
`
const ChannelName = styled.div`
    display:flex;
    align-items: center;
    font-weight: 600;
    font-size: 21px;
    cursor: pointer;
    width: fit-content;
    > .MuiSvgIcon-root{
        font-size: 21px;
    }
`
const MainContentsMessagesList = styled.div`
    display: flex;
    flex-direction: column;
`

const MessageContainer = styled.div`
    padding: 30px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-top: 1px solid #e2e2e2;
    :hover{
        background-color: whitesmoke;
    }
`

const MessageAvatar = styled(Avatar)`
    cursor: pointer;
`

const MessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    > h3{
        font-weight: bold;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        > span{
            color:gray;
            font-weight: normal;
            font-size: 13px;
        }
    }
    > p{
        font-weight: normal;
    }
`

const MainContentsNewMessageContainer = styled.div`
    padding: 0 15px 30px 15px;
`

const NewMessageForm = styled.form`
    width: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    padding: 15px;
`