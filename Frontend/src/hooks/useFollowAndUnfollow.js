import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from './useShowToast';
import {useState} from 'react';

const useFollowAndUnfollow = (user) => {
    const currentUser = useRecoilValue(userAtom)
    const [following , setFollowing] = useState(user?.followers.includes(currentUser?._id))
    const [updating , setUpdating] = useState(false);
    const showToast = useShowToast()

    const handleFollowUnfollow = async () => {
        if(!currentUser){
          showToast("Error" , "Please Login to follow" , "error")
        }
        if(updating) return;

        setUpdating(true)
        try {
          const res = await fetch(`/api/users/follow/${user._id}` ,  {
              method : "POST" , 
              headers : {
                "Content-Type" : "application/json"
              },
          })
          const data = await res.json()
          if(data.error){
            showToast("Error" , data.error , "error")
            return;
          }
          if(following){
            showToast("Success" , `Unfollowed ${user.name}` ,"success")
            user.followers.pop(currentUser?._id);  //simulate removing from followers 
          } else {
            showToast("Success" , `Followed ${user.name}` , "success")
            user.followers.push(currentUser?._id);  //simulate adding to followers 
          }
    
          setFollowing(!following)
    
        } catch (error) {
          showToast("Error",error,"error")
        } finally {
          setUpdating(false)
        }
      }

  return {handleFollowUnfollow, updating, following}
}

export default useFollowAndUnfollow
