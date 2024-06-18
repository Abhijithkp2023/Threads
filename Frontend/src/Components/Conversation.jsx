import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messageAtom";

const Conversation = ({ conversation }) => {
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation , setSelectedConversation] = useRecoilState(selectedConversationAtom)
  const user = conversation.participents[0];
  const lastMessage = conversation.lastMessage;
  const colorMode = useColorMode()
  
  return (
    <Flex
      gap="4"
      alignItems="center"
      p="1"
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("fray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius="md"
      onClick={() => setSelectedConversation({
        _id: conversation._id,
        userId: user._id,
        userProfilePic : user.profilePic,
        username : user.username,
        mock : conversation.mock,
      })}
      bg={
        selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark"  ) : ""
      }
    >
      <WrapItem>
        <Avatar size="sm" src={user.profilePic}>
          <AvatarBadge boxSize="1em" bg="green.500" />{" "}
        </Avatar>
      </WrapItem>
      <Stack>
        <Text fontWeight="700" display="flex" alignItems="center">
          {user.username}
          <Image src="/verified.png" w="4" h="4" ml="1" />
        </Text>
        <Text fontSize="xs" display="flex" alignItems="center" gap="1">
          {currentUser._id === lastMessage.sender ? (
            <BsCheck2All size="16" />
          ) : (
            ""
          )}
          {lastMessage.text.length > 20
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
