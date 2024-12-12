import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffe = () => {
  const coffee = useLoaderData();
  const { _id,category, details, name, photo, quantity, supplier, taste } = coffee;
  const handlerUpdateCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const updateCoffee = {
      name,
      quantity,
      supplier,
      taste,
      category,
      details,
      photo,
    };
    console.log(updateCoffee);

    fetch(`https://cofee-store-server-ten.vercel.app/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "Coffee Update Successfully!",
            icon: "success",
          });
        }
      });
  };
  console.log(coffee);
  return (
    <div className="bg-[#F4F3F0] p-24 min-h-screen mx-auto w-11/12">
      <h1 className="text-5xl font-extrabold my-4">Update a Coffee:{name}</h1>
      <form onSubmit={handlerUpdateCoffee}>
        {/* row name and quantity */}
        <div className="md:flex gap-4 my-4 ">
          <label className="input md:w-1/2 input-bordered flex items-center gap-2">
            Name
            <input
              type="text"
              name="name"
              className="grow w-full"
              defaultValue={name}
              placeholder=" Coffee Name"
            />
          </label>
          <label className="input md:w-1/2 input-bordered flex items-center gap-2">
            Available Quantity
            <input
              type="text"
              name="quantity"
              defaultValue={quantity}
              className="grow"
              placeholder="Chef Name"
            />
          </label>
        </div>

        <div className="md:flex gap-4 my-4 ">
          <label className="input md:w-1/2 input-bordered flex items-center gap-2">
            Supplier
            <input
              type="text"
              name="supplier"
              defaultValue={supplier}
              className="grow w-full"
              placeholder=" Coffee Supplier"
            />
          </label>
          <label className="input md:w-1/2 input-bordered flex items-center gap-2">
            Taste
            <input
              type="text"
              name="taste"
              defaultValue={taste}
              className="grow w-full"
              placeholder="taste of coffee"
            />
          </label>
        </div>

        <div className="md:flex gap-4 my-4 ">
          <label className="input md:w-1/2 input-bordered flex items-center gap-2">
            Category
            <input
              type="text"
              name="category"
              defaultValue={category}
              className="grow w-full"
              placeholder=" Coffee Category"
            />
          </label>
          <label className="input md:w-1/2 input-bordered flex items-center gap-2">
            Details
            <input
              type="text"
              name="details"
              defaultValue={details}
              className="grow w-full"
              placeholder="Coffee Details"
            />
          </label>
        </div>
        <label className="w-full input input-bordered flex items-center gap-2">
          Photo
          <input
            type="text"
            name="photo"
            defaultValue={photo}
            className="grow w-full"
            placeholder="Link the photo here"
          />
        </label>
        <input
          type="submit"
          value="Update Coffee Details"
          className="bg-[#D2B48C] btn btn-block p-4 m-4 text-gray-900 font-bold rounded-md  "
        />
      </form>
    </div>
  );
};

export default UpdateCoffe;
