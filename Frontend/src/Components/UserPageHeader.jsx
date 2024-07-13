import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Menu,
  MenuButton,
  Portal,
  MenuItem,
  MenuList,
  Toast,
  useToast,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue} from "recoil"
import userAtom from "../atoms/userAtom"
import {Link as RouterLink} from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import useFollowAndUnfollow from "../hooks/useFollowAndUnfollow";

const UserPageHeader = ({user}) => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom)  // logged in user
  const {handleFollowUnfollow, following, updating} = useFollowAndUnfollow(user)

  const copyUrl = () => {
    const currentUrl = window.location;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast("Success" , "Profile Link Copied" , "success")
    })
  };

  return (
    <VStack alignItems="start" gap="4">
      <Flex justifyContent="space-between" w="full">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
         {user.name}
          </Text>
          <Flex gap="2" alignItems="center">
            <Text fontSize="sm">{user.username}</Text>
            <Text
              fontSize="xs"
              bg="gray.dark"
              color="gray.light"
              p="1"
              borderRadius="full"
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && <Avatar
            name={user.name}
            size={{
              base: "md",
              md: "xl",
            }}
            src={user.profilePic}
          /> }
          {!user.profilePic && <Avatar
            name="https//bit.ly/broken-link"
            size={{
              base: "md",
              md: "xl",
            }}
            src={user.profilePic}
          /> }
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser._id === user._id && (
        <Link as={RouterLink}  to="/update">
        <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser._id !== user._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}> {following ? "Unfollow" : "Follow"}</Button>
      )}
      <Flex w="full" justifyContent="space-between">
        <Flex gap="2" alignItems="center">
          <Text color="gray.light">{user.followers.length} followers</Text>
          <Box w="1" h="1" bg="gray.light" borderRadius="full"></Box>
          <Link color="gray.light">instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size="24" cursor="pointer" />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size="24" cursor="pointer" />
              </MenuButton>
              <Portal>
                <MenuList bg="grey.dark">
                  <MenuItem bg="grey.dark" onClick={copyUrl}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w="full">
        <Flex
          flex="1"
          borderBottom="1.5px solid white"
          justifyContent="center"
          pb="3"
          cursor="pointer"
        >
          <Text fontWeight="bold">Threads</Text>
        </Flex>
        <Flex
          flex="1"
          borderBottom="1.5px solid gray"
          color="gray.white"
          justifyContent="center"
          pb="3"
          cursor="pointer"
        >
          Replies
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserPageHeader;
