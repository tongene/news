"use client"

import { InitialComments , SetCommentsProps } from "@/app/types";
import CommentComp from "./CommentComp";
function sortAscending(pb:InitialComments, pa:InitialComments){ 
  return (pb?.id ??0)-( pa?.id ??0);
 }
const AllComments: React.FC<SetCommentsProps> = ({ setActiveIdx, isEditingComment,setShareOptions, setIsEditingComment, comments, commentsByParentId, setCommentObj, 
  user, show, setShow, imgIndex ,activeIdx, shareOptions, replyId, setReplyId, setActiveCommentReply, activeCommentReply,commentObj, setEditId, likeCommAction, setUserActions, userActions,postReply, setPostReply, commentCommAction, deleteCommAction, selectedImages, setSelectedImages }) => {  
 const commentTitles=comments?.sort(sortAscending)

 return (
<> 
<div className="max-w-2xl m-auto">    
{comments.reverse()?.map((comment:InitialComments, i:number) => (
<div key={i}> 
 <CommentComp  
comments={comments}    
commentsByParentId={commentsByParentId}
post={{}}
user={user}
commentObj={commentObj} 
setCommentObj={setCommentObj}
comment={comment}
show={show}
setEditId={setEditId}
setShow={setShow}
imgIndex={imgIndex}  
activeIdx={activeIdx} 
setActiveIdx={setActiveIdx} 
shareOptions={shareOptions}
setShareOptions={setShareOptions} 
setIsEditingComment={setIsEditingComment}
isEditingComment={isEditingComment}
replyId={replyId}
setReplyId={setReplyId}
setActiveCommentReply={setActiveCommentReply}
activeCommentReply={activeCommentReply}
likeCommAction={likeCommAction} 
setUserActions={setUserActions}
userActions={userActions}
postReply={postReply}
setPostReply={setPostReply}
commentCommAction={commentCommAction}
deleteCommAction={deleteCommAction}
selectedImages={selectedImages}
setSelectedImages={setSelectedImages}
/>   

</div>))} 
</div> 
</> )
}

export default AllComments

