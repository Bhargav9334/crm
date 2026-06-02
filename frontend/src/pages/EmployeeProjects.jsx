import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import { EmployeeProjectsSkeleton } from "../components/Skeletons";

const EmployeeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
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

      const employee = employeeRes.data;

      // All Projects
      const projectRes = await axios.get(
        API.projects,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allProjects = projectRes.data || [];

      const employeeProjects = allProjects.filter(
        (project) =>
          project.assignedEmployees?.includes(
            employee.id
          )
      );

      setProjects(employeeProjects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <EmployeeProjectsSkeleton />;
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          My Projects
        </h1>

        <p className="text-gray-500 mt-2">
          View all assigned projects and track progress
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-7">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Top */}
              <div className="flex justify-between items-start gap-4">

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {project.projectName}
                  </h2>

                  <p className="text-gray-600 mt-3">
                    {project.description ||
                      "No description available"}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-bold text-lg">
                  {project.progress || 0}%
                </span>

              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-4 bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${project.progress || 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div>
                  <p className="text-gray-500 text-sm">
                    Start Date
                  </p>

                  <p className="font-semibold text-lg">
                    {project.startDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    End Date
                  </p>

                  <p className="font-semibold text-lg">
                    {project.endDate || "-"}
                  </p>
                </div>

              </div>

              {/* Progress Notes */}
              {project.progressNotes && (
                <div className="mt-6 border-t pt-5">
                  <p className="text-gray-500 text-sm mb-2">
                    Progress Notes
                  </p>

                  <p className="text-gray-700">
                    {project.progressNotes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            No Projects Assigned
          </h2>

          <p className="text-gray-500 mt-3">
            You don't have any assigned projects yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployeeProjects;