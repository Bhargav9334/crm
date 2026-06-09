import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import {
  EmployeeDashboardSkeleton,
} from "../components/Skeletons";

import {
  User,
  Briefcase,
  IndianRupee,
  FolderKanban,
} from "lucide-react";

const EmployeeDashboard = () => {
 const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, []);

 const fetchEmployee = async () => {
  try {
    const token = localStorage.getItem("token");

    // Employee Profile
    const employeeRes = await axios.get(
      API.employeeProfile,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const employeeData = employeeRes.data;

    setEmployee(employeeData);

    // Projects
    const projectRes = await axios.get(
      API.projects,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const allProjects = projectRes.data || [];

    const employeeProjects =
      allProjects.filter((project) =>
        project.assignedEmployees?.includes(
          employeeData.id
        )
      );

    setProjects(employeeProjects);

  } catch (err) {
    console.error(err);

    setError(
      "Unable to connect to server. Please check backend is running."
    );
  } finally {
    setLoading(false);
  }
};

if (loading) {
  return <EmployeeDashboardSkeleton />;
}

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}

<div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg">

  <div className="flex items-center gap-6 ">

    {/* Profile Photo */}
    {employee?.profilePicture ? (
      <img
        src={employee.profilePicture}
        alt={employee.name}
        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
      />
    ) : (
      <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-4xl font-bold">
        {employee?.name?.[0]?.toUpperCase() || "E"}
      </div>
    )}

    {/* Employee Info */}
    <div>
      <h1 className="text-4xl font-bold">
        Welcome, {employee?.name || "Employee"}
      </h1>

      <p className="mt-2 text-xl text-white/90">
        {employee?.role || "-"}
      </p>

      <div className="flex flex-wrap gap-6 mt-5 text-lg">
        <span>{employee?.email || "-"}</span>
        <span>{employee?.number || "-"}</span>
      </div>
    </div>

  </div>

</div>
  

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-5 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Employee ID
              </p>

              <h2 className="text-3xl font-bold">
                {employee?.empId || "-"}
              </h2>
            </div>

            <User />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Projects
              </p>

              <h2 className="text-3xl font-bold">
                {projects.length}
              </h2>
            </div>

            <FolderKanban />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Salary
              </p>

              <h2 className="text-3xl font-bold">
                ₹{employee?.salary || 0}
              </h2>
            </div>

            <IndianRupee />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Experience
              </p>

              <h2 className="text-2xl font-bold">
                {employee?.timeServed || "-"}
              </h2>
            </div>

            <Briefcase />
          </div>
        </div>
      </div>

      {/* My Projects */}

<div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-2xl font-bold">
      My Projects
    </h2>

    {projects.length > 2 && (
      <button
        onClick={() =>
          navigate("/employee/projects")
        }
        className="text-blue-600 font-semibold hover:text-blue-800"
      >
        See All
      </button>
    )}

  </div>

{projects.length > 0 ? (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {projects.slice(0, 4).map((project) => (
      <div
        key={project.id}
        className="border rounded-2xl p-6 mb-5"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {project.projectName}
          </h3>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {project.progress || 0}% Complete
          </span>
        </div>

        <p className="text-gray-600 mt-3">
          {project.description}
        </p>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-4">
          <div
            className="h-3 bg-blue-600 rounded-full"
            style={{
              width: `${project.progress || 0}%`,
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-500">
              Start Date
            </p>
            <p>{project.startDate}</p>
          </div>

          <div>
            <p className="text-gray-500">
              End Date
            </p>
            <p>{project.endDate}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500">
            Progress Notes
          </p>

          <p>
            {project.progressNotes ||
              "No updates available"}
          </p>
        </div>
      </div>
  ))}
  </div>
) : (
    <div className="text-gray-500">
      No Projects Assigned
    </div>
  )}
</div>
      
        
      
    </div>
  );
};

export default EmployeeDashboard;