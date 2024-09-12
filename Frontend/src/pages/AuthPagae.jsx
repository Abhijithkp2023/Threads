import React from 'react'
import LoginCard from "../Components/LoginCard"
import SignupCard from "../Components/SignupCard"
import {  useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'


const AuthPagae = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  return (
    <div>
      {authScreenState === "login" ? <LoginCard /> : <SignupCard /> }  
    </div>
  )
}

export default AuthPagae
