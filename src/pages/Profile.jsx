import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Profile = () => {

    const { user, setUser } = useContext(AuthContext)
    console.log(user)

    const [isOpen, setIsOpen] = useState(false)

    const handleUpdateForm = () => {

        setIsOpen(!isOpen)

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const photoUrl = e.target.photoURL.value

        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        }).then(() => {
            // console.log(userCredential.user);
            setUser({...user, photoURL: photoUrl, displayName: name})
        }).catch((error) => {
            console.log(error)
        });


    }

    return (
        <div className='flex flex-col justify-center items-center my-5'>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={user?.photoURL} />
                </div>

            </div>
            <p>{user?.displayName}</p>
            <p>{user?.email}</p>
            <button onClick={handleUpdateForm} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Update Profile</button>

            {
                isOpen && <form onSubmit={handleUpdate} className="fieldset">
                    <label className="label">Name</label>
                    <input defaultValue={user?.displayName} name='name' type="text" className="input" placeholder="Name" />
                    <label className="label">PhotoURL</label>
                    <input defaultValue={user?.photoURL}
                        name='photoURL' type="text" className="input" placeholder="PhotoURL" />
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Update</button>
                </form>
            }
        </div>
    );
};

export default Profile;