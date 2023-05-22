import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';

const Container=styled.div`

`;

const Recom = styled.div`
flex:2.5;
`;


export default function Recommendation({tags}) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axios.get(`/videos/tags?tags=${tags}`);
        setVideos(res.data);
      };
      fetchVideos();
    }, [tags]);

  return (
    <div>{videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}</div>
  )
}
