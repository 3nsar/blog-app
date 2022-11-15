import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {

    const postRef = collection(db, "posts")
    const [user] =  useAuthState(auth)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description")
    });

    const { register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    })

    const createPost = async (data) =>{
        await addDoc( postRef, {
           ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate("/")
    }

  return (
    <form onSubmit={handleSubmit(createPost)}>
        <input placeholder='Title...' {...register("title")}/>
        <textarea placeholder='Description...' {...register("description")}/>
        <input type="submit"/>
    </form>
  )
}

export default CreateForm