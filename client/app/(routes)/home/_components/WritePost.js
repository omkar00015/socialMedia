import { UserDetailContext } from "@/app/_context/UserDetailContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { globalLabels } from "@/app/_utils/GlobalLabels";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Image, Send, Video } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

function WritePost({getAllPost}) {
  const { user } = useUser();
  const [userInputPost, setUserInputPost] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onCreatePost = () => {
    const data = {
      postText: userInputPost,
      createdAt: Date.now().toString(),
      createdBy: userDetail._id,
      imageUrl: userDetail.image
    };
    GlobalApi.createPost(data).then((resp) => {
      setUserInputPost('');
      if (resp) {
        getAllPost();
        toast.success( "Awesome !!!", {
          description: 'Your Post Published Successfully',
        })
      }
    }, (error) => {
        toast.error("Something went wrong")
    });
  };

  useEffect(() => {
    if(UserDetailContext) {
      setUserDetail(UserDetailContext);
    }
  },[UserDetailContext]);

  return (
    <div>
      <h2 className="text-[30px] font-medium text-gray-600">
        {globalLabels.postLabels.hello}, {user.firstName}
      </h2>
      <h2 className="text-gray-400">{globalLabels.postLabels.newPostTitle}</h2>
      <div className="p-3 border rounded-lg mt-5 bg-slate-100">
        <h2>{globalLabels.postLabels.createPost}</h2>
        <div className="p-4 bg-white rounded-lg mt-2">
          <textarea
            placeholder={globalLabels.postLabels.whatsNew}
            className="outline-none w-full"
            onChange={(e) => setUserInputPost(e.target.value)}
            value={userInputPost}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex gap-5">
            <h2 className="flex gap-2 cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
              <Image className="h-5 w-5" /> Image
            </h2>
            <h2 className="flex gap-2 cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
              <Video className="h-5 w-5" /> Video
            </h2>
          </div>
          <Button
            className="bg-blue-500 rounded-xl gap-2 hover:bg-blue-700"
            disabled={!userInputPost?.length}
            onClick={()=>onCreatePost()}
          >
            <Send className="h-4 w-4 gap-2" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WritePost;
