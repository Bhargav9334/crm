import { Eye, Pencil, Trash2 } from "lucide-react";

const InvoiceList = ({ invoices = [], onEdit, onDelete }) => {
  const statusStyle = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Overdue") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <section className=" px-4 sm:px-6 mb-7 py-8 min-h-[40vh]">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg space-y-6">

        <h2 className="text-xl font-bold text-gray-900">
          All Invoices
        </h2>

        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 border border-gray-200 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white/60"
          >
            {/* Left Side */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-bold text-lg">
                $
              </div>

              <div>
                <p className="font-semibold text-gray-900 text-base">
                  Invoice #{invoice.invoiceNumber}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {invoice.clientName} • Due: {invoice.dueDate || "—"}
                </p>

                {invoice.notes && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {invoice.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-between sm:justify-end gap-6">
              <div className="text-left sm:text-right">
                <p className="text-lg font-bold text-gray-900">
                  {invoice.currency || "CHF"} {invoice.amount}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                    invoice.status
                  )}`}
                >
                  {invoice.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(invoice)}
                  className="p-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete?.(invoice.id)}
                  className="p-2 border rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {invoices.length === 0 && (
          <p className="text-center text-gray-500 py-12 text-lg">
            No invoices found
          </p>
        )}
      </div>
    </section>
  );
};

export default InvoiceList;
