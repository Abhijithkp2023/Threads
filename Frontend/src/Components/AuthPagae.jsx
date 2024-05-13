import React from 'react'
import LoginCard from "./LoginCard"
import SignupCard from "./SignupCard"
import {  useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'


const AuthPagae = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  console.log(authScreenState);
  return (
    <div>
      {authScreenState === "login" ? <LoginCard /> : <SignupCard /> }  
    </div>
  )
}

export default AuthPagae
