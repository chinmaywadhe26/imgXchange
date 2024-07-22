import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import ImageCard from "./ImageCard";
const PhotoGallery = () => {
  return (
    <div className="my-20 bg-white flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold my-14">Photos</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
        {/* card */}
        <ImageCard
          title="The BlackHole"
          author="chinmay"
          img="https://images.unsplash.com/photo-1720485143939-8dac5ade8705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={10}
          icon1={
            <FaShoppingCart className="text-2xl cursor-pointer text-black hover:scale-110 transition-all ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <ImageCard
          title="The BlackHole"
          author="chinmay"
          img="https://images.unsplash.com/photo-1720485143939-8dac5ade8705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={10}
          icon1={
            <FaShoppingCart className="text-2xl cursor-pointer text-black hover:scale-110 transition-all ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <ImageCard
          title="The BlackHole"
          author="chinmay"
          img="https://images.unsplash.com/photo-1720485143939-8dac5ade8705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={10}
          icon1={
            <FaShoppingCart className="text-2xl cursor-pointer text-black hover:scale-110 transition-all ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <ImageCard
          title="The BlackHole"
          author="chinmay"
          img="https://images.unsplash.com/photo-1720485143939-8dac5ade8705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={10}
          icon1={
            <FaShoppingCart className="text-2xl cursor-pointer text-black hover:scale-110 transition-all ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <ImageCard
          title="The BlackHole"
          author="chinmay"
          img="https://images.unsplash.com/photo-1720485143939-8dac5ade8705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={10}
          icon1={
            <FaShoppingCart className="text-2xl cursor-pointer text-black hover:scale-110 transition-all ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
