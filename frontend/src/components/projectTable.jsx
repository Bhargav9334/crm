import { Pencil, Trash2, User, Users } from "lucide-react";

const ProjectCards = ({
  projects = [],
  clients = [],
  employees = [], // ✅ Receive employees from Project.jsx
  onEdit,
  onDelete,
}) => {
  // Client ID -> Client Name map
  const clientMap = clients.reduce((acc, client) => {
    acc[client.id] = client.name;
    return acc;
  }, {});

  // Employee ID -> Employee Name map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.id] = employee.name;
    return acc;
  }, {});

  // Convert assigned employee IDs to names
  const getAssignedEmployeeNames = (project) => {
    if (
      !project.assignedEmployees ||
      !Array.isArray(project.assignedEmployees) ||
      project.assignedEmployees.length === 0
    ) {
      return "No employees assigned";
    }

    const names = project.assignedEmployees
      .map((employeeId) => employeeMap[employeeId])
      .filter(Boolean);

    return names.length > 0
      ? names.join(", ")
      : "No employees assigned";
  };

  return (
    <section className="px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          const status =
            Number(project.progress) === 100
              ? "active"
              : "inactive";

          return (
            <div
              key={project.id}
              className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.projectName}
                  </h3>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                      status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(project)}
                    className="p-2 border rounded-lg hover:bg-gray-100 transition"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={() => onDelete?.(project.id)}
                    className="p-2 border rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Client */}
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                <User size={15} />
                <span>{clientMap[project.clientId] || "—"}</span>
              </div>

              {/* Assigned Employees */}
              <div className="flex items-start gap-2 mt-3 text-sm text-gray-600">
                <Users
                  size={15}
                  className="mt-0.5 flex-shrink-0"
                />
                <span className="leading-5">
                  {getAssignedEmployeeNames(project)}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                {project.description || "—"}
              </p>

              {/* Progress Section */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {project.progress || 0}%
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${project.progress || 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mt-5 bg-white/60 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
                <span className="font-semibold text-gray-800">
                  Notes:
                </span>{" "}
                {project.progressNotes || "—"}
              </div>
            </div>
          );
        })}

        {projects.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">
            No projects found
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectCards;