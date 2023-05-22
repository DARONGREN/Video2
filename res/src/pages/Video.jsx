import React from 'react'
import styled from 'styled-components'
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Card from "../components/Card";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from '../components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from 'timeago.js';
import { subscription } from "../redux/userSlice";
import Recommendation from '../components/Recommendation';

const Container = styled.div`
display:flex;
gap:24px;
`;
const Content = styled.div`
flex:4.5;

`;

const VideoWrapper = styled.div`
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;


const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;
const ChangeDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`;
const ChangeName = styled.span`
font-weight: 500;
`;
const ChangeCounter = styled.span`
margin-top:5px;
margin-bottom:20px;
color: ${({theme})=> theme.textSoft};
font-size: 12px;
`;

const Desc = styled.p`
font-size: 14px;
`;

const Subscrip = styled.button`
background-color:#cc1a00;
font-weight:500;
color:white;
border:none;
border-radius:3px;
height:max-content;
padding:10px 20px;
cursor:pointer
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
export default function Video() {

  const { currentUser } = useSelector(state => state.user)
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch()
  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/user/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        console.log("aaaa: " + path)
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/user/like/${path}`);
    dispatch(like(path));
  };
  const handleDislike = async () => {
    await axios.put(`/user/dislike/${path}`);
    dispatch(dislike(path));
  };
  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/user/unsub/${channel._id}`)
      : await axios.put(`/user/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const handleDelete = async () => {
    await axios.delete(`/videos/${currentVideo._id}`)
    navigate("/");
  }
  return (
    <Container>
      <Content>
      <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            { (currentUser?._id === currentVideo?.userId) ? <Subscrip onClick={handleDelete}>
                Delete
            </Subscrip>
            : <></>
            }
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChangeDetail>
              <ChangeName>{channel.name}</ChangeName>
              <ChangeCounter>{channel.subscribers}</ChangeCounter>
              <Desc>{currentVideo?.desc}</Desc>
            </ChangeDetail>
          </ChannelInfo>
          <Subscrip onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscrip>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id}/>
      </Content>
              <Recommendation tags={currentVideo?.tags}/>
    </Container>
  )
}
