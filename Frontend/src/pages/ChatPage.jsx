import { SearchIcon } from "@chakra-ui/icons";
import { GiConversation } from "react-icons/gi";
import Conversation from "../Components/Conversation";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MessageContainer from "../Components/MessageContainer";
import useShowToast from "../hooks/useShowToast.js";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationAtom,
  selectedConversationAtom,
} from "../atoms/messageAtom.js";
import userAtom from "../atoms/userAtom.js";
import { useSocket } from "../context/SocketContext.jsx";

const ChatPage = () => {
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [SearchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  const [conversations, setConversations] = useRecoilState(conversationAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const showToast = useShowToast();
  const { socket, onlineUsers } = useSocket();

  useEffect(() => {
    socket?.on("messageSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
  }, [socket, setConversations]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setConversations(data);
      } catch (error) {
        showToast(("Error", error.message, "error"));
        return;
      } finally {
        setLoadingConversations(false);
      }
    };
    getConversation();
  }, [showToast, setConversations]);

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${SearchText}`);
      const SearchedUser = await res.json();
      if (SearchedUser.error) {
        showToast("Error", SearchedUser.error, "error");
      }

      const messagingYourself = SearchedUser._id === currentUser._id;
      if (messagingYourself) {
        showToast("Error", "You cant message Yourself", "error");
      }

      const conversationAlreadyExists = conversations.find(
        (conversation) => conversation.participents[0]._id === SearchedUser._id
      );
      if (conversationAlreadyExists) {
        setSelectedConversation({
          _id: conversationAlreadyExists._id,
          userId: SearchedUser._id,
          username: SearchedUser.username,
          userProfilePic: SearchedUser.profilePic,
        });
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participents: [
          {
            username: SearchedUser._username,
            profilePic: SearchedUser.profilePic,
          },
        ],
      };
      setConversations((prevConvs) => [...prevConvs.mockConversation]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };

  return (
    <Box
      position="absolute"
      left="50%"
      w={{ base: "100%", md: "80%", lg: "750px" }}
      transform={"translateX(-50%)"}
      p="4"
    >
      <Flex
        gap="4"
        flexDirection={{ base: "column", md: "row" }}
        maxW={{ sm: "400px", md: "full" }}
        mx="auto"
      >
        <Flex
          flex={30}
          gap="2"
          flexDirection="column"
          maxW={{
            sm: "250px",
            ms: "full",
          }}
        >
          <Text
            fontWeight="700"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your Conversations
          </Text>
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems="center" gap="2">
              <Input
                placeholder="Search for a user"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size="sm"
                onClick={handleConversationSearch}
                isLoading={searchingUser}
              >
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {loadingConversations &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap="4"
                alignItems="center"
                p="1"
                borderRadius={"md"}
              >
                <Box>
                  {" "}
                  <SkeletonCircle />
                </Box>
                <Flex w="full" flexDirection="column" gap="3">
                  <Skeleton h="10px" w="80px" />
                  <Skeleton h="8px" w="80%" />
                </Flex>
              </Flex>
            ))}
          {!loadingConversations &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                isOnline={onlineUsers.includes(
                  conversation.participents[0]._id
                )}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConversation._id && (
          <Flex
            flex="70"
            borderRadius="md"
            alignItems="center"
            justifyContent="center"
            height="400px"
            flexDirection="column"
          >
            <GiConversation size={100} />
            <Text fontSize="20">Select a conversation to start messaging</Text>
          </Flex>
        )}
        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
