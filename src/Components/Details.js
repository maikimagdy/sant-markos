import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../config/firebase.ts";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const namesRef = collection(db, "Names");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Year: "",
    Address: "",
    Phone: "",
    Gender: "",
    Birthdate: "",
    College: "",
    Father: "",
    Lastvisit: "",
    Notes: "",
    Studying: "",
  });

  const GetUsers = async () => {
    setLoading(true);
    try {
      const data = await getDocs(namesRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const userRef = doc(db, "Names", id);
    try {
      await updateDoc(userRef, formData);
      console.log("User updated successfully");
      navigate("/shownames");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    const userRef = doc(db, "Names", id);
    try {
      await deleteDoc(userRef);
      navigate("/shownames");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);

  useEffect(() => {
    const detailedUser = users.find((user) => user.id === id);
    if (detailedUser) {
      setFormData(detailedUser);
    }
  }, [users, id]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Member Details...
        </h1>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-400"
        >
          Delete
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Existing Fields */}
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Year</label>
          <input
            type="text"
            value={formData.Year}
            onChange={(e) => setFormData({ ...formData, Year: e.target.value })}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Address</label>
          <input
            type="text"
            value={formData.Address}
            onChange={(e) =>
              setFormData({ ...formData, Address: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Phone</label>
          <input
            type="text"
            value={formData.Phone}
            onChange={(e) =>
              setFormData({ ...formData, Phone: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Gender</label>
          <select
            value={formData.Gender}
            onChange={(e) =>
              setFormData({ ...formData, Gender: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* New Fields */}
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Birthdate</label>
          <input
            type="text"
            value={formData.Birthdate}
            onChange={(e) =>
              setFormData({ ...formData, Birthdate: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">College</label>
          <input
            type="text"
            value={formData.College}
            onChange={(e) =>
              setFormData({ ...formData, College: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Father</label>
          <input
            type="text"
            value={formData.Father}
            onChange={(e) =>
              setFormData({ ...formData, Father: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Last Visit</label>
          <textarea
            type="text"
            value={formData.Lastvisit}
            onChange={(e) =>
              setFormData({ ...formData, Lastvisit: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <label className="font-semibold text-gray-700">Notes</label>
          <textarea
            value={formData.Notes}
            onChange={(e) =>
              setFormData({ ...formData, Notes: e.target.value })
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <Link
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-400"
          to={"/shownames"}
        >
          Back
        </Link>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-400"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default Details;
