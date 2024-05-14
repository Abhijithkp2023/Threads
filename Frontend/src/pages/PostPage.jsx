import { Avatar, Flex, Text, Image, Box, Divider, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../Components/Actions";
import Comments from "../Components/Comments";

const PostPage = () => {
  const [liked, setLiked] = useState(false)

  return (
    <>
      <Flex>
        <Flex w="full" alignItems="center" gap="3">
          <Avatar src="/zuck-avatar.png" size="md" name="Mark Zukerberg" />
          <Flex>
            <Text fontSize="sm" fontWeight="bold">
              Mark Zukerberg
            </Text>
            <Image src="/verified.png" w="4" h="4" ml="4" />
          </Flex>
        </Flex>
        <Flex gap="4" alignItems="center">
          <Text fontSize="sm" color="gray.light">
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my="3"> Let's Talk About Threads</Text>
      <Box
        borderRadius="6"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.light"
      >
        <Image src="/post1.jpg" w="full" />
      </Box>
      <Flex>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex alignItems="center" gap="2">
        <Text color="gray.light" fontSize="sm">
          235 Replies
        </Text>
        <Box w="0.5" h="0.5" borderRadius="full" bg="gray.light"></Box>
        <Text color="gray.light" fontSize="sm">
          {200 + (liked ? 1 : 0)} Likes
        </Text>
      </Flex>
      <Divider my="4" />
      <Flex justifyContent="space-between">
        <Flex gap="2" alignItems="center"> 
        <Text fontSize="2xl">👋</Text>
        <Text color="gray.light">Get the app to like , replay and post</Text>
        </Flex>
        <Button>
        Get
        </Button>
      </Flex>
      <Comments createdAt="2d" likes={200} userName="Adila" userAvatar="https://bit.ly/dan-abramov" comment="Its nice" />
      <Comments createdAt="1d" likes={500} userName="Fahim" userAvatar="https://bit.ly/kent-c-dodds" comment="wow" />
      <Comments createdAt="7d" likes={245} userName="Arya" userAvatar="https://bit.ly/ryan-florence" comment="the day is beautiful" />
      <Comments createdAt="9d" likes={222} userName="Anugrah" userAvatar="https://bit.ly/prosper-baba" comment="Have a good day mark" />
    </>
  );
};

export default PostPage;
 