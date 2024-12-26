import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
const ImageCard = ({ id, img, title, price, author, icon1, icon2 }) => {
  return (
    <div className="rounded-lg bg-white shadow-lg p-2 h-fit">
      <div className="w-full h-[200px] overflow-hidden rounded-2xl">
        <img
          src={img}
          alt={title}
          className="w-full h-full hover:scale-105 transition-all ease-linear duration-300 transform cursor-pointer"
        />
      </div>
      <div>
        <div className="flex justify-between items-center ">
          <p className="font-semibold text-white bg-black w-fit px-5 py-1 rounded-full text-sm mt-3">
            {"@" + author.charAt(0).toUpperCase() + author.slice(1)}
          </p>
          <div className="flex items-center justify-center  gap-5">
            {icon1}
            {icon2}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500">Price ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
