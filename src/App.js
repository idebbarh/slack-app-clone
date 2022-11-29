import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import CreateNewChannelForm from './components/CreateNewChannelForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsChannelFormOpen } from './features/channelSlice';
import {login, logout, selectUserInfo} from './features/userSlice'
import {
  BrowserRouter,
} from "react-router-dom";
import MainContents from './components/MainContents';
import LoginPage from './components/LoginPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
function App() {
  const isChannelFormOpen = useSelector(selectIsChannelFormOpen);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        dispatch(login({displayName:user.displayName,email:user.email,photo:user.photoURL}))
      }else{
        dispatch(logout())
      }
    })
  },[])

  return (
    <BrowserRouter>
        {userInfo ? <div className="app">
          <Header/>
          <AppBodyContainer>
              <SideBar/>
              <MainContents/>
          </AppBodyContainer>
          {isChannelFormOpen && <CreateNewChannelForm/>}
        </div> : <LoginPage/>}
      </BrowserRouter>
  );
}

export default App;

const AppBodyContainer = styled.div`
  display: flex;
`
