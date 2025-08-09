"use client"
import React, {useState, useEffect} from 'react'
import Banner from './_components/Banner'
import { useUser } from '@clerk/nextjs'
import WritePost from './_components/WritePost'
import PostList from './_components/PostList'
import GlobalApi from '@/app/_utils/GlobalApi'

function Home() {
  const {user} = useUser();
  const [postList, setPostList] = useState([]);

  const getAllPost = () => {
    GlobalApi.getAllPost().then((resp) => {
      setPostList(resp.data);
    });
  };

  useEffect(() => {
    getAllPost()
  },[]);
  
  return (
    <div className='p-5 px-10'>
    {!user ?
      <Banner/>
      :
      <WritePost getAllPost={() => getAllPost()}/>}
      <PostList postList={postList}/>
    </div>
  )
}

export default Home