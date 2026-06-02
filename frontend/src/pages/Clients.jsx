import {
  Plus,
  Building,
  Users,
  Search,
  Mail,
  Phone,
  Briefcase,
  FolderKanban,
  Eye,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import ClientCards from "../components/ClientTable";
import { API } from "../config/api";
import { apiFetch } from "../utils/apiFetch";
import { ClientCardsSkeleton } from "../components/Skeletons";

function Clients() {
  // ==============================
  // State Management
  // ==============================
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    password: "",
  });

  // ==============================
  // Derived Statistics
  // ==============================
  const totalClients = clients.length;

  const activeClients = clients.filter(
    (client) => (client.status || "Active") === "Active"
  ).length;

  const totalProjects = clients.reduce(
    (sum, client) => sum + (client.projectCount || 0),
    0
  );

  const uniqueCompanies = new Set(
    clients
      .map((client) => client.company)
      .filter(Boolean)
  ).size;

  // ==============================
  // Search Filtering
  // ==============================
  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return clients.filter((client) => {
      return (
        (client.name || "")
          .toLowerCase()
          .includes(term) ||
        (client.email || "")
          .toLowerCase()
          .includes(term) ||
        (client.company || "")
          .toLowerCase()
          .includes(term) ||
        (client.phone || "")
          .toLowerCase()
          .includes(term)
      );
    });
  }, [clients, searchTerm]);

  // ==============================
  // Fetch Clients
  // ==============================
  const fetchClients = async () => {
    setLoading(true);

    try {
      const data = await apiFetch(API.clients);
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ==============================
  // View Client Details
  // ==============================
  const handleView = useCallback((client) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  }, []);

  // ==============================
  // Edit Client
  // ==============================
  const handleEdit = useCallback((client) => {
    setFormData({
      name: client.name || "",
      email: client.email || "",
      company: client.company || "",
      phone: client.phone || "",
      password: "",
    });

    setEditingId(client.id);
    setShowForm(true);
  }, []);

  // ==============================
  // Delete Client
  // ==============================
  const handleDeleteClick = useCallback((id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = async () => {
    await apiFetch(`${API.clients}/${selectedId}`, {
      method: "DELETE",
    });

    setClients((prev) =>
      prev.filter((c) => c.id !== selectedId)
    );

    setShowDeleteModal(false);
  };

  // ==============================
  // Form Change Handler
  // ==============================
  const handleChange = useCallback((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }, [formData]);
    // ==============================
  // Save Client (Add / Update)
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API.clients}/${editingId}`
      : API.clients;

    try {
      const savedClient = await apiFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (editingId) {
        setClients((prev) =>
          prev.map((client) =>
            client.id === editingId
              ? savedClient
              : client
          )
        );
      } else {
        setClients((prev) => [
          ...prev,
          savedClient,
        ]);
      }

      // Reset form
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        password: "",
      });

      setShowForm(false);
    } catch (err) {
      alert(err.message || "Failed to save client");
    }
  };

  // ==============================
  // Reset Form
  // ==============================
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      password: "",
    });
  };

  // ==============================
  // JSX START
  // ==============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* ==========================================
          Premium Hero Header
      ========================================== */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 md:p-10 shadow-2xl text-white">
            {/* Background Blurs */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left Content */}
              <div>
                

                <h1 className="text-4xl md:text-5xl font-bold">
                  Clients
                </h1>

                <p className="mt-3 text-indigo-100 text-lg max-w-2xl">
                  Manage relationships, monitor projects,
                  and access complete client profiles
                  in one beautiful workspace.
                </p>
              </div>

              {/* Add Client Button */}
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-indigo-700 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
              >
                <Plus size={20} />
                Add Client
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Search + Stats
      ========================================== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-5 shadow-xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by name, email, company, or phone..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Total Clients"
              value={totalClients}
              icon={Users}
              color="text-blue-600"
              bg="bg-blue-100"
            />

            <StatCard
              title="Active Clients"
              value={activeClients}
              icon={Briefcase}
              color="text-green-600"
              bg="bg-green-100"
            />

            <StatCard
              title="Companies"
              value={uniqueCompanies}
              icon={Building}
              color="text-purple-600"
              bg="bg-purple-100"
            />

            <StatCard
              title="Total Projects"
              value={totalProjects}
              icon={FolderKanban}
              color="text-orange-600"
              bg="bg-orange-100"
            />
          </div>
        </div>
      </section>
            {/* ==========================================
          Add / Edit Client Form
      ========================================== */}
      {showForm && (
        <section className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? "Update Client" : "Add New Client"}
              </h2>

              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Company
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    placeholder="9876543210"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
  <label className="text-sm font-semibold text-gray-700">
    Password
  </label>

  <Input
    name="password"
    type="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter Password"
    required={!editingId}
  />
</div>

                <div className="md:col-span-2 flex items-center gap-3 pt-2">
                  <Button type="submit">
                    {editingId ? "Update Client" : "Add Client"}
                  </Button>

                  <Button
                    type="button"
                    onClick={resetForm}
                    className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================
          Client List
      ========================================== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <ClientCardsSkeleton />
          ) : filteredClients.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-10 shadow-xl text-center">
              <Building
                size={56}
                className="mx-auto mb-5 text-gray-400"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                No Clients Found
              </h3>
              <p className="text-gray-600 mt-2">
                Add your first client to start managing
                projects and invoices.
              </p>
              <div className="mt-6">
                <Button onClick={() => setShowForm(true)}>
                  <Plus size={16} />
                  Add Client
                </Button>
              </div>
            </div>
          ) : (
            <ClientCards
              clients={filteredClients}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onView={handleView}
            />
          )}
        </div>
      </section>

      {/* Client Details Modal */}
      {showDetailsModal && selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedClient(null);
          }}
          onEdit={() => {
            setShowDetailsModal(false);
            handleEdit(selectedClient);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
const StatCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-600">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {value}
        </p>
      </div>

      <div className={`p-4 rounded-2xl ${bg} ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const Button = ({ children, className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold transition-all duration-200 active:scale-95";
  const defaultStyles =
    "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg";

  return (
    <button
      {...props}
      className={`${base} ${
        className || defaultStyles
      }`}
    >
      {children}
    </button>
  );
};

const ConfirmDeleteModal = ({
  onCancel,
  onConfirm,
}) => (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-gray-900">
        Delete Client?
      </h3>

      <p className="text-gray-600 mt-2">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          onClick={onCancel}
          className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
);

const ClientDetailsModal = ({
  client,
  onClose,
  onEdit,
}) => {
  const initials = (client.name || "C")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 text-white">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-3xl font-bold">
              {initials}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {client.name || "Unnamed Client"}
              </h2>
              <p className="text-indigo-100 mt-1">
                {client.company || "No company"}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailCard
            icon={Mail}
            label="Email"
            value={client.email || "Not provided"}
          />

          <DetailCard
            icon={Phone}
            label="Phone"
            value={client.phone || "Not provided"}
          />

          <DetailCard
            icon={Building}
            label="Company"
            value={client.company || "Not provided"}
          />

          <DetailCard
            icon={FolderKanban}
            label="Projects"
            value={client.projectCount || 0}
          />
        </div>

        {/* Actions */}
        <div className="px-8 pb-8 flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            Close
          </Button>

          <Button onClick={onEdit}>
            Edit Client
          </Button>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
        <Icon size={18} />
      </div>
      <p className="text-sm font-semibold text-gray-600">
        {label}
      </p>
    </div>

    <p className="text-gray-900 font-semibold break-all">
      {value}
    </p>
  </div>
);

export default Clients;