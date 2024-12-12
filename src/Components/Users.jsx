import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUser = useLoaderData();
  const [users, setUsers] = useState(loadedUser);
  const handlerDelete = email =>{
    
    console.log(email);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://cofee-store-server-ten.vercel.app/users/${email}`,{
            method:"DELETE",
          })
          .then(res =>res.json())
          .then(data =>{
            console.log(data)
            if(data.deletedCount > 0 ){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });

                  const remaining = users.filter(userEmail => userEmail.email !== email);
                  setUsers(remaining);
            }
          })
        }
      });


  }
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <h1 className="text-3xl text-center font-bold">
        users:{loadedUser.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Last Sign In</th>
              <th>Action Method</th>
              <th></th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody key={user._id}>
              
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name} </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user?.metaData}</td>
                <td>{user?.lastSignInTime}</td>
                 <div className="flex items-center  gap-4">
                 <Link to={`/editUser/${user.email}`}>
                 <button className="btn btn-outline btn-success"><MdEdit></MdEdit></button> </Link>
                 <button onClick={()=>handlerDelete(user.email)} className="btn btn-error btn-md">Delete</button>
                 </div>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Users;
