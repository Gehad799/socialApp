import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import {  useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";

export function AppNav() {
  const { token, setToken } = useContext(AuthContext);
const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    navigate("/login");
  };



  return (
    <>
      <Navbar>
        <NavbarBrand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Social App
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              userData ? (
                <Avatar alt="User settings" img={userData.photo} rounded />
              ) : (
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              )
            }
          >
            {token ? (
              <>
                {userData && (
                  <DropdownHeader>
                    <span className="block text-sm">{userData.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {userData.email}
                    </span>
                  </DropdownHeader>
                )}
                <DropdownItem as={NavLink} to="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem as={NavLink} to="/settings">
                  Settings
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem as="button" onClick={handleLogOut}>
                  Sign out
                </DropdownItem>
              </>
            ) : (
              <>
                <DropdownItem as={NavLink} to="/login">
                  Login
                </DropdownItem>
                <DropdownItem as={NavLink} to="/register">
                  Register
                </DropdownItem>
              </>
            )}
          </Dropdown>
          {token && <NavbarToggle />}
        </div>
        {token && (
          <NavbarCollapse>
            <NavbarLink as={NavLink} to="/" active>
              Home
            </NavbarLink>
           
          </NavbarCollapse>
        )}
      </Navbar>
    </>
  );
}
