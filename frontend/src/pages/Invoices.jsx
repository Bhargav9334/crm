import { Plus, Receipt, DollarSign, Calendar, FileText, X } from "lucide-react"
import { useState, useEffect, useCallback, useMemo } from "react";
import InvoiceList from "../components/InvoiceTable";
import { API } from "../config/api";
import { apiFetch } from "../utils/apiFetch";
import { InvoiceListSkeleton } from "../components/Skeletons";
const Invoices = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    description: "",
    amount: "",
    currency: "CHF",
    dueDate: "",
    notes: "",
  });
  const getInvoiceStatus = (invoice) => {
    const today = new Date();
    const due = invoice.dueDate ? new Date(invoice.dueDate) : null;

    if (invoice.paid) return "Paid";
    if (due && due < today) return "Overdue";
    return "Pending";
  };

  const handleEdit = (invoice) => {
    setFormData({
      invoiceNumber: invoice.invoiceNumber || "",
      clientName: invoice.clientName || "",
      description: invoice.description || "",
      amount: invoice.amount || "",
      currency: invoice.currency || "",
      dueDate: invoice.dueDate || "",
      notes: invoice.notes || "",
    });
    setEditingId(invoice.id);
    setShowForm(true);
  };

  const handleDeleteClick = useCallback(async (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  }, []);
  const confirmDelete = async () => {
    try {
      await apiFetch(`${API.invoices}/${selectedId}`, {
        method: "DELETE",
      });

      // Optimistic update (FAST)
      setInvoices(prev => prev.filter(inv => inv.id !== selectedId));

      setShowDeleteModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchInvoices = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await apiFetch(API.invoices);
  //     setInvoices(Array.isArray(data) ? data : []);

  //   } catch (err) {
  //     console.error("Failed to fetch invoices:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [clientsData, invoicesData] = await Promise.all([
          apiFetch(API.clients),
          apiFetch(API.invoices),
        ]);

        setClients(Array.isArray(clientsData) ? clientsData : []);
        setInvoices(Array.isArray(invoicesData) ? invoicesData : []);

      } catch (err) {
        console.error("Failed to load data:", err);
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
      ? `${API.invoices}/${editingId}`
      : API.invoices;

    try {
      const savedInvoice = await apiFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (editingId) {
        // Update existing
        setInvoices(prev =>
          prev.map(inv =>
            inv.id === editingId
              ? { ...inv, ...savedInvoice }
              : inv
          )
        );

      } else {
        // Add new
        setInvoices(prev => [...prev, savedInvoice]);
      }

      setFormData({
        invoiceNumber: "",
        clientName: "",
        description: "",
        amount: "",
        currency: "CHF",
        dueDate: "",
        notes: "",
      });

      setEditingId(null);
      setShowForm(false);

    } catch (err) {
      console.error(err);
    }
  };


  const resetForm = () => {
    setFormData({
      invoiceNumber: "",
      clientName: "",
      description: "",
      amount: "",
      currency: "CHF",
      dueDate: "",
      notes: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const stats = useMemo(() => {
    const withStatus = invoices.map(inv => ({
      ...inv,
      status: getInvoiceStatus(inv),
    }));

    return {
      total: withStatus.length,
      paid: withStatus.filter(i => i.status === "Paid").length,
      pending: withStatus.filter(i => i.status === "Pending").length,
      overdue: withStatus.filter(i => i.status === "Overdue").length,
    };
  }, [invoices]);


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className='w-full min-h-screen bg-gray-50'>

        <section className="w-full p-6 " >
          <div className='mx-auto max-w-7xl px-6 py-6'>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">

              <div >
                <h2 className="text-3xl font-bold">Invoices</h2>
                <p className='text-gray-600'>Manage your invoices and billing</p>

              </div>


              <button onClick={() => setShowForm(true)} className='inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                     text-white bg-[#667CFA] rounded-lg active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-black/30'><Plus size={16} />Create Invoice</button>

            </div>
          </div>
        </section>
        <section className='max-w-7xl mx-auto px-4  '>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 gap-4">

            <StatsCard
              title="Total Invoices"
              value={stats.total}
              icon={Receipt}
              iconColor="text-blue-600"
            />

            <StatsCard
              title="Paid"
              value={stats.paid}
              icon={DollarSign}
              iconColor="text-green-600"
            />

            <StatsCard
              title="Pending"
              value={stats.pending}
              icon={Calendar}
              iconColor="text-yellow-600"
            />

            <StatsCard
              title="Overdue"
              value={stats.overdue}
              icon={FileText}
              iconColor="text-red-600"
            />


          </div>
        </section>
        {loading ? <InvoiceListSkeleton /> : invoices.length === 0 ? (
          <section className="bg-gray-50 mb-7 px-4 sm:px-6 flex justify-center">
            <div className="w-full max-w-7xl p-12 bg-white border-2 rounded-lg
                    flex flex-col items-center gap-5">
              <Receipt size={50} className="text-gray-500" />
              <h1 className="text-xl font-semibold">No invoices yet</h1>
              <p className="text-gray-600 text-center">
                Start by creating your first invoice.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5
                   text-sm font-semibold text-white bg-[#667CFA]
                   rounded-lg"
              >
                <Plus size={16} /> Create Invoice
              </button>
            </div>
          </section>
        ) : (
          <InvoiceList
            invoices={invoices}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={(invoices) => console.log("view", invoices)}
          />


        )}

        {/*Form*/}
        {showForm &&
          <section onClick={() => setShowForm(false)} >
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 "  >

              <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 relative" onClick={(e) => e.stopPropagation()} >

                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">Create New Invoice</h2>
                  <button onClick={resetForm}>
                    <X className="text-gray-500 hover:text-gray-700" size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Client
                      </label>
                      <select
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Select client</option>
                        {clients.map(client => (
                          <option key={client.id} value={client.name}>
                            {client.name}
                          </option>
                        ))}
                      </select>

                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Invoice Number
                      </label>
                      <input
                        type="text"
                        placeholder="INV-1768979011486"
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
                      />
                    </div>
                  </div>


                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Description of services or products"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Currency
                      </label>
                      <select className="mt-1 w-full rounded-md border  px-3 py-2 text-sm focus:outline-none  " name="currency" value={formData.currency}
                        onChange={handleChange}>
                        <option value="CHF" >CHF</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                      </select>

                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <div className="relative">
                        <input
                          type="date" name="dueDate"
                          value={formData.dueDate}
                          onChange={handleChange}
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />

                      </div>
                    </div>
                  </div>


                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Additional notes for the client"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>


                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}

                      className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-bold rounded-md bg-blue-600 text-white "
                    >
                      Create Invoice
                    </button>
                  </div>
                </form>
              </div>
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
                  Delete Invoice
                </h2>

                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this invoice?
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


      </div>
    </>
  )
}
const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  onClick,
  iconColor = "text-blue-600",
  className = "",
}) => {
  return (
    <div onClick={onClick}
      role="button"
      tabIndex={0}

      className={`w-full border border-gray-200 rounded-lg p-6
                  flex items-center justify-between bg-white gap-20 pl-6${className}`}
    >
      <div className="flex flex-col ">
        <span className="text-sm font-semibold text-gray-800">
          {title}
        </span>

        <span className={`text-3xl font-bold ${iconColor}`}>
          {value}
        </span>


      </div>

      {Icon && (
        <div className={`p-3  rounded-full ${iconColor}`}>
          <Icon size={28} />
        </div>
      )}
    </div>
  );
};

export default Invoices
