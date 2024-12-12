import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCoffee = () => {
  const navigate = useNavigate();
    const handlerAddCoffee = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;
        const newCoffee = {name,quantity,supplier,taste,category,details,photo};
        console.log(newCoffee);

        fetch('https://cofee-store-server-ten.vercel.app/coffee',{ 
            method:"POST",
            headers:{
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newCoffee),
        })
        .then(res =>res.json())
        .then(data => {
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
       
    }
  return (
    <div className="bg-[#F4F3F0] p-24 min-h-screen mx-auto w-11/12">
      <h1 className="text-5xl font-extrabold my-4">Add Coffee</h1>
      <form onSubmit={handlerAddCoffee}>
        {/* row name and quantity */}
        <div className="md:flex gap-4 my-4 ">
        <label className="input md:w-1/2 input-bordered flex items-center gap-2">
          Name
          <input type="text" name="name" className="grow w-full" placeholder=" Coffee Name" />
        </label>
        <label className="input md:w-1/2 input-bordered flex items-center gap-2">
          Available Quantity
          <input type="text" name="quantity" className="grow" placeholder="Chef Name" />
        </label>
        </div>

        <div className="md:flex gap-4 my-4 ">
        <label className="input md:w-1/2 input-bordered flex items-center gap-2">
        Supplier
          <input type="text" name="supplier" className="grow w-full" placeholder=" Coffee Supplier" />
        </label>
        <label className="input md:w-1/2 input-bordered flex items-center gap-2">
        Taste
          <input type="text" name="taste" className="grow w-full" placeholder="taste of coffee" />
        </label>
        </div>

        <div className="md:flex gap-4 my-4 ">
        <label className="input md:w-1/2 input-bordered flex items-center gap-2">
        Category
          <input type="text" name="category" className="grow w-full" placeholder=" Coffee Category" />
        </label>
        <label className="input md:w-1/2 input-bordered flex items-center gap-2">
          Details
          <input type="text" name="details" className="grow w-full" placeholder="Coffee Details" />
        </label>
        </div>
        <label className="w-full input input-bordered flex items-center gap-2">
        Photo
          <input type="text" name="photo" className="grow w-full" placeholder="Link the photo here" />
        </label>
        <input type="submit" value="Add Coffee Details"className="bg-[#D2B48C] btn btn-block p-4 m-4 text-gray-900 font-bold rounded-md  " />
       
      </form>
    </div>
  );
};

export default AddCoffee;
