import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";

const Conversation = ({ conversation }) => {
  const currentUser = useRecoilValue(userAtom);
  const user = conversation.participents[0];
  const lastMessage = conversation.lastMessage;
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
