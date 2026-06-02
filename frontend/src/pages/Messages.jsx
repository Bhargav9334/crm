import { MessageSquare, User, Send } from 'lucide-react'
import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/apiFetch';
import { API } from '../config/api';

const Messages = () => {
    const [showMessages, setShowMessages] = useState(true);
    const [showUnread, setShowUnread] = useState(false);
    const [showSent, setShowSent] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const [clients, setClients] = useState([]);
    const [clientsLoading, setClientsLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    useEffect(() => {
        const fetchClients = async () => {
            try {
                setClientsLoading(true);

                // API.clients = `${BASE_URL}/api/clients`
                const data = await apiFetch(API.clients);

                // Support both array and { clients: [...] } response formats
                const clientsList = Array.isArray(data)
                    ? data
                    : data?.clients || [];

                setClients(clientsList);
            } catch (error) {
                console.error("Failed to fetch clients:", error);
                setClients([]);
            } finally {
                setClientsLoading(false);
            }
        };

        fetchClients();
    }, []);
    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <section className="max-w-7xl mx-auto p-6 " >
                    <div className='mx-auto max-w-7xl px-1 py-1'>
                        <div className='flex items-center justify-between gap-48'>

                            <div >
                                <h2 className="text-3xl font-bold">Messages</h2>
                                <p className="text-gray-600 text-sm md:text-base whitespace-nowrap">Communicate with your clients directly through the platform</p>

                            </div>

                        </div>
                    </div>
                </section>
                <section className='max-w-7xl mx-auto px-4  '>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4 gap-4">

                        <StatsCard title="Total Messages"
                            value={0}
                            icon={MessageSquare}

                        //   iconColor="text-blue-600"
                        />
                        <StatsCard title="Unread Messages"
                            value={0}
                            rightSlot={
                                <span className="bg-[#EF4444] px-3 py-1 rounded-full text-sm font-semibold text-white">
                                    0
                                </span>
                            }
                        //   iconColor="text-green-600"
                        />
                        <StatsCard title="Active Conversations"
                            value={0}
                            icon={User}
                        //   iconColor="text-yellow-600"
                        />

                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                        <div className="bg-white border rounded-xl p-6 space-y-1.5 ">
                            <h2 className="text-2xl font-semibold leading-relaxed">Send New Message</h2>
                            <p className="text-sm text-gray-500 leading-relaxed mb-7">
                                Send a message to one of your clients
                            </p>

                            <label className="text-sm font-medium text-gray-900">
                                Select Client
                            </label>
                            <select
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                className="mt-1 w-full border rounded-md px-3 py-4 bg-gray-50 font-medium leading-loose text-sm mb-7"
                                disabled={clientsLoading}
                            >
                                <option value="">
                                    {clientsLoading ? "Loading clients..." : "Choose a client..."}
                                </option>

                                {clients.map((client) => (
                                    <option
                                        key={client.id || client._id}
                                        value={client.id || client._id}
                                    >
                                        {client.name || client.clientName || "Unnamed Client"}
                                    </option>
                                ))}
                            </select>

                            <label className="text-sm font-medium text-gray-900">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Type your message here..."
                                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                            />

                            <button className="mt-4 w-full bg-purple-400 disabled:pointer-events-none disabled:opacity-50
        text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm font-semibold" disabled>
                                <Send size={18} />Send Message
                            </button>
                        </div>


                        <div className="bg-white border rounded-xl p-6 space-y-1.5">
                            <h2 className="text-2xl font-semibold leading-relaxed">Message Filters</h2>
                            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                Filter and search your messages
                            </p>

                            <div className="flex gap-2 mb-4">

                                <button
                                    onClick={() => {
                                        setShowMessages(true);
                                        setShowUnread(false);
                                        setShowSent(false);
                                        setActiveTab("All");
                                    }}
                                    className={`px-4 py-1 rounded-md text-sm font-medium transition
      ${activeTab === "All"
                                            ? "bg-[#667CFA] text-white"
                                            : "bg-white border text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    All Messages
                                </button>

                                <button
                                    onClick={() => {
                                        setShowUnread(true);
                                        setShowMessages(false);
                                        setShowSent(false);
                                        setActiveTab("Unread");
                                    }}
                                    className={`px-4 py-1 rounded-md text-sm font-medium transition
      ${activeTab === "Unread"
                                            ? "bg-[#667CFA] text-white"
                                            : "bg-white border text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    Unread (0)
                                </button>

                                <button
                                    onClick={() => {
                                        setShowSent(true);
                                        setShowMessages(false);
                                        setShowUnread(false);
                                        setActiveTab("Sent");
                                    }}
                                    className={`px-4 py-1 rounded-md text-sm font-medium transition
      ${activeTab === "Sent"
                                            ? "bg-[#667CFA] text-white"
                                            : "bg-white border text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    Sent
                                </button>

                            </div>


                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>

                        {showMessages &&

                            <div className="bg-white border rounded-xl p-6 lg:col-span-1 space-y-1.5">
                                <h2 className="text-2xl font-semibold leading-relaxed">Recent Messages</h2>
                                <p className="text-sm  leading-relaxed  text-gray-500 mb-6">
                                    0 messages found
                                </p>

                                <div className="flex flex-col items-center text-center text-gray-500 gap-2 py-10 ">
                                    <MessageSquare size={39} />
                                    <p className="font-medium">No messages yet</p>
                                    <p className="text-sm">
                                        Send your first message to a client above
                                    </p>
                                </div>
                            </div>
                        }
                        {showUnread &&

                            <div className="bg-white border rounded-xl p-6 lg:col-span-1 space-y-1.5">
                                <h2 className="text-2xl font-semibold leading-relaxed">Recent Messages</h2>
                                <p className="text-sm  leading-relaxed  text-gray-500 mb-6">
                                    0 messages found
                                </p>

                                <div className="flex flex-col items-center text-center text-gray-500 gap-2 py-10 ">
                                    <MessageSquare size={39} />
                                    <p className="font-medium">No unread messages</p>
                                    <p className="text-sm">
                                        All messages have been read
                                    </p>
                                </div>
                            </div>
                        }

                        {showSent &&

                            <div className="bg-white border rounded-xl p-6 lg:col-span-1 space-y-1.5">
                                <h2 className="text-2xl font-semibold leading-relaxed">Recent Messages</h2>
                                <p className="text-sm  leading-relaxed  text-gray-500 mb-6">
                                    0 messages found
                                </p>

                                <div className="flex flex-col items-center text-center text-gray-500 gap-2 py-10 ">
                                    <MessageSquare size={39} />
                                    <p className="font-medium">No sent messages found</p>
                                    {/* <p className="text-sm">
                                Send your first message to a client above
                            </p> */}
                                </div>
                            </div>
                        }

                    </div>
                </section >

            </div >
        </>
    )
}
const StatsCard = ({
    title,
    value,
    icon: Icon,
    onClick,
    rightSlot,
    className = "",
}) => {
    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            className={`w-full border border-gray-200 rounded-lg p-6
        bg-white ${className}`}
        >

            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">
                    {title}
                </span>

                {rightSlot ? (
                    rightSlot
                ) : (
                    Icon && <Icon size={18} className="text-gray-400" />
                )}
            </div>


            <span className="mt-2 text-3xl font-bold text-gray-900">
                {value}
            </span>
        </div>
    );
};

export default Messages
