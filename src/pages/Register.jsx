import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Register = () => {

    const { registerWithEmailPAssword, setUser, user } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.pass.value;
        const photoUrl = e.target.photoURL.value;

        registerWithEmailPAssword(email, password)
            .then((userCredential) => {

                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photoUrl
                }).then(() => {
                    // console.log(userCredential.user);
                    setUser(userCredential.user)
                }).catch((error) => {
                    console.log(error)
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    


    console.log(user)

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="fieldset">
                            <label className="label">Name</label>
                            <input name='name' type="text" className="input" placeholder="Name" />

                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" />
                            <label className="label">PhotoURL</label>
                            <input name='photoURL' type="text" className="input" placeholder="PhotoURL" />
                            <label className="label">Password</label>
                            <input name='pass' type="password" className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <div>
                                <span>Already have an account? <Link to={'/login'} className='text-blue-700 underline'>Login</Link></span>
                            </div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;