import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'
import Post from './Post'

const Main = () => {
  const [postsLists, setPostsLists] = useState(null);
  const postRef = collection(db, "posts")

  const getPosts = async () =>{
      const data = await getDocs(postRef);
      setPostsLists(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
  }

  useEffect(()=>{
    getPosts();
  }, [])

  return (
    <div>{postsLists?.map((post)=> (<Post post={post}/>))}</div>
  )
}

export default Main