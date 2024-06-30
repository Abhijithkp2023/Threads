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
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput.jsx";
import useShowToast from "../hooks/useShowToast.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationAtom,
  selectedConversationAtom,
} from "../atoms/messageAtom.js";
import userAtom from "../atoms/userAtom.js";
import { useSocket } from "../context/SocketContext.jsx";

const MessageContainer = () => {
  const showToast = useShowToast();
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const { socket } = useSocket();
  const setConversations = useSetRecoilState(conversationAtom);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
     if(selectedConversation._id === message.conversationId){
      setMessages((prevMessage) => [...prevMessage, message]);
     }
      setConversations((prev) => {
        const updatedConversatios = prev.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversatios;
      });
    });
    return () => socket.off("newMessage");
  }, [socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behaviour: "smooth"});
  } , [messages])

  useEffect(() => {
    const getMessage = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if (selectedConversation.mock) return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setMessages(data);
      } catch (error) {
        showToast("Error", error.Message, "error");
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessage();
  }, [showToast, selectedConversation.userId]);

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
          {selectedConversation.username}{" "}
          <Image src="/verified.png" w="4" h="4" ml="1" />
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
        {!loadingMessages &&
          messages.map((message) => (
            <Flex key={message._id} direction="column" ref={messages.length-1 === messages.indexOf(message) ? messageEndRef : null}> 
              <Message
                ownMessage={currentUser._id === message.sender}
                message={message}
              />
            </Flex>
          ))}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
