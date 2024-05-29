import { Button, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import Header from "./Components/Header";
import Homepage from "./pages/Homepage.jsx";
import AuthPagae from "./pages/AuthPagae.jsx";
import userAtom from "./atoms/userAtom.js";
import { useRecoilValue } from 'recoil'
import LogoutButton from "./Components/LogoutButton.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import CreatePost from "./Components/CreatePost.jsx";
  
function App() {
  const user = useRecoilValue(userAtom)
  return (
    <>
      <Container maxW="640px">
        <Header />
        <Routes>
          <Route path="/" element={user ? <Homepage /> : <Navigate to="/auth" />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={ !user ? <AuthPagae /> : <Navigate to="/" /> } />
          <Route path="/:username" element={user ? 
            ( 
            <>
            <UserPage /> 
             <CreatePost />
            </>
            ) : (
            <UserPage />
            )
            } />
          <Route path="/:username/post/:id" element={<PostPage />} />
        </Routes>
      </Container>
    </>
  );  
}

export default App;
