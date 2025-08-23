import { Avatar, Card } from "flowbite-react";
import { formatDate } from "../../utils/formatDate";
import { CgDetailsMore } from "react-icons/cg";
import { FaComment } from "react-icons/fa";
import { Link, useParams } from "react-router";
import UserComment from "../comments/userComment";

export default function PostsItem({ post, showAllComments = false }) {
  const { id: paramPostId } = useParams();
  const {
    body,
    comments,
    createdAt,
    _id: postId,
    image,
    user: { _id, name, photo },
  } = post;

  return (
    <Card>
      {/* user info */}
      <header className="flex flex-row gap-3 ">
        <Avatar img={photo} alt={name} rounded />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(createdAt)}
          </p>
        </div>
      </header>
      {/* content */}
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {body}
      </h5>
      {image &&<img src={image} alt={body} />}

      {/* footer:  details,comment */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaComment />
          {comments && comments.length}
        </div>

        {/* if we are in post details page do not show details link */}
        {!paramPostId && (
          <Link to={`/posts/${postId}`}>
            <CgDetailsMore />
          </Link>
        )}
      </div>

      {/* comments */}
      {(comments && comments.length>0) &&
        (showAllComments ? (
          <>
            {comments.map((comment) => (
              <UserComment key={comment._id} comments={comment} />
            ))}
          </>
        ) : (
          <UserComment comments={comments[0]} />
        ))}
    </Card>
  );
}
