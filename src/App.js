import React from 'react';
import './App.css';
import Header from './components/Header';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import CreateNewChannelForm from './components/CreateNewChannelForm';
import { useSelector } from 'react-redux';
import { selectIsChannelFormOpen } from './features/channelSlice';
import {
  BrowserRouter,
} from "react-router-dom";
function App() {
  const isChannelFormOpen = useSelector(selectIsChannelFormOpen);
  return (
    <BrowserRouter>
        <div className="app">
          <Header/>
          <AppBodyContainer>
              <SideBar/>
          </AppBodyContainer>
          {isChannelFormOpen && <CreateNewChannelForm/>}
        </div>
      </BrowserRouter>
  );
}

export default App;

const AppBodyContainer = styled.div`
  display: flex;
`
