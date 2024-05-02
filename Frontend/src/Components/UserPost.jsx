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
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to="/markzukerberg/post/1">
      <Flex gap="3" mb="4" py="5" w="full">
        <Flex flexDirection="column" alignItems="center">
          <Avatar size="md" name="markzukerberg" src="/zuck-avatar.png" />
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
              <Text fontSize="sm" fontWeight="bold">
                Mark Zukerberg
              </Text>
              <Image src="/verified.png" w="4" h="4" ml="4" />
            </Flex>
            <Flex gap="4" alignItems="center">
              <Text fontSize="sm" color="gray.light">
                1d
              </Text>
              <Box onClick={(e) => e.preventDefault()}>
                <Menu>
                  <MenuButton>
                    <BsThreeDots />
                  </MenuButton>
                  <MenuList >
                    <MenuItem>Copy Link</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </Flex>
          <Text fontSize="sm">{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius="6"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.light"
            >
              <Image src={postImg} w="full" />
            </Box>
          )}
          <Flex gap="3" my="1">
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap="3" alignItems="center">
            <Text fontSize="sm" color="gray.light">
              {replies} Replies
            </Text>
            <Box w="0.5" h="0.5" borderRadius="full" bg="gray.light"></Box>
            <Text fontSize="sm" color="gray.light">
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
