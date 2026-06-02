import { Eye, Trash2, Download } from "lucide-react";

const formatDate = (val) => {
  if (!val) return "—";
  if (typeof val === "string") return val;
  if (val.seconds) return new Date(val.seconds * 1000).toLocaleDateString();
  return "—";
};

const ProposalList = ({ proposals = [], onView, onDelete, onDownload }) => {
  const statusStyle = (status) => {
    if (status === "Accepted") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    if (status === "Sent") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <section className="bg-gray-50 px-4 sm:px-6 mb-7">
      <div className="max-w-7xl mx-auto bg-white border rounded-xl p-6 space-y-4">

        <h2 className="text-lg font-semibold">Proposals & Contracts</h2>

        {proposals.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <div className="space-y-1">
              <p className="font-semibold text-gray-900">
                {p.proposalTitle}
              </p>

              <p className="text-sm text-gray-600">
                {p.clientName} • Created {formatDate(p.createdAt)}
              </p>

              <p className="text-sm text-gray-500">
                {p.description || "—"}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onView?.(p)}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100"
                >
                  <Eye size={20}/>
                   
                </button>

                <button
                  onClick={() => onDelete?.(p.id)}
                  className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                >
                   <Trash2 size={20}/>
                </button>
              </div>
            </div>

            <div className="text-right space-y-2">
              <p className="text-xl font-semibold">
                {p.currency} {p.amount}
              </p>

              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle(
                  p.status
                )}`}
              >
                {p.status}
              </span>

              <p className="text-xs text-gray-500">
                Valid until: {formatDate(p.validUntil)}
              </p>
            </div>
          </div>
        ))}

        {proposals.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No proposals found
          </p>
        )}
      </div>
    </section>
  );
};

export default ProposalList;
