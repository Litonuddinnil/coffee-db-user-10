import React, { useState } from "react";
import Navbar from "../Navbar";
import { useLoaderData } from "react-router-dom";
import CoffeeDetails from "../CoffeeDetails";

const HomeLayout = () => {
  const coffeeData = useLoaderData();
  const [coffees,setCoffees] = useState(coffeeData);
  return (
    <div className="mx-auto w-11/12">
      <div>
        <Navbar></Navbar>
      </div>
      <h1 className="font-bold text-5xl mb-2">Coffee Server</h1>
      <div className="grid grid-cols-3">
        {coffees.map((coffee) => (
          <CoffeeDetails key={coffee._id} coffees={coffees} setCoffees={setCoffees} coffee={coffee}></CoffeeDetails>
        ))}
      </div>
    </div>
  );
};

export default HomeLayout;
