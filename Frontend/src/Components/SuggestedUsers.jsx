import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import SuggestedUser from './SuggestedUser';
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from 'react';

const SuggestedUsers = () => {
    const[loading,setLoading] = useState(true);
    const[SuggestedUsers,setSuggestedUsers] = useState([])
    const showToast = useShowToast()

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/users/sugggested");
                const data = res.json()
                SuggestedUser(data)
                if(data.error) {
                    showToast("Error", data.error, "error")
                }
                setSuggestedUsers(data)
            } catch (error) {
                showToast("Error", error.message , "error")
            }finally{
                setLoading(false)
            }
        }
        getSuggestedUsers()
     }, [showToast])



  return (
    <>
    <Text mb="4" fontWeight="bold"> Suggested Users</Text>

    <Flex direction="column" gap="4"> 
        {!loading && SuggestedUsers?.map((user) => <SuggestedUser key="user._id" user={user} /> )}
        {loading && SuggestedUsers?.map((_,idx) => (
        <Flex key={idx} gap="2" alignItems="center" p="1" borderRadius="md">
            <Box>
                <SkeletonCircle size="10" />
            </Box>
            <Flex  w="full" flexDirection="column" gap="2">
                <Skeleton h="8px" w="80px"/>
                <Skeleton h="8px" w="80px"/>
            </Flex>
            <Skeleton height="20px" w="60px" />
        </Flex>
    ))}</Flex>
    </>
  )
}

export default SuggestedUsers;