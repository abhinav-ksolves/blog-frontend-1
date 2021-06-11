import React,{useContext} from "react";
import { DeleteRounded } from "@material-ui/icons";
import UserContext from "../context/userContext";

const Comments = ({ comments }) => {

  const context = useContext(UserContext);
  
  const deleteComment = (commentId) => {
    fetch(`/api/deleteComment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_id: commentId }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="commentTitle">Comments</h2>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <div className="comment" key={comment.cid}>
              <h3>
                {comment.author} -{" "}
                {comment.dateCreated && comment.dateCreated.split("T")[0]}
                {comment.userId === context.userInfo.uid && (
                  <DeleteRounded
                    color="secondary"
                    className="deleteComment"
                    onClick={() => deleteComment(comment.cid)}
                  />
                )}
              </h3>
              <p>{comment.comment}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
