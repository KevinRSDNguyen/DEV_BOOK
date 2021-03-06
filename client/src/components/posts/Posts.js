import React, { Component } from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    const initialPosts = 10;
    this.props.getPosts(initialPosts);
  }
  loadMore = () => {
    const { posts } = this.props.post;
    const skip = posts.length;
    const newPostsToLoad = 10;
    this.props.getPosts(newPostsToLoad, skip, posts);
  };
  render() {
    const { posts, loading } = this.props.post;
    const { isAuthenticated } = this.props.auth;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {isAuthenticated ? <PostForm /> : null}
              {postContent}
              <button
                onClick={this.loadMore}
                className="btn btn-lg btn-light d-block m-auto"
              >
                Load more Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
