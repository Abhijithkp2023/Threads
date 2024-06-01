import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Message from "./Message";
import  MessageInput  from "./MessageInput.jsx";

const MessageContainer = () => {
  return (
    <Flex
      p="2"
      flex="70"
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius="md"
      flexDirection="column"
    >
      <Flex w="full" h="12" alignItems="center" gap="2" >
        <Avatar src="" size="sm" />
        <Text display="flex" alignItems="center">
          Abhijith <Image src="/verified.png" w="4" h="4" ml="1" />
        </Text>
      </Flex>
      <Divider />
      <Flex flexDir="column" gap="4" my="4" height="400px" overflow="auto" p="2">
        {true &&
          [...Array(5)].map((_, i) => (
            <Flex
              key="i"
              gap="i"
              alignItems="center"
              p="1"
              borderRadius="1"
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
                {i % 2 === 0 && <SkeletonCircle size="7" /> }
              <Flex flexDir="column" gap="2">
                <Skeleton w="250px" h="8px" />
                <Skeleton w="250px" h="8px" />
                <Skeleton w="250px" h="8px" />
                <Skeleton w="250px" h="8px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size="7" /> } 
            </Flex>
          ))}
          <Message ownMessage={true} />
          <Message ownMessage={false} />
          <Message ownMessage={false} />
          <Message ownMessage={true} />

      </Flex>
      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
