import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
height:calc(100vh - 56px);
color:${({theme})=>theme.text}
`;

const Wrapper = styled.div`
display:flex;
align-items:center;
flex-direction: column;
background-color:${({theme})=>theme.bgLighter};
border: 1px solid ${({theme})=>theme.soft};
padding:20px 50px;
gap:10px;
`;

const Title = styled.h1`
font-size:24px;
`;
const SubTitle = styled.h2`
font-weight:200;
font-size:20px;
`;
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
border-radius:3px;
border:none;
padding:10px 20px;
cursor:pointer;
font-weight:500;
background-color:${({theme})=>theme.soft};
color:${({theme})=>theme.textSoft};
`;
const More = styled.div`
display:flex;
margin-top:10px
font-size:12px;
color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
margin-left:50px;
`;
const Linka = styled.span`
margin-left:30px;
`;

export default function Signin() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispath = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault();
    dispath(loginStart());
    try{
      const res = await axios.post("/auth/signin", {name, password})
      dispath(loginSuccess(res.data))
      navigate("/")
      console.log("aaaaaaaayes")
    }catch(err){
      dispath(loginFailure())
    }
  }

  const signInWithGoogle = async () => {
    dispath(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispath(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispath(loginFailure());
      });
  };
  return (
    <Container>
        <Wrapper>
            <Title>SignIN</Title>
            <SubTitle>SignIN</SubTitle>
            <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
            <Input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>Sign in</Button>
            <Title>or</Title>
            <Button onClick={signInWithGoogle}>Signin with Google</Button>
            <Title>or</Title>
            <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
            <Input placeholder='email' onChange={e=>setEmail(e.target.value)}/>
            <Input type='password' placeholder='paswwowrd' onChange={e=>setPassword(e.target.value)}/>
            <Button>Sign up</Button>
        </Wrapper>
        <More>
            Englist
            <Links>
                <Linka>Help</Linka>
                <Linka>Help</Linka>
                <Linka>Help</Linka>
            </Links>
        </More>
    </Container>
  )
}
