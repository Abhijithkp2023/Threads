import { Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'

const Homepage = () => {
  return (
    <div>
      <Link to={"/markzukerberg"}>
        <Flex justifyContent="Center" w="full">
            <Button mx="auto">Visit profile page</Button>
        </Flex>
      </Link>
    </div>
  )
}

export default Homepage;
