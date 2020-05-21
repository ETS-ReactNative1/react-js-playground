import React from "react";
import { connect } from "react-redux";
// Actions
import { fetchPostsAndUsers, selectPost } from "../../actions/postsAction";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  renderList() {
    // mapStatesToProps holds 'posts' object
    if (this.props.posts.length <= 0) {
      return (
        <div>
          <h4>No posts found</h4>
        </div>
      );
    }
    return this.props.posts.map((post) => {
      return (
        <div className="ui raised link card" key={post.id}>
          <div className="content" onClick={() => this.props.selectPost(post)}>
            <div className="header">{post.title}</div>
            <div
              className="description"
              style={{ overflow: "hidden", wordBreak: "break-all" }}
            >
              <p>{post.description}</p>
            </div>
          </div>
          <div className="extra content">
            <div className="right floated">
              <Link
                to={`/posts/edit/${post.id}`}
                className="ui mini button primary"
              >
                Edit
              </Link>
              <Link
                to={`/posts/delete/${post.id}`}
                className="ui mini button negative"
              >
                Delete
              </Link>
            </div>
            <UserHeader userId={post.user_id}></UserHeader>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

const mapStatesToProps = (state) => {
  // State property has access to all the reducers key:value refer combineReducers in reducers/index.js
  return { posts: Object.values(state.posts) };
};

// Export the component with react-redux connect() to make use of actions, reducers
export default connect(mapStatesToProps, { fetchPostsAndUsers, selectPost })(
  PostList
);
