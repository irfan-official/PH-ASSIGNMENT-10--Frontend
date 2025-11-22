import React, { useState, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { toast, Bounce } from "react-toastify";
import Page404 from "./Page404.jsx";
import ClientComment from "../components/ClintComment.jsx";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { Data_Context } from "../context/DataContext.jsx";
import Rating from "../components/Rating.jsx";
import NoServiceFound from "./NoServiceFound.jsx";
import { LiaCommentSolid } from "react-icons/lia";

function ReviewDetails() {
  const { id } = useParams();

  // const { apps, setApps, totalApps, setTotalApps } = useContext(UserContext);

  const [selectedApp, setSelectedApp] = useState({});
  const [excedID, setExcedID] = useState(false);
  const [checkReview, setCheckReview] = useState(null);

  let { allReviews, loader } = useContext(Data_Context);

  useEffect(() => {
    if (loader) {
      return;
    }
    // if (allReviews.length < 1) {
    //   DataFetching();
    // }

    const foundReview = allReviews.find((obj) => {
      let check = String(obj._id) === String(id);
      // console.log(
      //   `${obj._id} === ${Number(id)} = ${String(obj._id) === String(id)}`
      // );
      return check;
    });

    if (!foundReview) {
      setExcedID(true); // triggers 404 if not found
    } else {
      setCheckReview(foundReview);
    }
  }, [id, loader]);

  if (loader) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (excedID) {
    return <NoServiceFound />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-2  text-black px-6 sm:px-20  py-20">
      <section className="_top_ w-full flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-b-gray-600/40 py-6 lg:gap-8">
        <span className="_left_ rounded-xl overflow-hidden shadow-lg inline-block object-cover bg-cover">
          <img
            className="w-full h-[60vh] lg:w-[50rem]  object-cover object-center"
            src={checkReview?.image}
            alt=""
          />
        </span>
        <section className="_details_ _right_ w-full lg:w-[70%] flex flex-col items-start justify-center  gap-2"></section>
      </section>

      <section className=" _Review_ flex flex-col items-start justify-center gap-4 mt-20">
        <section className="_top_ flex items-end justify-center gap-3 ">
          <h2 className="font-bold text-4xl  ">Review</h2>
          <span className="text-3xl ">
            <BsFillChatRightTextFill />
          </span>
        </section>

        <span className="flex flex-col items-center justify-center gap-4 text-gray-700/70 text-justify">
          <p key={1}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            corporis, ipsa omnis obcaecati id, eaque praesentium eveniet quo
            molestiae ut consequatur ipsum tempore deserunt iure maxime
            inventore facere numquam quisquam temporibus.
          </p>
        </span>
      </section>

      <section className=" _Comments_ w-full flex flex-col items-start justify-start gap-7 mt-20 ">
        <section className=" flex gap-2 justify-start items-center  mb-2 ">
          <h2 className="font-bold text-4xl pb-2">Comments</h2>
          <span className="__number-of-comments_ font-semibold px-2 py-1 bg-slate-950 text-white shadow rounded-sm text-[0.92rem]">
            112
          </span>

          <span className=" text-[42px] ">
            <LiaCommentSolid />
          </span>
        </section>
        <section className="_insert_comments_ w-full flex justify-start items-center gap-4 mb-10">
          <section className="__left_ w-[60px] lg:w-[53px] h-[52px] rounded-full overflow-hidden shadow border-2 border-slate-400 object-cover bg-cover">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZWx8ZW58MHx8MHx8fDA%3D"
              alt=""
              className="w-full h-full object-cover object-top bg-slate-600"
            />
          </section>
          <section className="__right_ w-full h-full ">
            <input
              onClick={() => {
                alert("hello");
              }}
              readOnly={true}
              placeholder="Add a comment..."
              type="text"
              className="w-full h-full border-b-2 placeholder:font-semibold outline-none pb-1 cursor-text"
            />
          </section>
        </section>
        {/* <hr className="w-full border-b-2" /> */}
        <section className="w-full flex flex-col items-start justify-start gap-4">
          {[
            {
              image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZWx8ZW58MHx8MHx8fDA%3D",
              name: "test",
              time: "1/1/2002",
              comment:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut optio hic eum est expedita dolore provident dignissimos tempora sint voluptatum.",
            },
          ].map(({ image, name, time, comment }) => (
            <ClientComment
              image={image}
              name={name}
              time={time}
              comment={comment}
            />
          ))}
        </section>
      </section>
    </div>
  );
}

export default ReviewDetails;
