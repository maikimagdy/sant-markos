import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase.ts";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Table from "./Table.js";

function ShowNames() {
  const namesRef = collection(db, "Names");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [user] = useAuthState(auth);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState(""); // Gender filter state
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Phone: "",
    Year: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  useEffect(() => {
    GetUsers();
  }, []);

  // const DeleteDoc = async (id) => {
  //   const userDoc = doc(db, "Names", id);
  //   try {
  //     await deleteDoc(userDoc);
  //     GetUsers();
  //   } catch (err) {
  //     console.error("Error deleting user:", err);
  //   }
  // };

  // const startEditing = (user) => {
  //   setEditingUser(user.id);
  //   setFormData({
  //     Name: user.Name,
  //     Phone: user.Phone,
  //     Address: user.Address,
  //     Year: user.Year || "",
  //   });
  // };

  const saveEditing = async () => {
    const userDoc = doc(db, "Names", editingUser);
    try {
      await updateDoc(userDoc, formData);
      setEditingUser(null);
      GetUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const safeText = String(text);
    const parts = safeText.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-orange-500 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const searchText =
      user.Name.toLowerCase() +
      user.Phone.toLowerCase() +
      user.Address.toLowerCase() +
      (user.Year ? user.Year.toString() : "").toLowerCase() +
      (user.Gender ? user.Gender.toLowerCase() : "");

    const yearMatches = selectedYear
      ? user.Year.toString() === selectedYear
      : true;

    const genderMatches = selectedGender
      ? user.Gender?.toLowerCase() === selectedGender.toLowerCase()
      : true;

    return (
      searchText.includes(search.toLowerCase()) && yearMatches && genderMatches
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  return user ? (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-4">
        {filteredUsers.length === 0
          ? "No results found"
          : "Information of Users..."}
      </h1>
      <div className="mb-4 flex flex-col md:flex-row  gap-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a user..."
          className="border-2 p-2 rounded-lg w-full max-w-md text-black"
        />

        <div className="flex justify-between gap-6 w-full">
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border-2 p-2 rounded-lg text-gray-600 w-full"
          >
            <option value="">All Years</option>
            {[...new Set(users.map((user) => user.Year))].map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            id="gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="border-2 p-2 rounded-lg text-gray-600 w-full "
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center space-x-2">
          <span>Loading...</span>
          <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && (
        <>
          <Table
            users={currentUsers}
            search={search}
            highlightText={highlightText}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
            formData={formData}
            setFormData={setFormData}
            // saveEditing={saveEditing}
            // DeleteDoc={DeleteDoc}
            // startEditing={startEditing}
          />
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      <Link
        className="bg-orange-500 text-white p-4 mt-4 inline-block rounded-lg hover:bg-orange-400 font-semibold"
        to={"/namesform"}
      >
        Add New Member
      </Link>
    </div>
  ) : (
    <div>U r not signed in</div>
  );
}

export default ShowNames;
