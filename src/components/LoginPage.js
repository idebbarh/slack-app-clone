import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import {auth,provider} from '../firebase/firebase'
function LoginPage() {
    const loginHandler = ()=>{
        signInWithPopup(auth,provider)
            .catch(error=>alert(error.message))
    }
  return (
    <LoginPageContainer>
        <SecondContainer>
            <SlackLogo src="https://a.slack-edge.com/bv1-10/slack_logo-ebd02d1.svg" />
            <LoginButton onClick={loginHandler}>
                <FcGoogle/>
                Sign In With Google
            </LoginButton>
        </SecondContainer>
    </LoginPageContainer>
  );
}

export default LoginPage;

const LoginPageContainer = styled.div`
    display: grid;
    place-content: center;
    height: 100vh;
`;
const SecondContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
`
const SlackLogo = styled.img`
    height: 40px;
    margin-bottom: 40px;
`;
const LoginButton = styled.button`
    padding: 10px 20px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10px;
    cursor: pointer;
    width: 100%;
    border:2px solid #4285f4;
    color:#4285f4;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    :hover{
        box-shadow: 0 1px 4px #0000004d;
    }
`;
