import { Button, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./Components/UserPage";
import PostPage from "./Components/PostPage";
import Header from "./Components/Header";
import Homepage from "./Components/Homepage.jsx";
import AuthPagae from "./Components/AuthPagae.jsx";
import userAtom from "./atoms/userAtom.js";
import { useRecoilValue } from 'recoil'
import LogoutButton from "./Components/LogoutButton.jsx";
  
function App() {
  const user = useRecoilValue(userAtom)
  return (
    <>
      <Container maxW="640px">
        <Header />
        <Routes>
        <Route path="/" element={user ? <Homepage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={ !user ? <AuthPagae /> : <Navigate to="/" /> } />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:id" element={<PostPage />} />
        </Routes>
        {user && <LogoutButton />}
      </Container>
    </>
  );
}

export default App;
