import React, { useEffect, useState } from "react";
import UserPageHeader from "../Components/UserPageHeader.jsx";
import UserPost from "../Components/UserPost.jsx";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast.js"

function UserPage() {

  const [user , setUser] = useState(null)
  const { username }  = useParams();
  const showToast = useShowToast()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if(data.error) {
          showToast("Error" , data.error , "error");
          return;  
        }
        console.log(data)
        setUser(data);
      } catch (error) {
        console.log((error));
      }
    }
    getUser();
  } , [username , showToast])

  if(!user) return null;
  
  return (
    <>
      <UserPageHeader user={user} />
      <UserPost
        likes={1200}
        replies={5}
        postImg="/post1.jpg"
        postTitle="Lets talk about threads"
      />
      <UserPost
        likes={10}
        replies={50}
        postImg="/post1.jpg"
        postTitle="World is going to end"
      />
      <UserPost
        likes={23}
        replies={33}
        postImg="/post1.jpg"
        postTitle="Fastest way to acheive success"
      />
    </>
  );
}

export default UserPage;
