import React from "react";
import Image from "next/image";
import moment from "moment";

function PostItem({ post }) {
  return (
    <div className="p-5 border rounded-lg my-5">
      <div className="flex gap-2 items-center">
        <Image
          src={post?.createdBy.image}
          alt="user-image"
          width={35}
          height={35}
          className="rounded-full"
        />
      </div>
      <div>
        <h2 className="font-bold">{post?.createdBy?.name}</h2>
        <h2 className="text-[12px]">
          {moment(Number(post?.createdAt)).format("DD MMM | hh:mm A")}
        </h2>
      </div>
      <div className='bg-slate-100 p-3 rounded-lg mt-4'>
        <h2>{post?.postText}</h2>
      </div>
    </div>
  );
}

export default PostItem;
