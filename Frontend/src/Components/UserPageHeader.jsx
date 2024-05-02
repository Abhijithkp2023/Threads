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
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserPageHeader = () => {
  const toast = useToast();

  const copyUrl = () => {
    const currentUrl = window.location;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({ description: "Profile Link Copied", duration: 2000 });
    });
  };
  return (
    <VStack alignItems="start" gap="4">
      <Flex justifyContent="space-between" w="full">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Mark Zukerberg
          </Text>
          <Flex gap="2" alignItems="center">
            <Text fontSize="sm">markzukerberg</Text>
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
          <Avatar
            name="Mark zukerberg"
            size={{
              base: "md",
              md: "xl",
            }}
            src="/zuck-avatar.png"
          />
        </Box>
      </Flex>
      <Text>Co-founder , Executive Chairman of Meta platforms</Text>
      <Flex w="full" justifyContent="space-between">
        <Flex gap="2" alignItems="center">
          <Text color="gray.light">1M followers</Text>
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
