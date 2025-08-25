import { Avatar } from "flowbite-react";
import { formatDate } from "../../utils/formatDate";

const UserComment = ({ comments }) => {
  console.log(comments);
  const {
    content,
    createdAt,
    commentCreator: { name, photo },
  } = comments;

  return (
    <div className="mt-4 p-2 border border-gray-200 rounded-lg ">
      <div className="flex flex-row gap-3 ">
        <Avatar img={!photo.includes("undefined") ? photo : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} alt={name} rounded />
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        {content}
      </h5>
    </div>
  );
};

export default UserComment;
