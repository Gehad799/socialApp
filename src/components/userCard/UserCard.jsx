import { Avatar, Card, Dropdown, DropdownItem } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import GlobalSpinner from "../shared/GlobalSpinner/GlobalSpinner";
import AppButton from "../shared/AppButton/appButton";
import { ChangePasswordModal } from "../ChangePasswordModal/ChangePasswordModal";
import { MdEdit } from "react-icons/md";
import { EditImageModal } from "../shared/EditImageModal/EditImageModal";

export function UserCard() {
  const { userData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [openEditImageModal, setOpenEditImageModal] = useState(false);

  console.log(userData);
  return userData ? (
    <Card>
      <div className="flex flex-col items-center pb-10">
        <div className="flex items-center">
          <Avatar img={userData?.photo} rounded />
          <MdEdit className="cursor-pointer" onClick={() => setOpenEditImageModal(true)
          }/>
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userData?.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userData?.email}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userData?.gender}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userData?.dateOfBirth}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <AppButton onClick={() => setOpenModal(true)}>
            Update Password
          </AppButton>
          {openModal && (
            <ChangePasswordModal
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          )}
          {openEditImageModal && (
            <EditImageModal
              openEditImageModal={openEditImageModal}
              setOpenEditImageModal={setOpenEditImageModal}
            />
          )}
        </div>
      </div>
    </Card>
  ) : (
    <GlobalSpinner />
  );
}
