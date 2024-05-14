import React from "react";
import UserPageHeader from "../Components/UserPageHeader.jsx";
import UserPost from "../Components/UserPost.jsx";

function UserPage() {
  return (
    <>
      <UserPageHeader />
      <UserPost likes={1200} replies={5} postImg="/post1.jpg" postTitle="Lets talk about threads" />
      <UserPost likes={10} replies={50} postImg="/post1.jpg" postTitle="World is going to end" />
      <UserPost likes={23} replies={33} postImg="/post1.jpg" postTitle="Fastest way to acheive success" />
    </> 
  );
}

export default UserPage;
