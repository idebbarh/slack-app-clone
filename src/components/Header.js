import React from 'react'
import styled from 'styled-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Avatar } from '@mui/material';
function Header() {
  return (
    <HeaderContainer>
        <HeaderLeft>
            <HeaderIcon>
                <AccessTimeIcon/>
            </HeaderIcon>
            <HeaderForm>
                <input type="text" placeholder='Search Username'/>
                <TuneIcon fontSize='small'/>
                <SearchIcon fontSize='small'/>
            </HeaderForm>
        </HeaderLeft>
        <HeaderRight>
            <HeaderIcon>
                <HelpOutlineIcon/>
            </HeaderIcon>
            <HeaderAvatar src='' sx={{ width: 30, height: 30 }}>
                I
                <FiberManualRecordIcon/>
            </HeaderAvatar>
        </HeaderRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
    background-color: var(--purple-color-10);
    display: flex;
    padding: 8px 15px;
    gap: 10px;
`
const HeaderLeft = styled.div`
    flex: 0.7;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    
`
const HeaderIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--second-white-color);
    cursor: pointer;
    > .MuiSvgIcon-root{
        transition: background-color 0.3s ease;
    }
    :hover{
        background-color:var(--purple-color-30);
        color: var(--white-color);
    }
`
const HeaderForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    background-color:var(--purple-color-30);
    border-radius: 4px;
    padding: 3px 10px;
    color: var(--white-color);
    gap: 3px;
    > input{
        flex: 1;
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--white-color);
    }
    input::placeholder{  
        color: var(--white-color);
    }
    > .MuiSvgIcon-root{
        cursor: pointer;
    }
`
const HeaderRight = styled.div`
        flex: 0.3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
`
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    position: relative;
    opacity: 0.8;
    overflow: visible !important;
    :hover{
        opacity: 1;
    }
    > .MuiSvgIcon-root{
        position: absolute;
        right: -3px;
        bottom: -2px;
        font-size: 18px;
        color: green;
    }

`