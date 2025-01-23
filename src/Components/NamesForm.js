import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function NamesForm() {
  const nav = useNavigate();
  const [user] = useAuthState(auth);

  const schema = Yup.object().shape({
    Name: Yup.string().required("You must insert a Name"),
    Phone: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only Numbers")
      .min(11, "Phone number must be at least 11 digits")
      .required("You must insert a Phone number"),
    Address: Yup.string(),
    Year: Yup.number().required("You must insert a Year"),
    Gender: Yup.string().required("You must select a gender"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const NamesRef = collection(db, "Names");

  const SubmitFun = async (data) => {
    try {
      if (!user) throw new Error("User not authenticated");

      await addDoc(NamesRef, {
        ...data,
        userName: user.displayName || "Anonymous",
        id: user.uid,
      });
      nav("/shownames");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const Back = () => {
    nav("/shownames");
  };

  if (user) {
    return (
      <div>
        <form
          onSubmit={handleSubmit(SubmitFun)}
          className="flex flex-col gap-2 m-2 text-black"
        >
          <input
            placeholder="Name...."
            className="shadow-lg px-2 py-6 rounded-sm"
            {...register("Name")}
          />
          <p className="text-red-800 text-sm font-bold">
            {errors.Name?.message}
          </p>

          <input
            placeholder="Phone...."
            className="py-6 px-2 shadow-lg rounded-sm"
            {...register("Phone")}
          />
          <p className="text-red-800 text-sm font-bold">
            {errors.Phone?.message}
          </p>

          <input
            placeholder="Year...."
            className="py-6 px-2 shadow-lg rounded-sm"
            {...register("Year")}
          />
          <p className="text-red-800 text-sm font-bold">
            {errors.Year?.message}
          </p>

          <select
            className="py-6 px-2 shadow-lg rounded-sm "
            {...register("Gender")}
          >
            <option value="">Select a gender....</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className="text-red-800 text-sm font-bold">
            {errors.Gender?.message}
          </p>

          <input
            placeholder="Address...."
            className="py-10 px-2 shadow-lg rounded-sm"
            {...register("Address")}
          />
          <p className="text-red-600 text-sm font-bold">
            {errors.Address?.message}
          </p>

          <div className="flex gap-2">
            <input
              type="submit"
              className="self-start bg-green-500 hover:bg-green-700 p-3 rounded-md text-white cursor-pointer font-semibold"
            />
            <button
              onClick={Back}
              className="self-start bg-blue-500 hover:bg-blue-700 px-6 py-3 font-semibold rounded-md text-white cursor-pointer"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <div>Not Logged In</div>;
}

export default NamesForm;
