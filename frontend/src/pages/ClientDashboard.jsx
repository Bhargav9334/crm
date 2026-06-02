import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import {
  ClientDashboardSkeleton,
} from "../components/Skeletons";
import {
  Building2,
  Mail,
  Phone,
  FolderKanban,
  User,
} from "lucide-react";

const ClientDashboard = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        API.clientProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClient(res.data || {});
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to server. Please check backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return <ClientDashboardSkeleton />;
}

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome, {client?.name || "Client"}
        </h1>

        <p className="text-lg opacity-90 mt-2">
          {client?.company || "-"}
        </p>

        <div className="flex flex-wrap gap-6 mt-5">
          <div className="flex items-center gap-2">
            <Mail size={18} />
            {client?.email || "-"}
          </div>

          <div className="flex items-center gap-2">
            <Phone size={18} />
            {client?.phone || "-"}
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Projects
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {client?.projects || 0}
              </h2>
            </div>

            <FolderKanban
              size={35}
              className="text-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Assigned
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                {client?.assignedProjects?.length || 0}
              </h2>
            </div>

            <FolderKanban
              size={35}
              className="text-green-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Company
              </p>

              <h2 className="font-bold text-lg mt-2">
                {client?.company || "-"}
              </h2>
            </div>

            <Building2
              size={35}
              className="text-purple-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Client
              </p>

              <h2 className="font-bold text-lg mt-2">
                {client?.name || "-"}
              </h2>
            </div>

            <User
              size={35}
              className="text-orange-500"
            />
          </div>
        </div>
      </div>
      {/* Projects */}

      <div className="bg-white rounded-3xl border shadow-sm mt-8 p-8">
        <h2 className="text-2xl font-bold mb-6">
          My Projects
        </h2>

        {client?.projectsData &&
        client.projectsData.length > 0 ? (

          client.projectsData.map((project) => (
            <div
              key={project.id}
              className="border rounded-2xl p-6 mb-5 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row justify-between">

                <div>
                  <h3 className="text-xl font-bold">
                    {project.projectName}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {project.progress || 0}% Complete
                  </span>
                </div>

              </div>

              <div className="mt-5">
                <div className="w-full h-3 bg-gray-200 rounded-full">

                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{
                      width: `${project.progress || 0}%`,
                    }}
                  />

                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <div>
                  <p className="text-gray-500">
                    Start Date
                  </p>

                  <p className="font-medium">
                    {project.startDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    End Date
                  </p>

                  <p className="font-medium">
                    {project.endDate || "-"}
                  </p>
                </div>

              </div>

              <div className="mt-5 bg-slate-50 p-4 rounded-xl">
                <h4 className="font-semibold mb-2">
                  Progress Notes
                </h4>

                <p>
                  {project.progressNotes ||
                    "No notes available"}
                </p>
              </div>
            </div>
          ))

        ) : (
          <div className="text-center py-10 text-gray-500">
            No Projects Assigned
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;