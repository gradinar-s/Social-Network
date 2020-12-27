import React from "react";
import { connect } from "react-redux";
import { MyPostFormHOC } from "./MyPostForm";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { addPostActionCreator } from "../../../redux/profileReducer";

// React.memo оптимизирует компонент за счёт того что не вызывает метод render() если props НЕ изменились
// Если изменился useState, то компонент повторно отрендерится

const MyPosts = React.memo((props) => {
  // делаем копию, и изменяем её. Т.к reverse - мутирущий метод массива
  let postItem = [...props.posts]
    .reverse()
    .map((posts) => (
      <Post
        name="Name Surname"
        key={posts.id}
        id={posts.id}
        post={posts.post}
        likesCount={posts.likesCount}
      />
    ));

  let newPostMessage = (values) => {
    props.addPostActionCreator(values.newPostMessage);
  };

  return (
    <div className={styles.postsWrapper}>
      <div className={styles.title}>
        {props.isOwner ? (
          `My posts`
        ) : (
          <div>
            Publication <span>{props.profile.fullName}</span>
          </div>
        )}
      </div>
      <div className={styles.postsTextarea}>
        <div className={styles.wrapperTextarea}>
          <MyPostFormHOC onSubmit={newPostMessage} />
        </div>
      </div>
      {postItem}
    </div>
  );
});

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    profile: state.profilePage.profile,
  };
};

export default connect(mapStateToProps, { addPostActionCreator })(MyPosts);
