import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import {
  ClientProfileSkeleton,
} from "../components/Skeletons";
const ClientProfile = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

if (loading) {
  return <ClientProfileSkeleton />;
}

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold">
          {client.name}
        </h1>

        <p className="text-xl mt-2">
          {client.company}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Client Information
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <p className="text-gray-500">
              Client Name
            </p>
            <p className="font-semibold">
              {client.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Company
            </p>
            <p className="font-semibold">
              {client.company}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>
            <p className="font-semibold">
              {client.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Phone
            </p>
            <p className="font-semibold">
              {client.phone}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ClientProfile;