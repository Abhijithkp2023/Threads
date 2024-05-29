import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from '../hooks/useLogout'

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const logout = useLogout()
    
  return (
    <Button position="fixed" top="30px" right="30px" size="sm" onClick={logout}>
        <IoLogOutOutline size="25px" />
    </Button>
  )
}

export default LogoutButton
