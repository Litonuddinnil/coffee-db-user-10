import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeDetails = ({ coffee,setCoffees,coffees }) => {
  const { _id } = coffee;
  const handlerDelete = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`https://cofee-store-server-ten.vercel.app/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });
              const remaining = coffees.filter(cof =>cof._id !== _id);
              setCoffees(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure>
        <img src={coffee.photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {coffee.name}
          <div className="badge badge-secondary">{coffee.taste}</div>
        </h2>
        <p>{coffee.details}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{coffee.supplier}</div>
          <div className="badge badge-outline">{coffee.quantity}</div>
        </div>
      </div>
      <div className="join items-center justify-center text-black mb-4">
        <button className="btn  btn-outline join-item">View</button>
        <Link to={`/updateCoffee/${_id}`}>
          <button className="btn btn-primary btn-outline join-item">
            Edit
          </button>
        </Link>

        <button
          onClick={() => handlerDelete(_id)}
          className="btn bg-orange-400 btn-outline join-item"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CoffeeDetails;
