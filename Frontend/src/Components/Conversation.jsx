import { Avatar, AvatarBadge, Flex, Image, Stack, Text, WrapItem, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Conversation = () => {
  return (
    <Flex gap="4" alignItems="center" p="1" _hover={{
        cursor : "pointer" , 
        bg : useColorModeValue("fray.600" , "gray.dark"),
        color: "white",
    }}
    borderRadius="md" >
        <WrapItem>
            <Avatar size="sm" src="https://bit.ly/broken-link"> <AvatarBadge boxSize="1em" bg="green.500" /> </Avatar>
        </WrapItem>
        <Stack>
            <Text fontWeight="700" display="flex" alignItems="center">
                Abhijith <Image src="/verified.png" w="4" h="4" ml="1" />
            </Text>
            <Text fontSize="xs" display="flex" alignItems="center" gap="1">
                Hello , some texts here
            </Text>
        </Stack>
    </Flex>
  )
}

export default Conversation
