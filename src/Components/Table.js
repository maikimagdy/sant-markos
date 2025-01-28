import React from "react";
import { useNavigate } from "react-router-dom";

function Table({
  users,
  search,
  highlightText,
  editingUser,
  setEditingUser,
  formData,
  setFormData,
  // saveEditing,
  // DeleteDoc,
  // startEditing,
}) {
  const nav = useNavigate();
  const navFun = (id) => {
    nav(`/details/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Address</th>
            <th className="p-4 border-b">Phone</th>
            <th className="p-4 border-b">Year</th>
            {/* <th className="p-4 border-b text-center">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, no) => (
            <tr
              onClick={() => navFun(user.id)}
              key={user.id}
              className="hover:bg-purple-950 text-md text-white font-semibold cursor-pointer"
            >
              {editingUser === user.id ? (
                <>
                  <td className="p-4 border-b text-black">
                    <input
                      onClick={(e) => e.stopPropagation()}
                      value={formData.Name}
                      onChange={(e) =>
                        setFormData({ ...formData, Name: e.target.value })
                      }
                      className="border rounded-lg p-2  md:w-full w-fit"
                    />
                  </td>
                  <td className=" border-b whitespace-nowrap text-black">
                    <input
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
                      value={formData.Year}
                      onChange={(e) =>
                        setFormData({ ...formData, Year: e.target.value })
                      }
                      className="border rounded-lg p-2  md:w-full w-fit"
                    />
                  </td>
                  {/* <td className="p-4 border-b">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveEditing();
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingUser(null);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </td> */}
                </>
              ) : (
                <>
                  <td className="p-4 border-b">
                    {no + 1}- {highlightText(user.Name, search)}
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
                  {/* <td className="p-4 border-b">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(user);
                        }}
                      >
                        📝
                      </button>
                      <button
                        className="bg-red-500 text-white text-lg p-4 py-2 rounded-lg hover:bg-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          DeleteDoc(user.id);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </td> */}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
