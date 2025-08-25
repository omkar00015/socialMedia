import { MoreVertical } from "lucide-react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_utils/GlobalApi";

function Comment_List({ commentList, userDetail }) {
  const [commentListData, setCommentListData] = useState(commentList);
  const onDeleteComment = (comment) => {
    GlobalApi.deleteComment(comment._id).then(resp => {
      const result = commentListData.filter(item => item._id !== comment._id )
      setCommentListData(result);
      if(resp) {
        toast.success("Awesome !!!", {
        description: "Comment Deleted Successfully",
        });
      }
    })
  }

  return (
    <div>
      {commentList.map((item, index) => (
        <div className=" flex p-3 border items-center rounded-lg m-2">
          <div className=" flex items-center gap-3 w-full">
            <Image
              src={item?.createdBy?.image}
              alt="user-image"
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className=" bg-slate-100 p-2 rounded-lg">{item.commentText}</h2>
          </div>
          {item?.createdBy?._id === userDetail?._id && (
            <Popover>
              <PopoverTrigger>
                <MoreVertical className=" h-5 w-5 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent>
                <Button className=' w-full flex gap-2 ' 
                variant='outlined'
                onClick = {() => onDeleteComment(item)}
                ><Trash/>
                Delete
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comment_List;
