import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";


const ChatPage = () => {
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
        <Flex flex="30" gap="2" flexDirection="column" maxW={{
            sm: "250px" , 
            ms : "full"
        }}>
          <Text fontWeight="700" color={useColorModeValue("gray.600" , "gray.400")}>Your Conversations</Text>
          <form>
            <Flex alignItems="center" gap="2">
              <Input placeholder="Search for a user" />
              <Button size="sm"> <SearchIcon /></Button>
            </Flex>
          </form>
          { true && (
            [0,1,2,3,4].map((_ , i) => (
                <Flex key="i" gap="4" alignItems="center" p="1" borderRadius={"md"}> 
                <Box> <SkeletonCircle /></Box>
                <Flex w="full" flexDirection="column" gap="3">
                    <Skeleton  h="10px" w="80px"/>
                    <Skeleton  h="8px" w="80%"/>
                </Flex>
                </Flex>
            ))
          )}
        </Flex>
        <Flex flex="70">messages</Flex>
      </Flex>
    </Box>
  );
};

export default ChatPage;
 