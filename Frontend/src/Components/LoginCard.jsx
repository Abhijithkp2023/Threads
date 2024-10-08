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
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
  
  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    const [inputs , setInputs] = useState({
      username:"",
      password:"",
    })
    const setUser = useSetRecoilState(userAtom)
    const toast = useShowToast()
    const [loading , setLoading] = useState(false)


    const handleLogin = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/users/login" , {
          method : "POST",
          headers:{
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(inputs)
        });

        const data = await res.json()
        console.log(data)
        if(data.error) {
          toast("Error" , data.error , "error")
          return;
        } else {
          localStorage.setItem("user-threads" , JSON.stringify(data))
          setUser(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={{
                base:"full",
                sm: "400px"
            }}>
            
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>User name</FormLabel>
                <Input type="text" 
                onChange={(e) => setInputs({...inputs , username:e.target.value})}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                  onChange={(e) => setInputs({...inputs , password: e.target.value})}/>
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
                  isLoading={loading}
                  loadingText="Logging In"
                  size="lg"
                  bg={useColorModeValue("gray.600" , "gray.800")}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.700" , "gray.900"),
                  }}
                  onClick={handleLogin}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                 New User? <Link color={'blue.400'} onClick={ () => setAuthScreen("signup")} >Sign Up</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }