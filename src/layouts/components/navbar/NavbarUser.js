import React, { useEffect, useState } from "react";
import { history } from "../../../history";
import { deleteAllCookies, getCookie } from "../../../cookie";
import { LogIn, LogOut, PlusCircle } from "react-feather";

const NavbarUser = () => {
  const [cookie, setCookie] = useState(0);
  useEffect(() => {
    setCookie(getCookie("logged-in_forum"));
  });
  if (cookie === 0) {
    setCookie(getCookie("logged-in_forum"));
  }
  console.log(cookie);
  return (
    <span tag="a" className="nav-link cursor-pointer">
      {cookie === undefined ? (
        <span
          className="mr-2 pb-1 bb link"
          onClick={(e) => {
            history.push("/login");
          }}
        >
          <LogIn size={14} className="mr-50" />
          <span>Login</span>
        </span>
      ) : (
        <div>
          <span
            className="mr-2 pb-1 bb link"
            onClick={() => {
              history.push("/add");
            }}
          >
            <PlusCircle size={14} className="mr-50" />
            <span>Ask question</span>
          </span>
          <span
            className="mr-2 pb-1 bb link"
            onClick={(e) => {
              deleteAllCookies();
              setCookie(undefined);
              history.push("/login");
            }}
          >
            <LogOut size={14} className="mr-50" />
            <span>Logout</span>
          </span>
        </div>
      )}
    </span>
  );
};
export default NavbarUser;
