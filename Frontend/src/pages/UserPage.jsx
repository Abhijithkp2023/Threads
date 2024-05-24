import React, { useEffect, useState } from "react";
import UserPageHeader from "../Components/UserPageHeader.jsx";
import UserPost from "../Components/UserPost.jsx";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast.js"
import { Spinner ,Flex } from "@chakra-ui/react";
import Post from "../Components/Post.jsx";

function UserPage() {
  const { username }  = useParams();
  const [user , setUser] = useState(null)
  const showToast = useShowToast()
  const [loading , setLoading] = useState(true);
  const [posts , setPosts] = useState([])
  const [fetchPosts , setFetchPosts ]  = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if(data.error) {
          showToast("Error" , data.error , "error");
          return;  
        }
        setUser(data);
      } catch (error) {
        showToast("Error" , error.message , "error");
      } finally {
        setLoading(false)
      }
    };

    const getPosts = async () => {
      setFetchPosts(true)
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        showToast("Error" , error.message , "error");
        setPosts([])
      } finally {
        setFetchPosts(false)
      }
    };
    
    getUser();
    getPosts()
  } , [username , showToast])

  

  if(!user && loading){
    return (
      <Flex justifyContent="center">
      <Spinner size="xl"/>
      </Flex>
    )
  }

  if(!user && !loading) {
    return (
      <h1>user not found</h1>
    )
  }

  if(!user) return null;
  
  return (
    <>
      <UserPageHeader user={user} />
      {!fetchPosts && posts.length === 0 && <h1>User has no posts</h1>}
      {fetchPosts && <Flex justifyContent="center" pt="25px"><Spinner size={"xl"} /></Flex>}
      {posts?.map((post) => <Post  key="post._id" post={post} postedBy={post.postedBy} />)}
    </>
  );
}

export default UserPage;
