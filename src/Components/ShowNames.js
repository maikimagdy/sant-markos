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

function ShowNames() {
  const namesRef = collection(db, "Names");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [user] = useAuthState(auth);
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year

  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Phone: "",
    Year: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const DeleteDoc = async (id) => {
    const userDoc = doc(db, "Names", id);
    try {
      await deleteDoc(userDoc);
      GetUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user.id);
    setFormData({
      Name: user.Name,
      Phone: user.Phone,
      Address: user.Address,
      Year: user.Year || "",
    });
  };

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
      (user.Year ? user.Year.toString() : "").toLowerCase();

    const yearMatches = selectedYear
      ? user.Year.toString() === selectedYear
      : true;

    return searchText.includes(search.toLowerCase()) && yearMatches;
  });

  if (user) {
    return (
      <div className="m-4">
        <h1 className="text-2xl font-bold mb-4">
          {filteredUsers.length === 0
            ? "No results found"
            : "Information of Users..."}
        </h1>
        <div className="mb-4 flex gap-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a user..."
            className="border-2 p-2 rounded-lg w-full max-w-md text-black"
          />

          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border-2 p-2 rounded-lg text-gray-600"
          >
            <option value="">All Years</option>
            {[...new Set(users.map((user) => user.Year))].map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {loading && (
          <div className="flex justify-center items-center space-x-2">
            <span>Loading...</span>
            <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Address</th>
                  <th className="p-4 border-b">Phone</th>
                  <th className="p-4 border-b">Year</th>
                  <th className="p-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-purple-950 text-md text-white font-semibold"
                  >
                    {editingUser === user.id ? (
                      <>
                        <td className="p-4 border-b text-black">
                          <input
                            value={formData.Name}
                            onChange={(e) =>
                              setFormData({ ...formData, Name: e.target.value })
                            }
                            className="border rounded-lg p-2  md:w-full w-fit"
                          />
                        </td>
                        <td className="p-4 border-b text-black">
                          <input
                            value={formData.Address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                Address: e.target.value,
                              })
                            }
                            className="border rounded-lg p-2  md:w-full w-fit"
                          />
                        </td>
                        <td className="p-4 border-b text-black">
                          <input
                            value={formData.Phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                Phone: e.target.value,
                              })
                            }
                            className="border rounded-lg p-2  md:w-full w-fit"
                          />
                        </td>
                        <td className="p-4 border-b text-black">
                          <input
                            value={formData.Year}
                            onChange={(e) =>
                              setFormData({ ...formData, Year: e.target.value })
                            }
                            className="border rounded-lg p-2  md:w-full w-fit"
                          />
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={saveEditing}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingUser(null)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 border-b">
                          {highlightText(user.Name, search)}
                        </td>
                        <td className="p-4 border-b">
                          {highlightText(user.Address, search)}
                        </td>
                        <td className="p-4 border-b">
                          {highlightText(user.Phone, search)}
                        </td>
                        <td className="p-4 border-b">
                          {highlightText(user.Year || "N/A", search)}
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                              onClick={() => DeleteDoc(user.id)}
                            >
                              ❌
                            </button>
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                              onClick={() => startEditing(user)}
                            >
                              📝
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link
          className="bg-orange-500 text-white p-4 mt-4 inline-block rounded-lg hover:bg-orange-400 font-semibold"
          to={"/namesform"}
        >
          Add User
        </Link>
      </div>
    );
  }
  return <div>U r not signed in</div>;
}

export default ShowNames;
