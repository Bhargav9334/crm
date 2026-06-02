import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch";
import { Plus } from "lucide-react";
import { API } from "../config/api";
import {ManagerTable} from "../components/Skeletons"

const AddManager = () => {
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [managers, setManagers] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleDeleteClick = (id) => {
        setSelectedId(id)
        setShowDeleteModal(true)
    }
    const fetchManagers = async () => {
        try {
            const data = await apiFetch(API.managers);
            setManagers(data);
        } catch {
            alert("Failed to load managers");
        } finally {
            setListLoading(false);
        }
    };
    const confirmDelete = async () => {
        apiFetch(`${API.manager}/${selectedId}`, {
            method: "DELETE",
        })
        console.log(selectedId)
            setShowDeleteModal(false)
            fetchManagers()
    }

    useEffect(() => {
        fetchManagers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            await apiFetch(API.manager, {
                method: "POST",
                body: JSON.stringify(formData),
            });

            alert("Manager created successfully");

            setFormData({ name: "", email: "", password: "" });
            setShowForm(false);
            fetchManagers();
        } catch (err) {
            alert(err.message || "Failed to create manager");
        } finally {
            setFormLoading(false);
        }
    };
    const formatDate = (createdAt) => {
        // console.log(createdAt)
        // if (!createdAt) return "-";

        if (createdAt.seconds) {
            return new Date(createdAt.seconds * 1000).toLocaleDateString();
        }

        const date = new Date(createdAt);
        return isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
    };
    const formatTime = (createdAt) => {
  if (!createdAt) return "-";

  // Firebase Timestamp format
  if (createdAt.seconds) {
    return new Date(createdAt.seconds * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  // Normal ISO date string
  const date = new Date(createdAt);

  return isNaN(date.getTime())
    ? "-"
    : date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
};

    return (
        <div className="min-h-screen bg-gray-50">


            <section className="w-full p-6">
                <div className="mx-auto max-w-7xl px-6 py-6 flex justify-between flex-col sm:flex-row items-start sm:items-center  gap-4 sm:gap-8">
                    <div>
                        <h2 className="text-3xl font-bold">Managers</h2>
                        <p className="text-gray-600">Manage your Managers.</p>
                    </div>

                    <button
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
            text-white bg-[#667CFA] rounded-lg active:scale-95"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus size={16} /> Add Manager
                    </button>
                </div>
            </section>


            {showForm && (
                <section className="flex justify-center px-4 mb-6">
                    <div className="w-full max-w-7xl p-8 bg-white border rounded-lg">
                        <h1 className="text-2xl font-bold mb-6">Add Manager</h1>

                        <form
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            onSubmit={handleSubmit}
                        >
                            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                            <Input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="md:col-span-2"
                            />

                            <div className="md:col-span-2 flex gap-3">
                                <Button type="submit" disabled={formLoading}>
                                    {formLoading ? "Creating..." : "Create Manager"}
                                </Button>

                                <Button
                                    type="button"
                                    className="bg-white text-black border"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            )}


            <section className="max-w-7xl mx-auto px-6">
                {listLoading ? (
    <ManagerTable />
) : managers.length === 0 ? (

                    <p className="text-gray-500">No managers found</p>
                ) : (
                    <table className="w-full text-sm border bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Role</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {managers.map(m => (
                                <tr key={m.id}>
                                    <td className="p-3 border" style={{ textAlign: "center" }}>
                                        {m.name}
                                    </td>
                                    <td className="p-3 border" style={{ textAlign: "center" }}>{m.email}</td>
                                    <td className="p-3 border" style={{ textAlign: "center" }}>
                                        <span
                                            className={`font-semibold uppercase ${(m.role || "").toLowerCase() === "admin"
                                                    ? "text-red-600"
                                                    : (m.role || "").toLowerCase() === "manager"
                                                        ? "text-green-600"
                                                        : "text-blue-600"
                                                }`}
                                        >
                                            {m.role || "MANAGER"}
                                        </span>
                                    </td>
                                    <td className="p-3 border" style={{ textAlign: "center" }}>
                                        {formatDate(m.createdAt)}
                                    </td>
                                    <td className="p-2 flex justify-center  ">
                                        <Button
                                            className="bg-red-500 text-white"
                                            onClick={()=>{handleDeleteClick(m.id)}}
                                        >
                                            Delete
                                        </Button>




                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
              {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Delete this client?
              </h2>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
        
    );
};


const Input = (props) => (
    <input
        {...props}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
);

const Button = ({ children, className = "", ...props }) => (
    <button
        {...props}
        className={`px-4 py-2.5 rounded-lg font-semibold ${className || "bg-[#667CFA] text-white"}`}
    >
        {children}
    </button>
);

export default AddManager;
