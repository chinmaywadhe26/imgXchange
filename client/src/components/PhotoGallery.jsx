import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
// import {isAuthenticated} from "../../store/slices/authSlice.js"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { setAllPosts } from "../../store/slices/PostSlice";
// import Order from "../../../server/models/Order";

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.allPosts);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const getAllImages = async () => {
    if (posts.length > 0) return;
    const res = await axios.get(import.meta.env.VITE_API_URL + "/post/getAll");
    const { data } = await res.data;
    console.log(data);
    dispatch(setAllPosts(data));
  };

  const purchaseImage = async (price, id, postUrl, author, title) => {
    if (!isAuth) {
      toast.error("Please login to purchase");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/payment/generate",
        {
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );
      const { data } = await res.data;
      console.log("id before handlepaymentverify", data.id);
      handlePaymentVerify(data, id, postUrl, author, title, price);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePaymentVerify = async (
    data,
    id,
    postUrl,
    author,
    title,
    price
  ) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "ImageXchange",
      order_id: data.id,
      theme: {
        color: "#4320ba",
      },
      handler: async (response) => {
        try {
          const res = await axios.post(
            import.meta.env.VITE_API_URL + "/payment/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              postId: id,
              postUrl,
              author,
              title,
              price,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              withCredentials: true,
            }
          );
          const data = await res.data;
          toast.success(data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    };
    console.log(options);
    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  };

  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <div className="my-20 bg-white flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold my-14">Photos</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
        {/* card */}
        {posts.map(({ _id, title, price, image, author }) => {
          return (
            <ImageCard
              key={_id}
              id={_id}
              title={title}
              author={author}
              img={image}
              price={price}
              icon1={
                <FaShoppingCart
                  title="Cart"
                  onClick={() =>
                    purchaseImage(price, _id, image, author, title)
                  }
                  className="text-2xl cursor-pointer text-black hover:scale-110 transition-all ease-linear duration-300"
                />
              }
              icon2={
                <IoIosHeart className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition-all ease-linear duration-300" />
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGallery;
