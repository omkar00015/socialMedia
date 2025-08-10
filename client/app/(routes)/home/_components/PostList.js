import React from "react";
import PostItem from "./PostItem";

function PostList({ postList,updatePostList }) {
  return (
    <div>
      {postList ? (
        postList.map((item, index) => (
          <div key={index}>
            <PostItem post={item} updatePostList={() => updatePostList()}/>
          </div>
        ))
      ) : (
        <div>
          {[1, 2, 3].map((item, index) => {
            return (
              <div
                key={index}
                className="h-[100px] w-full bg-slate-200 animate-pulse my-5 rounded-lg"
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PostList;
