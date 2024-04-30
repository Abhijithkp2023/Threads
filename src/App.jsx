import { Button, Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./Components/UserPage";
import PostPage from "./Components/PostPage";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Container maxW="640px">
        <Header />
        <Routes>
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:id" element={<PostPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
