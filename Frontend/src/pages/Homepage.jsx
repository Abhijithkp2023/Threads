import { Flex, Spinner, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../Components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../Components/SuggestedUsers";

const Homepage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getFeedPosts = async () => {
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        
        if (data.error) {
          showToast("Error", data.error, "error");
          setPosts([]); // Ensure posts is an array if there's an error
        } else {
          setPosts(Array.isArray(data) ? data : []); // Set posts only if it's an array
        }
      } catch (error) {
        showToast("Error", error.message || error, "error");
        setPosts([]); // Set posts to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex gap="10" alignItems="flex-start">
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feeds</h1>
        )}
        {loading && (
          <Flex justifyContent="center">
            <Spinner size="xl" />
          </Flex>
        )}
        {Array.isArray(posts) && posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
      <Box flex={30}>
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default Homepage;
