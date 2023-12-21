"use client"
// Importing necessary libraries
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

// SignUp component
const SignUp = () => {
  // State variables for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Firebase hook for creating a new user
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  
  // Next.js router
  const router = useRouter();

  // Function to handle sign-up
  const handleSignUp = async () => {
    try {
      // Validate password length
      if (password.length < 6) {
        setPasswordError('Password must contain at least 6 characters');
        return;
      }

      // Create user with email and password
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });

      // Reset email and password fields, navigate to home page
      setEmail('');
      setPassword('');
      router.push('/');

    } catch (e) {
      console.error(e);
    }
  };

  // Function to handle sign-in
  const handleSignIn = () => {
    router.push('/sign-in');
  };

  // JSX rendering
  return (
    <div className="min-h-screen flex items-center justify-center text-green-600">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5 text-center">Sign Up</h1>
        
        {/* Email input */}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        
        {/* Password input with validation message */}
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(''); // Clear password error when user starts typing
          }} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {passwordError && (
          <p className="text-red-500 text-sm mb-4">{passwordError}</p>
        )}

        {/* Sign Up button */}
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        
        <br /><br />
        
        {/* Sign In button */}
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

// Export the SignUp component
export default SignUp;
