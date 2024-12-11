import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const SingUp = () => {
    const { createUserData, setUser, updateProfileUser } = useContext(AuthContext);
  const [terms, setTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [validName, setValidName] = useState("");
  const navigate = useNavigate();

  const handleTermsChange = () => setTerms(!terms);

  const validNameUpdate = (name) => {
    if (name.length === 0 || name.length <= 3) {
      return "Name must be at least 3 characters long!";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const handlerRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const photo = formData.get("photoURL");
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate password
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      toast.error(error); // Show password error toast
      return;
    }

    // Validate name
    const errorName = validNameUpdate(name);
    if (errorName) {
      setValidName(errorName);
      toast.error(errorName); // Show name error toast
      return;
    }

    setPasswordError("");
    setValidName("");

    createUserData(email, password)
      .then((result) => {
        const user = result.user;
        const metaData = user?.metadata?.creationTime;
        setUser(user);
        console.log(user);
        updateProfileUser({ displayName: name, photoURL: photo })
          .then(() => {
            
            toast.success("Registration successful!");
            
            //save new user info to the database
            const newUser = {name,email,photo,metaData};
            fetch('http://localhost:5000/users',{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(newUser)

            })
            .then(res =>res.json())
            .then(data =>{
                console.log(data);
                if(data.insertedId)
                    {
                      Swal.fire({
                        title: "Success!",
                        text: "Coffee Added Successfully!",
                        icon: "success"
                      });
                      form.reset();
                      navigate('/');
                    }
            })
          })
          .catch((err) => {
            toast.error(err.message); // Show update profile error
            console.error(err);
          });
      })
      .catch((err) => {
        toast.error(err.message); // Show user creation error
        console.error(err.code, err.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl rounded-none">
        <h1 className="text-2xl mt-2 text-center font-bold">
          Register Your Account
        </h1>
        <form onSubmit={handlerRegister} className="card-body">
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
              className="input input-bordered"
              onChange={(e) => {
                const errorName = validNameUpdate(e.target.value);
                setValidName(errorName);
              }}
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
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              onChange={(e) => {
                const error = validatePassword(e.target.value);
                setPasswordError(error);
              }}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <p className="label-text-alt flex items-center gap-2">
                <input
                  onChange={handleTermsChange}
                  type="checkbox"
                  checked={terms}
                  className="checkbox"
                />
                Accept Terms & Conditions
              </p>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              className="btn btn-neutral rounded-none text-white disabled:opacity-50"
              disabled={!terms}
            >
              Register
            </button>
          </div>
        </form>

        <p className="mb-4 text-center font-semibold text-gray-500">
          Already have an account?{" "}
          <Link to="/singIn" className="text-red-600">
            Log in here
          </Link>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SingUp;
