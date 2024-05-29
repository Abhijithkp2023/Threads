import {Flex, Spinner } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../Components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const Homepage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getFeedPosts = async () => {
      setPosts([])
      setLoading(true);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast , setPosts]);

  return (
    <>
    {!loading && posts.length === 0 && (
        <h1>Follow some users to see the feeds</h1>
      )}
      {loading && (
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {posts.map((post) => <Post key={post._id} post={post} postedBy={post.postedBy}/> )}
    </>
  );
};

export default Homepage;
