import React, { useState } from "react";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Avatar } from "@mui/material";
import {useSelector } from "react-redux";
import { selectUserInfo } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
function Header() {
  const userInfo = useSelector(selectUserInfo);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderIcon>
          <AccessTimeIcon />
        </HeaderIcon>
        <HeaderForm>
          <input type="text" placeholder="Search Username" />
          <TuneIcon fontSize="small" />
          <SearchIcon fontSize="small" />
        </HeaderForm>
      </HeaderLeft>
      <HeaderRight>
        <HeaderIcon>
          <HelpOutlineIcon />
        </HeaderIcon>
        <HeaderAvatar
          src={userInfo.photo}
          sx={{ width: 28, height: 28 }}
          variant="rounded"
          onClick={() => setIsLogoutOpen((prevState) => !prevState)}
        >
          {userInfo.email[0]}
        </HeaderAvatar>
      </HeaderRight>
      {isLogoutOpen && (
        <LogoutContainer>
          <UserInfo>
            <HeaderAvatar
              src={userInfo.photo}
              sx={{ width: 40, height: 40 }}
              variant="rounded"
            >
              {userInfo.email[0]}
            </HeaderAvatar>
            <p>
              {userInfo.email.split("@")[0]}
              <span>
                <FiberManualRecordIcon />
                active
              </span>
            </p>
          </UserInfo>
          <LogoutBtnContainer onClick={()=>signOut(auth)}>
            <LogoutBtn>
                Sign out of<span>{userInfo.email.split("@")[0]}</span>
            </LogoutBtn>
          </LogoutBtnContainer>

        </LogoutContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  background-color: var(--purple-color-10);
  display: flex;
  padding: 8px 15px;
  gap: 10px;
  position: relative;
`;
const HeaderLeft = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;
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
  > .MuiSvgIcon-root {
    transition: background-color 0.3s ease;
  }
  :hover {
    background-color: var(--purple-color-30);
    color: var(--white-color);
  }
`;
const HeaderForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  background-color: var(--purple-color-30);
  border-radius: 4px;
  padding: 3px 10px;
  color: var(--white-color);
  gap: 3px;
  @media (max-width: 901px) {
    width: 100%;
  }
  > input {
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--white-color);
  }
  input::placeholder {
    color: var(--white-color);
  }
  > .MuiSvgIcon-root {
    cursor: pointer;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
`;

const LogoutContainer = styled.div`
  width: 250px;
  border-radius: 6px;
  position: absolute;
  right: 15px;
  top: calc(100% + 10px);
  background-color: var(--white-color);
  z-index: 9999;
  border: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const UserInfo = styled.div`
  padding: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  > p {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: bold;
    > span {
      display: flex;
      align-items: center;
      gap: 3px;
      text-transform: capitalize;
      font-weight: 300;
      color: gray;
      font-size: 13px;
      > .MuiSvgIcon-root {
        font-size: 16px;
        color: green !important;
      }
    }
  }
`;
const LogoutBtnContainer = styled.div`
    padding: 10px 0;
    border-top: 1px solid #e2e2e2
`
const LogoutBtn = styled.button`
  overflow: hidden;
  text-transform: capitalize;
  padding: 5px 15px;
  display: flex;
  background-color: transparent;
  border: none;
  gap: 3px;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :hover{
    background-color: var(--active-color);
  }
`;
