import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom.js';
import useShowToast from '../hooks/useShowToast.js';
import userAtom from '../atoms/userAtom.js';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const [inputs , setInputs] = useState({
    name: "",
    username: "" ,
    email : "",
    password : "",
  })
const setUser = useSetRecoilState(userAtom)
const showToast = useShowToast();

const handleSignup = async () => {
  try {
    const res = await fetch("/api/users/signup" , {
      method : "POST" , 
      headers : {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(inputs),
    });

    const data = await res.json()

    if(data.error){
      showToast("Error", data.error , "error")
      return;
    } else {
      localStorage.setItem("user-threads" , JSON.stringify(data));
    setUser(data);
    }

    

  } catch (error) {
    showToast("Error",error , "error")
  }
}
  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel> Full Name</FormLabel>
                  <Input type="text"
                  onChange={(e) => setInputs({...inputs ,name: e.target.value})} />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text"
                  onChange={(e) => setInputs({...inputs , username: e.target.value})} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"
              onChange={(e) => setInputs({...inputs , email : e.target.value})} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                onChange={(e) => setInputs({...inputs , password : (e).target.value})} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600" , "gray.800")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700" , "gray.900"),
                }}
                onClick={handleSignup}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'} onClick={() => setAuthScreen("login")}  >
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}