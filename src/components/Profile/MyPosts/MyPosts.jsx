import React from "react";
import { MyPostFormHOC } from "./MyPostForm";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

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
    props.addPost(values.newPostMessage);
  };

  return (
    <div className={styles.postsWrapper}>
      <h2 className={styles.title}>My posts</h2>
      <div className={styles.postsTextarea}>
        <div className={styles.wrapperTextarea}>
          <div className={styles.avatar}>
            <img src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg" alt="" />
          </div>
          <MyPostFormHOC onSubmit={newPostMessage} />
        </div>
      </div>
      {postItem}
    </div>
  );
});

export default MyPosts;
