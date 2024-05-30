import {
  Button,
  Center,
  Flex,
  Image,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar  } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill  } from "react-icons/bs";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode(); //useColorMode hook provided by Chakra UI to access the current color mode and a function to toggle the color mode.
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom)

  return (
    <Flex justifyContent="space-between" mt="6" mb="12">
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size="24" />
        </Link>
      )}

      {!user && (
        <Link as={RouterLink} to={"/auth"} onClick={
          () => setAuthScreen('login')
        }>
          Login
        </Link>
      )}

      <Image
        cursor="pointer"
        alt="logo"
        w="6"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"} // when the svg is in "public" folder we dont need to specify the exact route of directory , just specify the file name
        onClick={toggleColorMode}
      />

      {user && (
        <Flex justifyContent="center" gap="4">
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size="24" />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size="20" />
          </Link>
          <Button size="xs">
            <IoLogOutOutline size="25px" onClick={logout} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen('signup')}>
          Sign Up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
