import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TagIcon from '@mui/icons-material/Tag';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { closeCreateChannelForm } from '../features/channelSlice';
import { addDoc, collection, query, serverTimestamp, where ,getDocs} from 'firebase/firestore';
import { db } from '../firebase/firebase';
const nameMaxLen = 80;
function CreateNewChannelForm() {
    const [channelName,setChannelName] = useState('');
    const [isUniqueName,setIsUniqueName] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        const checkIfValid = async ()=>{
            if(channelName.length > 0){
                const q = query(collection(db,'channels'),where('name','==',channelName));
                const docs = await getDocs(q);
                setIsUniqueName(docs.docs.length === 0);
            }
        }
        checkIfValid();
    },[channelName])
    const addNewChannel = async ()=>{
        if(channelName.length > 0){
            const q = query(collection(db,'channels'),where('name','==',channelName));
            const docs = await getDocs(q);
            if(docs.docs.length === 0){
                dispatch(closeCreateChannelForm());
                addDoc(collection(db,'channels'),{
                    name:channelName,
                    timestamp:serverTimestamp(),
                })
            }
        }
    }
  return (
    <FormOverlay onClick={(event)=>event.target === event.currentTarget && dispatch(closeCreateChannelForm())}>
        <CreateNewChannelFormContainer>
            <CloseIcon className='form__closeBtn' onClick={()=>dispatch(closeCreateChannelForm())}/>
            <FormTitle>
                Create a channel
            </FormTitle>
            <FormDescription>
                Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
            </FormDescription>
            <InputLabel>
                Name {channelName.length === 0 ? <span>Don’t forget to name your channel.</span> : !isUniqueName && <span>That name is already taken by a channel.</span>}
            </InputLabel>
            <InputContainer>
                <TagIcon/>
                <input type="text" placeholder='e.g. plan-budget' value={channelName} onChange={(e)=>setChannelName((prevState)=> e.target.value.length <= nameMaxLen ? e.target.value : prevState)}/>
                <span>{nameMaxLen-channelName.length}</span>
            </InputContainer>
            <CreateButton isUniqueName={isUniqueName} onClick={addNewChannel} channelName={channelName}>
                create
            </CreateButton>
        </CreateNewChannelFormContainer>
    </FormOverlay>
  )
}

export default CreateNewChannelForm


const FormOverlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #00000086;
`

const CreateNewChannelFormContainer = styled.div`
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 600px;
        padding: 30px;
        border-radius: 8px;
        border: 1px solid black;
        background-color: var(--white-color);
        > .form__closeBtn{
            position: absolute;
            top: 30px;
            right: 30px;
            color: gray;
            cursor: pointer;
        }
`

const FormTitle = styled.h2`
    color: black;
    font-weight: 600;
    font-size: 32px;
`
const FormDescription = styled.p`
    color:gray;
    padding: 20px 0;
`
const InputLabel = styled.label`
    color: black;
    font-weight: 500;
    display: block;
    > span{
        color:orange;
        margin-left:10px
    }
`

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 15px 0;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 10px 15px;
    color:gray;
    gap: 10px;
    > .MuiSvgIcon-root{
        color:gray;
    }
    > input{
        flex: 1;
        border:none;
        outline: none;
        font-size: 20px;
    }
    input::placeholder{
        color:gray;
    }

`
const CreateButton = styled.button`
    width: fit-content;
    text-transform: capitalize;
    padding: 10px 15px;
    font-weight: 600;
    border:none;
    border-radius: 4px;
    cursor: pointer;
    background-color:${props=>props.isUniqueName && props.channelName.length > 0 ? '#007a5a': '#ddd'};
    color:${props=>props.isUniqueName && props.channelName.length  > 0 ? 'var(--white-color)': 'black'};
    pointer-events: ${props=>props.isUniqueName && props.channelName.length  > 0 ? 'all': 'none'};
    display: block;
    margin: 0 auto;
`