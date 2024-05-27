import {
  Avatar,
  Flex,
  Text,
  Image,
  Box,
  Divider,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../Components/Actions";
import Comments from "../Components/Comments.jsx";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [post, setPost] = useState();
  const showToast = useShowToast();
  const { id } = useParams();
  const currentUser = useRecoilValue(userAtom)
  const navigate = useNavigate()


  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", error, "error");
        }
        setPost(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };

    getPost();
  }, []);

  const handleDeletePost = async () => {
    try {
      if(!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${post._id}` , {
        method: "DELETE"
      });
      const data = await res.json()
      console.log(data)
      if(data.error) {
        showToast("Error" , data.error , "error")
      }
      showToast("Success" , "Post deleted" , "success")
      navigate(`/${user.username}`)
    } catch (error) {
      showToast("Error" , error.message , "error")
    } 
  }

  if (!user && loading) {
    return (
      <Flex justifyContent="center">
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  console.log(post?.replies)
console.log(post?.replies)
  if (!post) return null;

  return (
    <>
      <Flex>
        <Flex w="full" alignItems="center" gap="3">
          <Avatar src={user?.profilePic} size="md" name="Mark Zukerberg" />
          <Flex>
            <Text fontSize="sm" fontWeight="bold">
              {user?.username}
            </Text>
            <Image src="/verified.png" w="4" h="4" ml="4" />
          </Flex>
        </Flex>
        <Flex gap="4" alignItems="center">
          <Text fontSize="xs" w="20" textAlign="right" color="gray.light">
            {formatDistanceToNowStrict(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </Text>
          {currentUser?._id === user?._id && (
            <DeleteIcon cursor="pointer" onClick={handleDeletePost} />
          )}
        </Flex>
      </Flex>
      <Text my="3">{post?.text}</Text>
      <Box
        borderRadius="6"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.light"
      >
        {post?.image && <Image src={post?.image} w="full" />}
      </Box>
      <Flex>
        <Actions post={post} />
      </Flex>
      <Divider my="4" />
      <Flex justifyContent="space-between">
        <Flex gap="2" alignItems="center">
          <Text fontSize="2xl">👋</Text>
          <Text color="gray.light">Get the app to like , replay and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my="4" />
      {post.replies.map((reply) => (
         <Comments  key={reply._id}  reply={reply}/> 
      ))}
      
    </>
  );
};

export default PostPage;
