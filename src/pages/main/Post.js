import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';





const Post = (props) => {
    const {post} = props

    const likesRef = collection(db, "likes")
    const [user] =  useAuthState(auth)
    const [likes, setLikes] = useState(null)
    const navigate = useNavigate()

    const likesDoc = query(likesRef, where("postId", "==", post.id))


    const getLike = async() =>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=> ({userId: doc.data().userId, likeId: doc.id})));
    }

    const addLike  = async () =>{
        const newDoc = await addDoc(likesRef, {userId: user?.uid, postId: post.id})
        if(user){
            setLikes((prev)=>
            prev ? [...prev, {userId: user?.id, likeId: newDoc.id}] : [{postId: post.id, likeId: newDoc.id}]
            );
        }
    }

    const removeLike = async () => {
        try {
          const likeToDeleteQuery = query(
            likesRef,
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
          );
    
          const likeToDeleteData = await getDocs(likeToDeleteQuery);
          const likeId = likeToDeleteData.docs[0].id;
          const likeToDelete = doc(db, "likes", likeId);
          await deleteDoc(likeToDelete);
          if (user) {
            setLikes(
              (prev) => prev && prev.filter((like) => like.likeId !== likeId)
            );
          }
        } catch (err) {
          console.log(err);
        }
      };


    useEffect(()=>{
        getLike()
    }, [])

    const hasUserLiked = likes?.find((like)=> like.userId === user?.uid)

  return (
    <div className='card'>
        <h1>{post.title}</h1>
        <h2>{post.description}</h2>
        <p>{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike }>{hasUserLiked ? <>&#128078;</>: <>&#128077;</>}</button>
        {likes && <p>Likes: {likes?.length}</p>}
    </div>
  )
}

export default Post