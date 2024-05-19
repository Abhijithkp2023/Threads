import {
    Avatar,
    Box,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Text,
  } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNowStrict} from "date-fns"
  
  const Post = ({post , postedBy}) => {
  
    const showToast = useShowToast()
    const [user , setUser] = useState(null)
    const navigate = useNavigate()
    
    useEffect(()  => {
        const getUser = async ()  => {
            try {
           const res = await fetch(`/api/users/profile/${postedBy}`)
               const data = await res.json()
               if(data.error){
                showToast("Error" , data.error , "error") 
                return;
               }
               setUser(data);
           } catch (error) {
               showToast("Error" , error , "error")
               setUser(null)
           }
        }
        getUser();
    } , [postedBy , showToast]);
   
    return (
      <Link to={`/${user?.username}/post/${post._id}`}>
        <Flex gap="3" mb="4" py="5" w="full">
          <Flex flexDirection="column" alignItems="center">
            <Avatar size="md" name={user?.name} src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${user?.username}`)
            }}
            />
            <Box w="1px" h="full" bg="gray.light" my="2"></Box>
            <Box position="relative" w="full">
              <Avatar
                size="xs"
                name="john"
                src="https://bit.ly/dan-abramov"
                top="0px"
                position="absolute"
                left="15px"
                padding="2px"
              />
              <Avatar
                size="xs"
                name="john"
                position="absolute"
                src="https://bit.ly/kent-c-dodds"
                bottom="0px"
                right="-5px"
                padding="2px"
              />
              <Avatar
                size="xs"
                name="john"
                position="absolute"
                src="https://bit.ly/ryan-florence"
                bottom="0px"
                left="4px"
                padding="2px"
              />
            </Box>
          </Flex>
          <Flex flexDirection="column" gap="2" w="full">
            <Flex justifyContent="space-between" w="full">
              <Flex w="full" alignItems="center">
                <Text fontSize="sm" fontWeight="bold" 
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/${user?.username}`)
                }}
                >
                  {user?.username}
                </Text>
                <Image src="/verified.png" w="4" h="4" ml="4" />
              </Flex>
              <Flex gap="4" alignItems="center">
                <Text fontSize="xs" w="20" textAlign="right"  color="gray.light">
                  {formatDistanceToNowStrict(new Date(post.createdAt) , {addSuffix: true}) }
                </Text>
                <Box onClick={(e) => e.preventDefault()}>
                  <Menu>
                    <MenuList >
                      <MenuItem>Copy Link</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
            </Flex>
            <Text fontSize="sm">{post.text}</Text>
            {post.image && (
              <Box
                borderRadius="6"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.light"
              >
                <Image src={post.image} w="full" />
              </Box>
            )}
            <Flex gap="3" my="1">
              <Actions post={post} />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    );
  };
  
  export default Post;
  