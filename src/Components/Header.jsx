import { Center, Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode(); //useColorMode hook provided by Chakra UI to access the current color mode and a function to toggle the color mode.
  return (
    <Flex justifyContent="Center" mt="6" mb="12">
      <Image
        cursor="pointer"
        alt="logo"
        w="6"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"} // when the svg is in "public" folder we dont need to specify the exact route of directory , just specify the file name
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
