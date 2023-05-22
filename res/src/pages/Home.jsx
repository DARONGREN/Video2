import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import Card from '../components/Card';
import axios from "axios"

const Container = styled.div`
display:flex;
justify-content:flex-start;
flex-wrap:wrap;
gap:15px;
`;

export default function Home({type}) {

  const [video, setVideo] = useState([])
  useEffect(()=>{
    const fetchVideo = async () => {
      const res = await axios.get(`/videos/${type}`)
      setVideo(res.data)
    }
    fetchVideo()
  }, [type])
  return (
    <Container>
        {video.map((video) => (
          <Card key={video._id} video={video}/>

          ))}
        
    </Container>
  )
}
