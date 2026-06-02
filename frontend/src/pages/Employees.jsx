import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Plus, Building, Briefcase } from 'lucide-react'
import EmployeeTable from '../components/employeeTable'
import { API } from "../config/api";
import { apiFetch } from "../utils/apiFetch";
import { EmployeeCardsSkeleton } from '../components/Skeletons';
const Employees = () => {
    const [editingId, setEditingId] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [availableProjects, setAvailableProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [formData, setFormData] = useState({
  name: "",
  number: "",
  email: "",
  password: "",
  DOB: "",
  pastCompany: "",
  role: "",
  salary: "",
  timeServed: "",
  portfolio: "",
  resume: "",
  aadhar: "",
  pan: "",
  empId: "",
  pfAccount: "",
  accountNumber: "",
  salaryAccount: "",
  hobby: "",
  futurePlans: "",
  emergencyContact: "",
});
    const handleEdit = useCallback((employee) => {
        setFormData({
            name: employee.name || "",
            number: employee.number || "",
            email: employee.email || "",
            DOB: employee.DOB || "",
            pastCompany: employee.pastCompany || "",
            role: employee.role || "",
            salary: employee.salary || "",
            timeServed: employee.timeServed || "",
            portfolio: employee.portfolio || "",
            resume: employee.resume || "",
            aadhar: employee.aadhar || "",
            pan: employee.pan || "",
            empId: employee.empId || "",
            pfAccount: employee.pfAccount || "",
            accountNumber: employee.accountNumber || "",
            salaryAccount: employee.salaryAccount || "",
            hobby: employee.hobby || "",
            futurePlans: employee.futurePlans || "",
            emergencyContact: employee.emergencyContact || "",
            password: "",
        });
        setEditingId(employee.id);
        setShowForm(true);
    }, []);

    const handleDelete = useCallback((id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    }, []);
    const confirmDelete = async () => {
        try {
            await apiFetch(`${API.employees}/${selectedId}`, {
                method: "DELETE",
            });

            setEmployees(prev => prev.filter(emp => emp.id !== selectedId));
        } catch (err) {
            console.error("Delete failed", err);
        } finally {
            setShowDeleteModal(false);
            setSelectedId(null);
        }
    };
    // =====================================================
    // STEP 1: UPDATE handleOpenAssignModal() IN Employees.jsx
    // =====================================================
    // Replace your existing handleOpenAssignModal function with this code.
    // This will:
    // 1. Fetch all active projects from backend
    // 2. Fetch already assigned projects of selected employee
    // 3. Mark assigned projects in the modal
    // 4. Show "Already Assigned" badge

    const handleOpenAssignModal = async (employee) => {
        try {
            setSelectedEmployee(employee);
            setShowAssignModal(true);
            setLoadingProjects(true);

            // Fetch all available projects
            const projectsData = await apiFetch(
                `${API.employees}/available-projects`
            );

            // Fetch already assigned projects of this employee
            const assignedData = await apiFetch(
                `${API.employees}/${employee.id}/projects`
            );

            const assignedIds = Array.isArray(assignedData)
                ? assignedData.map((project) => project.id)
                : [];

            // Add assigned flag to every project
            const projectsWithAssignedFlag = Array.isArray(projectsData)
                ? projectsData.map((project) => ({
                    ...project,
                    isAssigned: assignedIds.includes(project.id),
                }))
                : [];

            setAvailableProjects(projectsWithAssignedFlag);
        } catch (error) {
            console.error("Failed to load projects:", error);
            alert("Failed to load projects");
        } finally {
            setLoadingProjects(false);
        }
    };

    // =====================================================
    // STEP 2: UPDATE handleAssignProject() IN Employees.jsx
    // =====================================================
    // Replace your existing handleAssignProject function with this code.
    // After successful assignment:
    // 1. Shows success message
    // 2. Updates the project as assigned immediately
    // 3. Disables the button without reopening the modal

    const handleAssignProject = async (projectId) => {
        try {
            const result = await apiFetch(
                `${API.employees}/assign-project`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        employeeId: selectedEmployee.id,
                        projectId,
                    }),
                }
            );

            alert(result.message || "Project assigned successfully");


            // Update UI instantly
            setAvailableProjects((prev) =>
                prev.map((project) =>
                    project.id === projectId
                        ? { ...project, isAssigned: true }
                        : project
                )
            );
        } catch (error) {
            console.error("Assignment failed:", error);
            alert(
                error.message ||
                "This project is already assigned to this employee."
            );
        }
    };
    const handleRemoveProject = async (projectId) => {
        try {
            const result = await apiFetch(
                `${API.employees}/remove-project`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        employeeId: selectedEmployee.id,
                        projectId,
                    }),
                }
            );

            alert(result.message || "Project removed successfully");

            // Update UI instantly
            setAvailableProjects((prev) =>
                prev.map((project) =>
                    project.id === projectId
                        ? { ...project, isAssigned: false }
                        : project
                )
            );
        } catch (error) {
            console.error("Remove project failed:", error);
            alert(
                error.message ||
                "Failed to remove project"
            );
        }
    };
    const getAssignedEmployeeNames = (project) => {
        if (
            !project.assignedEmployees ||
            project.assignedEmployees.length === 0
        ) {
            return "No employees assigned";
        }

        const names = project.assignedEmployees
            .map((employeeId) => {
                const employee = employees.find(
                    (emp) => emp.id === employeeId
                );
                return employee ? employee.name : null;
            })
            .filter(Boolean);

        return names.length > 0
            ? names.join(", ")
            : "No employees assigned";
    };
    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiFetch(API.employees);
            setEmployees(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch employees:", err);
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editingId ? "PATCH" : "POST";
        const url = editingId
            ? `${API.employees}/${editingId}`
            : API.employees;

        try {
            const savedEmployee = await apiFetch(url, {
                method,
                body: JSON.stringify(formData),
            });

            if (editingId) {
                // UPDATE
                setEmployees(prev =>
                    prev.map(emp =>
                        emp.id === editingId ? savedEmployee : emp
                    )
                );
            } else {
                // CREATE
                setEmployees(prev => [...prev, savedEmployee]);
            }

            // Reset form AFTER updating list
            setFormData({
                name: "",
                number: "",
                email: "",
                DOB: "",
                pastCompany: "",
                role: "",
                salary: "",
                timeServed: "",
                portfolio: "",
                resume: "",
                aadhar: "",
                pan: "",
                empId: "",
                pfAccount: "",
                accountNumber: "",
                salaryAccount: "",
                hobby: "",
                futurePlans: "",
                emergencyContact: "",
                password: "",
            });

            setShowForm(false);
            setEditingId(null);

        } catch (err) {
            console.log("FULL ERROR:", err);
            alert(err.message || "Failed to save employee");
        }

    };

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };
    return (
        <>
            <div className='w-full min-h-screen bg-gray-50'>
                {/*header*/}
                <section className="w-full p-6 " >
                    <div className='mx-auto max-w-7xl px-6 py-6'>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">

                            <div >
                                <h2 className="text-3xl font-bold">Employee</h2>
                                <p className='text-gray-600'>Manage your employees</p>

                            </div>


                            <button onClick={() => setShowForm(true)} className='inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                     text-white bg-[#667CFA] rounded-lg active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-black/30'><Plus size={16} />Add Employee</button>

                        </div>
                    </div>
                </section>
                {/*Form*/}
                {showForm &&
                    <section className="max-w-6xl mx-auto bg-gray-50 mb-7">
                        <div className="w-full p-12 bg-white border rounded-lg flex flex-col gap-10">

                            <h1 className="text-2xl font-bold">Enter employee details</h1>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium">Full Name</label>
                                            <Input name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Mobile Number</label>
                                            <Input type="tel" name="number" placeholder="Enter your number"
                                                value={formData.number} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Email</label>
                                            <Input name="email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div>
  <label className="text-sm font-medium">
    Password
  </label>

  <Input
    type="password"
    name="password"
    placeholder="Enter Password"
    value={formData.password}
    onChange={handleChange}
    required={!editingId}
  />
</div>

                                        <div>
                                            <label className="text-sm font-medium">Date of Birth</label>
                                            <Input name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
                                        </div>
                                        {/* <div>
                                        <label className="text-sm font-medium">Sex:</label>
                                        <select name="" id="" className='px-7 py-3 rounded-md'>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div> */}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Work Experience</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium">Past Employer</label>
                                            <Input name="pastCompany" placeholder="Past company name" value={formData.pastCompany} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Role / Designation</label>
                                            <Input name="role" placeholder="Eg: fullStack developer" value={formData.role} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Last Drawn Salary</label>
                                            <Input name="salary" type="number" placeholder="Eg: 25000" value={formData.salary} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Time Served</label>
                                            <Input name="timeServed" placeholder="Eg: 2 Years" value={formData.timeServed} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Portfolio / Major Achievements</label>
                                    <Input name="portfolio" placeholder="Links or highlights" value={formData.portfolio} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Resume (Copy & Paste)</label>
                                    <textarea
                                        name="resume"
                                        rows={4}
                                        className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        value={formData.resume}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">KYC Documents</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium">Aadhar Number</label>
                                            <Input name="aadhar" placeholder="000000000000" value={formData.aadhar} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">PAN Number</label>
                                            <Input name="pan" placeholder="QWE34EWSDE" value={formData.pan} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Employee ID</label>
                                            <Input name="empId" placeholder="TCS12002" value={formData.empId} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">PF Account Number</label>
                                            <Input name="pfAccount" value={formData.pfAccount} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Bank Details</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium">Personal Account</label>
                                            <Input name="accountNumber" placeholder="0000000000000000" value={formData.accountNumber} onChange={handleChange} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Salary Account</label>
                                            <Input name="salaryAccount" value={formData.salaryAccount} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Likes / Interests / Hobbies</label>
                                    <Input name="hobby" value={formData.hobby} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Wishlist / Future Plans</label>
                                    <Input name="futurePlans" value={formData.futurePlans} onChange={handleChange} />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Emergency Contact (Family)</label>
                                    <Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
                                </div>
                                <div>
                                    {/* <h2 className="text-lg font-semibold mb-4">Nominee Details</h2> */}

                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium">Nominee Name</label>
                                            <Input name="nomineeName" />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Nominee Mobile</label>
                                            <Input name="nomineeMobile" type="tel" />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Nominee Email</label>
                                            <Input name="nomineeEmail" type="email" />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Relation</label>
                                            <Input name="nomineeRelation" />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Nominee KYC</label>
                                            <Input name="nomineeKyc" />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Nominee Bank Details</label>
                                            <Input name="nomineeBank" />
                                        </div>
                                    </div> */}
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Additional Comments</label>
                                    <textarea
                                        name="comments"
                                        rows={4}
                                        className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button type="submit">                                        {editingId ? "Update Employee" : "Create Employee"}
                                    </Button>
                                    <Button type="button" onClick={() => {
                                        setFormData({
                                            name: "",
                                            number: "",
                                            email: "",
                                            DOB: "",
                                            pastCompany: "",
                                            role: "",
                                            salary: "",
                                            timeServed: "",
                                            portfolio: "",
                                            resume: "",
                                            aadhar: "",
                                            pan: "",
                                            empId: "",
                                            pfAccount: "",
                                            accountNumber: "",
                                            salaryAccount: "",
                                            hobby: "",
                                            futurePlans: "",
                                            emergencyContact: "",
                                            password: "",

                                        }); setShowForm(false)
                                    }} className="bg-white text-black border">
                                        Cancel
                                    </Button>
                                </div>

                            </form>
                        </div>
                    </section >
                }

                {/*Table*/}
                {loading ? (
                    <EmployeeCardsSkeleton />)
                    : employees.length === 0 ? (
                        <section className="h-full flex items-center justify-center bg-gray-50 mb-7">
                            <div className="w-full max-w-6xl p-12 flex flex-col items-center gap-5 border bg-white rounded-lg">
                                <Building size={50} className="text-gray-500" />
                                <h1 className="text-xl font-semibold">No employee yet</h1>
                                <p className="text-gray-600">
                                    Add your employee details.
                                </p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                   text-white bg-[#667CFA] rounded-lg"
                                >
                                    <Plus size={16} /> Click to add
                                </button>
                            </div>
                        </section>
                    ) : (
                        <EmployeeTable
                            employees={employees}
                            // onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAssignProject={handleOpenAssignModal}
                        />

                    )}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">
                                Delete this employee?
                            </h2>

                            <p className="text-sm text-gray-500 mb-6">
                                This action cannot be undone.
                            </p>

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
                {showAssignModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">

                            {/* Header */}
                            <div className="p-6 border-b">
                                <h2 className="text-2xl font-bold">
                                    Assign Project to {selectedEmployee?.name}
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    Select a project from the list below.
                                </p>
                            </div>

                            {/* Project List */}
                            <div className="p-6 overflow-y-auto max-h-[55vh]">
                                {loadingProjects ? (
                                    <p className="text-gray-500">
                                        Loading projects...
                                    </p>
                                ) : availableProjects.length === 0 ? (
                                    <p className="text-gray-500">
                                        No active projects available.
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {availableProjects.map((project) => (
                                            <div
                                                key={project.id}
                                                className={`p-4 border rounded-2xl transition-all ${project.isAssigned
                                                    ? "bg-green-50 border-green-200"
                                                    : "hover:bg-indigo-50 hover:border-indigo-300"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    {/* Project Info */}
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {project.projectName ||
                                                                project.name ||
                                                                "Untitled Project"}
                                                        </h3>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Status: {project.status || "Active"}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Assigned Employees:
                                                            <span className="font-medium text-gray-700 ml-1">
                                                                {getAssignedEmployeeNames(project)}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    {project.isAssigned ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold whitespace-nowrap">
                                                                Assigned
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveProject(project.id)
                                                                }
                                                                className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 active:scale-95 transition-all"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleAssignProject(project.id)
                                                            }
                                                            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all whitespace-nowrap"
                                                        >
                                                            Assign
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAssignModal(false);
                                        setSelectedEmployee(null);
                                        setAvailableProjects([]);
                                    }}
                                    className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div >
        </>
    )
}
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
export default Employees
