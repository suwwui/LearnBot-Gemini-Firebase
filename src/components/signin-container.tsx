
import React, { useContext, useState } from "react";
import { FirebaseUserContext } from "@/lib/firebase-user";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/**
 * Sign in with Google button, using Firebase Auth
 *
 * Using Tailwind for all styling.
 */
const SignInContainer: React.FC<{}> = ({}) => {
  // const user = useContext(FirebaseUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  const handleEmailSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful sign-up (e.g., redirect to another page)
    } catch (error: any) {
      setError(error.message);
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Handle successful sign-up (e.g., redirect to another page)
    } catch (error: any) {
      setError(error.message);
    }
  };

  return(
    <div className="flex min-h-screen items-center justify-center bg-cyan-700">
      <div className= "bg-cyan-50 p-8 rounded-md shadow-md w-96">
      <h2 className="text-black font-bold mb-4 justify-center items-center flex">Create your Account</h2>
        <h4 className="text-center text-black mb-4 justify-center items-center flex">
            Start your learning journey with Edusys &#128173;
        </h4>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleEmailSignUp} className="mb-4">
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded-md justify-center items-center flex"
          >
            Sign In 
          </button>
        </form>
        <hr className="mb-4" />
        <button
          onClick={handleGoogleSignUp}
          className="bg-red-500 hover:bg-red-600 text-white w-full px-4 py-2 rounded-md"
        >
          Sign In with Google
        </button>
        
      </div>
    </div>
  );
};

export default SignInContainer;
