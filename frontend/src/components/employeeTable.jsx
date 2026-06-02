import {
  Pencil,
  Trash2,
  Phone,
  Mail,
  Calendar,
  BadgeCheck,
  Briefcase
} from "lucide-react";
import React from "react";

const EmployeeCards = React.memo(({
  employees = [],
  onEdit,
  onDelete,
  onView,
  onAssignProject
}) => {
  return (
    <section className=" px-4 sm:px-6 mb-7 py-8 min-h-[40vh]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white/70  border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {emp.name || "—"}
                </h3>

                <span className="mt-2 inline-block text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {emp.role || "—"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(emp)}
                  className="p-2 border rounded-lg hover:bg-gray-100 transition text-blue-600"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => onDelete?.(emp.id)}
                  className="p-2 border rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Employee Details */}
            {/* Assign Project Button */}


{/* Assign Project Button */}
{onAssignProject && (
  <button
    type="button"
    onClick={() => onAssignProject(emp)}
    className="
      mt-4
      w-full
      flex
      items-center
      justify-center
      gap-2
      px-4
      py-2.5
      rounded-xl
      bg-gradient-to-r
      from-indigo-600
      to-violet-600
      text-white
      font-semibold
      shadow-md
      hover:shadow-lg
      hover:from-indigo-700
      hover:to-violet-700
      active:scale-95
      transition-all
      duration-300
    "
  >
    <Briefcase size={16} />
    Assign Project
  </button>
)}
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Phone size={15} />
                <span>{emp.number || "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={15} />
                <span className="truncate">{emp.email || "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={15} />
                <span>{emp.DOB || "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <BadgeCheck size={15} />
                <span>{emp.aadhar || "—"}</span>
              </div>
            </div>
          </div>
        ))}

        {employees.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">
            No employees found
          </div>
        )}
      </div>
    </section>
  );
});

export default EmployeeCards;
