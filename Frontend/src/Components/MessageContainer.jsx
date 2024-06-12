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
import React, { useEffect, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput.jsx";
import useShowToast from "../hooks/useShowToast.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messageAtom.js";
import userAtom from "../atoms/userAtom.js";

const MessageContainer = () => {
  const showToast = useShowToast();
  const [selectedConversation , setSelectedConversation] = useRecoilState(selectedConversationAtom)
  const [loadingMessages , setLoadingMessages] = useState(true)
  const [messages , setMessages] = useState([])
  const currentUser = useRecoilValue(userAtom)

  useEffect(() => {
    const getMessage = async () => {
      setLoadingMessages(true)
      setMessages([])
      try {
        const res = await fetch(`/api/messages/${selectedConversation.userId}`)
        const data = await res.json()
        if (data.error) {
          showToast("Error" , data.error , "error")
        }
        setMessages(data)
      } catch (error) {
        showToast("Error", error.Message, "error");
      }finally {
        setLoadingMessages(false)
      }
    };
    getMessage()
  }, [showToast , selectedConversation.userId]);

  return (
    <Flex
      p="2"
      flex="70"
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius="md"
      flexDirection="column"
    >
      <Flex w="full" h="12" alignItems="center" gap="2">
        <Avatar src={selectedConversation.userProfilePic} size="sm" />
        <Text display="flex" alignItems="center">
          {selectedConversation.username} <Image src="/verified.png" w="4" h="4" ml="1" />
        </Text>
      </Flex>
      <Divider />
      <Flex
        flexDir="column"
        gap="4"
        my="4"
        height="400px"
        overflow="auto"
        p="2"
      >
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key="i"
              gap="i"
              alignItems="center"
              p="1"
              borderRadius="1"
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size="7" />}
              <Flex flexDir="column" gap="2">
                <Skeleton w="250px" h="8px" />
                <Skeleton w="250px" h="8px" />
                <Skeleton w="250px" h="8px" />
                <Skeleton w="250px" h="8px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size="7" />}
            </Flex>
          ))}
          {!loadingMessages && (
            messages.map(message => (
              <Message ownMessage={currentUser._id === message.sender} key={message._id} message={message} />
            ))
          )}
        
      </Flex>
      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
