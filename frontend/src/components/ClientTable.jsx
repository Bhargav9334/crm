import { Trash2, Pencil } from "lucide-react";
import React from "react";

const ClientCards = React.memo(({ clients = [], onEdit, onDelete }) => {  
  return (
    <section className=" mb-7 px-4 sm:px-6 py-8 min-h-[40vh]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white/20  border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {client.name || "—"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {client.company || "—"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(client)}
                  className="p-2 rounded-lg border hover:bg-gray-100 transition text-blue-600"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => onDelete?.(client.id)}
                  className="p-2 rounded-lg border hover:bg-red-50 hover:text-red-600 transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p className="truncate">{client.email || "—"}</p>
              <p>{client.phone || "—"}</p>
            </div>

            {/* Footer Stats */}
            <div className="mt-5 pt-4 border-t border-gray-200 text-sm flex justify-between items-center">
              <span className="text-gray-600">
                Projects: <span className="font-semibold">{client.projects || 0}</span>
              </span>

              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                Active
              </span>
            </div>
          </div>
        ))}

        {clients.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">
            No clients found
          </div>
        )}
      </div>
    </section>
  );
});

export default ClientCards;
