import React from 'react'
import GoogleButton from 'react-google-button'
import {auth, provider} from "../config/firebase"
import { signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const navigate = useNavigate()


  const signInWithGoogle = async () =>{
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate("/")
    }

  return (
    <div>
        {/*<GoogleButton /> */}
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default Login