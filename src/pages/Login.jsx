import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../firebase/firebase.config';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {

  const { setUser, handleGoogleSignIn, user } = useContext(AuthContext)

  const location = useLocation()
  const navigate= useNavigate()

  const [email, setEmail] = useState("")

  console.log(location);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;

    

    // console.log(email, pass)

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate(location.state? location.state : '/')

      })
      .catch((err) => {
        console.log(err)
      })


  }

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(result => {
      const user = result.user
      setUser(user)
      navigate(location.state)
      
    })
    .catch(err => {
      console.log(err)
    })
    
  }

  console.log(user)

  const handleForget = () => {
    navigate(`/forget/${email}`)
    
  }






  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>

        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="fieldset">
              <label className="label">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input name='pass' type="password" className="input" placeholder="Password" />
              <div><button onClick={handleForget} className="link link-hover">Forgot password?</button></div>
              

              <div>
                <span>Don't have an account? <Link to={'/register'} className='text-blue-700 underline'>Register</Link></span>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
            <button onClick={googleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;