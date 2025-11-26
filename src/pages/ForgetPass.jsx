import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import auth from '../firebase/firebase.config';

const ForgetPass = () => {

    const { email } = useParams()
    

    const handleSubmit = (e) => {

        e.preventDefault();
        const formEmail = e.target.email.value

        sendPasswordResetEmail(auth, formEmail)
            .then(() => {
                window.open('https://mail.google.com/mail/u/0/')
            })
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <div className='flex justify-center my-12'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
                <div className="card-body ">
                    <form onSubmit={handleSubmit} className="fieldset">
                        <label className="label">Email</label>
                        <input defaultValue={email} name='email' type="email" className="input" placeholder="Email" />
                        <button className="btn btn-neutral mt-4">Login</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ForgetPass;