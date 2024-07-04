import { Avatar, Flex, Text,Box,Image } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messageAtom";
import userAtom from "../atoms/userAtom";
import {BsCheck2All} from 'react-icons/bs'

const Message = ({ ownMessage , message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);

  return (
    <>
      {ownMessage ? (
        <Flex gap="2" alignSelf="flex-end">
          {false && (
          <Flex bg="green.800" maxW="350px" p="1" borderRadius="md">
          <Text color="white">{message.text}</Text>
          <Box alignSelf="flex-end" ml="1" color={message.seen ? "blue.400" : ""} fontWeight="bold">
          <BsCheck2All/>
          </Box>
          </Flex>
          )}
          {true && (
            <Flex mt="5px" w="200px">
              <Image
              src={"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"}
              alt='Message image'
              borderRadius={4} 
              />
            </Flex>
          )}
          <Avatar src={user.profilePic}  w="7" h="7" />
        </Flex>
      ) : (
        <Flex gap="2">
          <Avatar src={selectedConversation.userProfilePic} w="7" h="7" />
          <Text maxW="350px" bg="gray.400" p="1" borderRadius="md" color="black" >
            {message.text}
          </Text>
          {message.text && (
            <Text maxW="350px" bg="gray.400" p="1" borderRadius="md" color="black" >
              {message.text}
              </Text>
          )}
          {message.img && (
            <Flex mt="5px" w="200px">
            <Image
            src={"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"}
            alt='Message image'
            borderRadius={4} 
            />
          </Flex>
          )}
          
        </Flex>
      )}
    </>
  );
};

export default Message;
