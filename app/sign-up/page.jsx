'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(email, password)
        console.log({res})
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('');
        router.push("/sign-in");

    } catch(e){
        console.error(e)
    }
  };

  const handleSignIn = async () => {
    try {
      router.push("/sign-in");
      
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-green-600">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5 text-center">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        <br /><br />
        <button 
          onClick={handleSignIn}
          className="w-full p-3  rounded text-white  flex justify-end items-center text-green-500"
          style={{ color: '#34D399' }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;