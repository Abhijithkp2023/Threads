import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorModeValue,
  useDisclosure,
  Text,
  Input,
  Flex,
  Image,
  CloseButton,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState } from "recoil";

const MAX_CHAR =500;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const { handleImageChange, imgUrl , setImgUrl} = usePreviewImg();
  let imageRef = useRef(null);
  const [remainingChar , setRemainingChar] = useState(MAX_CHAR);
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading , setLoading] = useState(false)
  const [posts , setPosts] = useRecoilState(postsAtom)


  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if(inputText.length > MAX_CHAR) {
        const truncatedText = inputText.slice(0,MAX_CHAR);
        setPostText(truncatedText);
        setRemainingChar(0)
    } else {
        setPostText(inputText)
        setRemainingChar(MAX_CHAR-inputText.length)
    }

  };
  const handleCreatePost = async () => {
    setLoading(true)
    try {
    const res = await fetch("/api/posts/create" , {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            postedBy : user._id , 
            text : postText , 
            image : imgUrl
        })
    })

    const data = await res.json()
    console.log(data)

    if(data.error) {
        showToast("Error" , data.error , "error")
        return;
    }
    setImgUrl("")
    setPostText("")
    showToast("Success" , "Post created successfully" , "success");
    setPosts([data , ...posts]);
    setLoading(false)
    onClose();
    } catch (error) {
      showToast("Error" , error , "error")
    }
  };

  return (
    <>
      <Button
        position="fixed"
        bottom="10"
        h="14"
        right="5"
        size={{ base: "sm" , sm: "md" }}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            Some text
            <FormControl>
              <Textarea
                placeholder="post content here..."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign="right"
                m="1"
                color="gray.800"
              >
                {remainingChar}/{MAX_CHAR} left
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
              <BsImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size="16"
                onClick={ () => imageRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
                <Flex mt={5} w="full" position="relative">
                    <Image src={imgUrl}  alt="Selected img"/>
                    <CloseButton 
                    onClick={() => {
                        setImgUrl(null)
                    }} 
                    bg="gray.800"
                    position="absolute"
                    top="2"
                    right="2"
                    />
                </Flex>
            )} 
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
