import AddPost from "../../components/posts/addPost";
import PostsList from "../../components/posts/postsList";

const Profile = () => {
  return (
    <>
      <AddPost />
      <PostsList isHome={false} />
    </>
  );
};

export default Profile;
