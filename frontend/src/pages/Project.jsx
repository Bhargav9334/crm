import { Plus, Building } from 'lucide-react';
import { useState, useEffect } from "react";
import ProjectCards from "../components/projectTable";
import { API } from "../config/api";
import { apiFetch } from "../utils/apiFetch";
import { ProjectCardsSkeleton } from '../components/Skeletons';
function Project() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        projectName: "",
        clientId: "",
        startDate: "",
        endDate: "",
        description: "",
        progress: "",
        progressNotes: ""
    });
    const handleEdit = (project) => {
        setFormData({
            projectName: project.projectName || "",
            clientId: project.clientId || "",
            startDate: project.startDate || "",
            endDate: project.endDate || "",
            description: project.description || "",
            progress: project.progress || "",
            progressNotes: project.progressNotes || "",
        });
        setEditingId(project.id);
        setShowForm(true);
    };
    const handleDelete = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };
    const confirmDelete = async () => {
        try {
            await apiFetch(`${API.projects}/${selectedId}`, {
                method: "DELETE",
            });

            setProjects(prev => prev.filter(p => p.id !== selectedId));

            setShowDeleteModal(false);
            setSelectedId(null);

        } catch (err) {
            console.error(err);
        }
    };

useEffect(() => {
    const loadData = async () => {
        try {
            setLoading(true);

            const [clientsData, projectsData, employeesData] =
                await Promise.all([
                    apiFetch(API.clients),
                    apiFetch(API.projects),
                    apiFetch(API.employees),
                ]);

            setClients(
                Array.isArray(clientsData) ? clientsData : []
            );

            setProjects(
                Array.isArray(projectsData) ? projectsData : []
            );

            setEmployees(
                Array.isArray(employeesData) ? employeesData : []
            );
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    };

    loadData();
}, []);





    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `${API.projects}/${editingId}`
            : API.projects;

        try {
            const savedProject = await apiFetch(url, {
                method,
                body: JSON.stringify(formData),
            });

            if (editingId) {
                setProjects(prev =>
                    prev.map(p =>
                        p.id === editingId
                            ? { ...p, ...formData, id: editingId }
                            : p
                    )
                );
            } else {
                setProjects(prev => [...prev, savedProject]);
            }

            setFormData({
                projectName: "",
                clientId: "",
                startDate: "",
                endDate: "",
                description: "",
                progress: "",
                progressNotes: "",
            });

            setShowForm(false);
            setEditingId(null);

        } catch (err) {
            alert(err.message || "Failed to save project");
        }
    };



    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // useEffect(() => {
    //     fetchClients();
    // }, []);
    return (
        < >
            <div className='w-full min-h-screen bg-gray-50 '>

                {/*Project page*/}

                <section className="w-full p-6 " >
                    <div className='mx-auto max-w-7xl px-6 py-6'>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">

                            <div >
                                <h2 className="text-3xl font-bold">Project</h2>
                                <p className='text-gray-600'>Manage your project portfolio</p>

                            </div>


                            <button onClick={() => setShowForm(true)} className='inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                     text-white bg-[#667CFA] rounded-lg active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-black/30'><Plus size={16} />Add Project</button>

                        </div>
                    </div>
                </section>
                {/*form*/}
                {showForm &&

                    <section className=" max-w-6xl mx-auto h-full flex items-center justify-center bg-gray-50 mb-7">
                        <div className="w-full max-w-6xl p-12 flex flex-col gap-6 border bg-white rounded-lg ">
                            <h1 className='text-2xl font-bold  '>Add New Project</h1>


                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1">

                                    <label className="text-sm font-medium">
                                        Project Name
                                    </label>
                                    <Input name="projectName"
                                        value={formData.projectName} placeholder="Project name" required onChange={handleChange} />

                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">Client</label>
                                    <select
                                        name="clientId"
                                        value={formData.clientId}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">No client (Independent project)</option>

                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>



                                <div className="flex flex-col gap-1 md:col-span-2">
                                    <label className="text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea className="w-4xl h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Project Description'
                                        name="description" value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">
                                        Start Date
                                    </label>
                                    <Input type="date" name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">
                                        End Date
                                    </label>
                                    <Input type="date" name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">
                                        Progress(%)
                                    </label>
                                    <Input type="number" name="progress"
                                        value={formData.progress} placeholder="0-100" min={0} max={100} required onChange={handleChange} />
                                </div>
                                <div className="flex flex-col gap-1 md:col-span-2">
                                    <label className="text-sm font-medium">
                                        Progress Notes
                                    </label>
                                    <textarea className="w-4xl h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Add notes about project progress...' name="progressNotes" value={formData.progressNotes} onChange={handleChange}></textarea>
                                </div>
                                <div className="md:col-span-2 flex gap-3 pt-4">
                                    <Button type="submit">
                                        {editingId ? "Update project" : "Create project"}

                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                projectName: "",
                                                clientId: "",
                                                startDate: "",
                                                endDate: "",
                                                description: "",
                                                progress: "",
                                                progressNotes: "",
                                            });
                                            setShowForm(false)
                                        }}
                                        className="bg-white text-black border"
                                    >
                                        Cancel
                                    </Button>
                                </div>

                            </form>





                        </div>

                    </section>
                }
                {showDeleteModal && (
                    <section onClick={() => setShowDeleteModal(false)}>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                            <div
                                className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-lg font-semibold mb-3">
                                    Delete Project
                                </h2>

                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete this project?
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="px-4 py-2 border rounded-md"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/*table*/}
                {loading ? (
                    <ProjectCardsSkeleton />
                ) : Array.isArray(projects) && projects.length === 0 ? (
                    <section className="h-full flex items-center justify-center bg-gray-50 mb-7">
                        <div className="w-full max-w-6xl p-12 flex flex-col items-center gap-5 border bg-white rounded-lg">
                            <Building size={50} className="text-gray-500" />
                            <h1 className="text-xl font-semibold">No project yet</h1>
                            <p className="text-gray-600">
                                Create your first project to start organizing your work.
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                text-white bg-[#667CFA] rounded-lg"
                            >
                                <Plus size={16} /> Create First Project
                            </button>
                        </div>
                    </section>
                ) : (
                    <ProjectCards
                        projects={projects}
                        clients={clients}
                        employees={employees}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}


            </div>
        </>
    );
};
const Input = (props) => (
    <input
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

    />
);
const Button = ({ children, className = "", ...props }) => {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30";

    const defaultStyles =
        "bg-[#667CFA] text-white hover:bg-[#566BEA]";

    return (
        <button
            {...props}
            className={`${baseStyles} ${className ? className : defaultStyles
                }`}
        >
            {children}
        </button>
    );
};



export default Project
