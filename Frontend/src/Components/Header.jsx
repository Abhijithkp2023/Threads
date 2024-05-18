import { Center, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import React from "react";
import {useRecoilValue} from "recoil"
import userAtom from "../atoms/userAtom"
import {Link as RouterLink} from "react-router-dom"
import {AiFillHome} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode(); //useColorMode hook provided by Chakra UI to access the current color mode and a function to toggle the color mode.
  const user = useRecoilValue(userAtom) 

  return (
    <Flex justifyContent="space-between" mt="6" mb="12">
      { user && (
      <Link as={RouterLink} to="/">
      <AiFillHome size="24" />
      </Link>
    )}
      <Image
        cursor="pointer"
        alt="logo"
        w="6"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"} // when the svg is in "public" folder we dont need to specify the exact route of directory , just specify the file name
        onClick={toggleColorMode}
      />

{ user && (
      <Link as={RouterLink} to={`/${user.username}`}>
      <RxAvatar size="24" />
      </Link>
    )}
    </Flex>
  );
};

export default Header;
