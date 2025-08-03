import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

function PostList() {
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
    <div>
      {postList && postList.map((item,index) => (
        <div key ={index}>
            <PostItem post={item}/>
        </div>
      ))}
    </div>
  );
}

export default PostList;
