import { Plus, FileText, X } from 'lucide-react'
import { useState, useEffect } from 'react';
import ProposalList from "../components/ProposalTable";
import ProposalPreviewModal from "../components/ProposalPreviewModal";
import { API } from "../config/api";
import { apiFetch } from "../utils/apiFetch";
import { ProposalListSkeleton } from '../components/Skeletons';
const Proposals = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const formatDate = (val) => {
        if (!val) return "—";
        if (typeof val === "string") return val;
        if (val.seconds) return new Date(val.seconds * 1000).toLocaleDateString();
        return "—";
    };

    // const handleEdit = (p) => {
    //     setFormData({
    //         proposalTitle: p.proposalTitle || "",
    //         clientName: p.clientName || "",
    //         description: p.description || "",
    //         amount: p.amount || "",
    //         currency: p.currency || "",
    //         validUntil: p.validUntil || "",
    //         deliverables: p.deliverables || "",
    //         timeline: p.timeline || "",
    //         paymentterms: p.paymentterms || "",
    //         condition: p.condition || "",
    //     });
    //     setEditingId(p.id);
    //     setShowForm(true);
    // };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };
    const confirmDelete = async () => {
        try {
            await apiFetch(`${API.proposals}/${selectedId}`, {
                method: "DELETE",
            });

            setProposals(prev => prev.filter(p => p.id !== selectedId));

            setShowDeleteModal(false);
            setSelectedId(null);

        } catch (err) {
            console.error(err);
        }
    };


    const [formData, setFormData] = useState({
        proposalTitle: "",
        clientName: "",
        description: "",
        amount: "",
        currency: "",
        validUntil: "",
        deliverables: "",
        timeline: "",
        paymentterms: "",
        condition: "",
    })
    const fetchProposals = async () => {
        try {
            setLoading(true);
            const data = await apiFetch(API.proposals);
            setProposals(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch proposals:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    const loadData = async () => {
        try {
            setLoading(true);

            const [clientsData, proposalsData] = await Promise.all([
                apiFetch(API.clients),
                apiFetch(API.proposals),
            ]);

            setClients(Array.isArray(clientsData) ? clientsData : []);
            setProposals(Array.isArray(proposalsData) ? proposalsData : []);

        } catch (err) {
            console.error(err);
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
        ? `${API.proposals}/${editingId}`
        : API.proposals;

    try {
        const savedProposal = await apiFetch(url, {
            method,
            body: JSON.stringify(formData),
        });

        if (editingId) {
            setProposals(prev =>
                prev.map(p =>
                    p.id === editingId
                        ? { ...p, ...formData, id: editingId }
                        : p
                )
            );
        } else {
            setProposals(prev => [...prev, savedProposal]);
        }

        setFormData({
            proposalTitle: "",
            clientName: "",
            description: "",
            amount: "",
            currency: "",
            validUntil: "",
            deliverables: "",
            timeline: "",
            paymentterms: "",
            condition: "",
        });

        setEditingId(null);
        setShowForm(false);

    } catch (err) {
        alert(err.message || "Failed to save proposal");
    }
};


    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="min-h-screen bg-gray-50 ">

                <section className="w-full p-6 " >
                    <div className='mx-auto max-w-7xl px-6 py-6'>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">

                            <div >
                                <h2 className="text-3xl font-bold">Proposals & Contracts</h2>
                                <p className='text-gray-600'>Create, send, and manage professional proposals</p>

                            </div>


                            <button onClick={() => setShowForm(true)} className='inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                     text-white bg-[#667CFA] rounded-lg active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-black/30'><Plus size={16} />New Proposal</button>

                        </div>
                    </div>
                </section>
                {/*tabe*/}
                {loading ? (
                    <ProposalListSkeleton />) : Array.isArray(proposals) && proposals.length === 0 ? (
                        <section className="bg-gray-50 mb-7 px-4 sm:px-6 flex justify-center">
                            <div className="w-full max-w-7xl p-12 bg-white border-2 rounded-lg
                    flex flex-col items-center gap-5">
                                <FileText size={50} className="text-gray-400" />
                                <h1 className="text-xl font-semibold">No proposals yet</h1>
                                <p className="text-gray-600 text-center">
                                    Create your first proposal to get started.
                                </p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2.5
                   text-sm font-semibold text-white bg-[#667CFA]
                   rounded-lg"
                                >
                                    <Plus size={16} /> Create Proposal
                                </button>
                            </div>
                        </section>
                    ) : (
                    <ProposalList
                        proposals={proposals}
                        onView={(p) => setSelectedProposal(p)}
                        onDelete={handleDelete}
                    // onDownload={downloadProposalPdf}
                    />

                )}

                {/*Form*/}
                {showForm &&

                    <section onClick={() => setShowForm(false)}>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">


                            <form
                                onClick={(e) => e.stopPropagation()}
                                onSubmit={handleSubmit}
                                className="w-full max-w-2xl bg-white rounded-xl shadow-lg
                 max-h-[90vh] flex flex-col"
                            >


                                <div className="overflow-y-auto px-6 py-4 space-y-4">

                                    <div className="flex items-center justify-between py-4">
                                        <h2 className="text-lg font-semibold">Create New Proposal</h2>
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                        >
                                            <X size={20} className="text-gray-500 hover:text-gray-700" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Proposal Title"
                                            name="proposalTitle"
                                            placeholder="Website Redesign Project"
                                            value={formData.proposalTitle}
                                            onChange={handleChange}
                                        />

                                        <select
                                            name="clientName"
                                            value={formData.clientName}
                                            onChange={handleChange}
                                            className=" w-full h-[40px] rounded-md border px-3 text-sm mt-6"

                                        >
                                            <option value="">Select client</option>
                                            {clients.map(client => (
                                                <option key={client.id} value={client.name}>
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <Textarea
                                        label="Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the project scope, objectives, and key deliverables..."
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input label="Amount" name="amount" value={formData.amount}
                                            onChange={handleChange} placeholder="5000" />
                                        <Select
                                            label="Currency"
                                            name="currency"
                                            value={formData.currency}
                                            onChange={handleChange}
                                            options={[
                                                { value: "USD", label: "USD" },
                                                { value: "EUF", label: "EUF" },
                                                { value: "CHF", label: "CHF" },
                                            ]}
                                        />

                                        <DateInput
                                            label="Valid Until"
                                            name="validUntil"
                                            value={formData.validUntil}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <Textarea
                                        label="Deliverables"
                                        name="deliverables"
                                        value={formData.deliverables}
                                        onChange={handleChange}
                                        placeholder="List all deliverables and milestones..."
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input label="Timeline" name="timeline" value={formData.timeline}
                                            onChange={handleChange} placeholder="6–8 weeks" />
                                        <Input
                                            label="Payment Terms"
                                            name="paymentterms"
                                            placeholder="50% Upfront, 50% on completion"
                                            value={formData.paymentterms}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <Textarea
                                        label="Terms & Conditions"
                                        name="condition"
                                        placeholder="Standard terms and Conditions for this proposals..."
                                        value={formData.condition}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="flex justify-end gap-3 px-6 py-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-bold rounded-md bg-blue-600 text-white"
                                    >
                                        Create Proposal
                                    </button>
                                </div>

                            </form>


                        </div>
                    </section>

                }
                {showDeleteModal && (
                    <section onClick={() => setShowDeleteModal(false)}>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 ">
                            <div
                                className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-lg font-semibold mb-3">
                                    Delete Proposal
                                </h2>

                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete this proposal?
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
            {selectedProposal && (
                <ProposalPreviewModal
                    proposal={selectedProposal}
                    onClose={() => setSelectedProposal(null)}
                />
            )}

        </>
    )
}
const Input = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-semibold text-black">{label}</label>
        <input
            {...props}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                 text-sm focus:outline-none focus:ring-2 focus:ring-black font-medium"
        />
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-semibold text-black">{label}</label>
        <textarea
            rows={3}
            {...props}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3
                 text-sm focus:outline-none focus:ring-2 focus:ring-black font-medium"
        />
    </div>
);

const Select = ({ label, name, options = [], value, onChange }) => {
    return (
        <div>
            <label className="text-sm font-semibold text-black">{label}</label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
                <option value="">Select</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};



const DateInput = ({ label, name, value, onChange }) => (
    <div>
        <label className="text-sm font-semibold">{label}</label>
        <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
    </div>
);

export default Proposals
