import React, { Component } from "react";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props; //Use postId to delete comment

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

export default CommentFeed;
