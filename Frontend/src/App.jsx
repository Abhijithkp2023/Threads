import { Box, Button, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import Header from "./Components/Header";
import Homepage from "./pages/Homepage.jsx";
import AuthPagae from "./pages/AuthPagae.jsx";
import userAtom from "./atoms/userAtom.js";
import { useRecoilValue } from "recoil";
import LogoutButton from "./Components/LogoutButton.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import CreatePost from "./Components/CreatePost.jsx";
import ChatPage from "./pages/ChatPage.jsx";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  return (
    <>
      <Box position="relative" w="full">
        <Container maxW={pathname === "/" ? "900px" : "640px"}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={user ? <Homepage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/update"
              element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={!user ? <AuthPagae /> : <Navigate to="/" />}
            />
            <Route
              path="/:username"
              element={
                user ? (
                  <>
                    <UserPage />
                    <CreatePost />
                  </>
                ) : (
                  <UserPage />
                )
              }
            />
            <Route path="/:username/post/:id" element={<PostPage />} />
            <Route
              path="/chat"
              element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
            />
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default App;
