import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const navigate = useNavigate();
    const user = useLoaderData(); 
    const { email } = user;

    console.log(user);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const photo = formData.get("photoURL");
        console.log(name, photo, email);

        const updatedUser = {
            name,
            email,
            photo,
        };

        fetch(`https://cofee-store-server-ten.vercel.app/users/${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "User updated successfully!",
                        icon: "success",
                    });
                    navigate('/users')
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update user.",
                    icon: "error",
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card bg-base-100 w-full max-w-lg shadow-2xl rounded-none">
                <h1 className="text-2xl mt-2 text-center font-bold">
                    Update {user.name} Information
                </h1>
                <form onSubmit={handleUpdateUser} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">
                                Your Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            defaultValue={user.name}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">
                                Photo URL
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the photo link"
                            name="photoURL"
                            defaultValue={user.photo}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="input input-bordered"
                            value={email}
                            readOnly
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button
                            className="btn btn-neutral rounded-none text-white disabled:opacity-50"
                        >
                            Update User Data
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default UpdateUser;
