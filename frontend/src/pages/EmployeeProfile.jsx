import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import {
  EmployeeProfileSkeleton,
} from "../components/Skeletons";
import {
  User,
  Mail,
  Phone,
  Building2,
  CreditCard,
  Briefcase,
    Pencil,
} from "lucide-react";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
const [editingSection, setEditingSection] =
  useState(null);
  const [profilePictureFile, setProfilePictureFile] =
  useState(null);
const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleProfilePictureChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setProfilePictureFile(file);

  const token = localStorage.getItem("token");

  const data = new FormData();
  data.append("profilePicture", file);

  try {
    await axios.put(
      API.employeeProfile,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await fetchProfile();

  } catch (err) {
    console.error(err);
  }
};

const handleSave = async () => {
  try {
    setSaving(true);

    const token = localStorage.getItem("token");

    const data = new FormData();

    data.append("name", formData.name || "");
    data.append("number", formData.number || "");
    data.append("email", formData.email || "");
    data.append(
      "pastCompany",
      formData.pastCompany || ""
    );
    data.append(
      "portfolio",
      formData.portfolio || ""
    );
    data.append(
      "pfAccount",
      formData.pfAccount || ""
    );
    data.append(
      "accountNumber",
      formData.accountNumber || ""
    );
    data.append(
      "salaryAccount",
      formData.salaryAccount || ""
    );
    data.append(
      "hobby",
      formData.hobby || ""
    );
    data.append(
      "futurePlans",
      formData.futurePlans || ""
    );
    data.append(
      "emergencyContact",
      formData.emergencyContact || ""
    );

    if (profilePictureFile) {
      data.append(
        "profilePicture",
        profilePictureFile
      );
    }

    const res = await axios.put(
      API.employeeProfile,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    console.log("UPDATED:", res.data);

    await fetchProfile();

    setProfilePictureFile(null);
    setEditingSection(null);

  } catch (err) {
    console.error(
      err.response?.data || err
    );
  } finally {
    setSaving(false);
  }
};
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        API.employeeProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployee(res.data || {});
setFormData(res.data || {});
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load profile data."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return <EmployeeProfileSkeleton />;
}

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">

  <div className="flex items-center gap-8">

    {/*employee.profilePicture */}
    <div className="relative">

  <img
    src={
      profilePictureFile
        ? URL.createObjectURL(
            profilePictureFile
          )
        : employee?.profilePicture
        ? employee.profilePicture
        : `https://ui-avatars.com/api/?name=${
            employee?.name || "E"
          }`
    }
    alt="Profile"
    className="w-32 h-32 rounded-full object-cover border-4 border-white"
  />

  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-lg">
    <Pencil
      size={18}
      className="text-blue-600"
    />

    <input
      type="file"
      hidden
      accept="image/*"
      onChange={
        handleProfilePictureChange
      }
    />
  </label>

</div>
    {/* Employee Info */}
    <div>
      <h1 className="text-5xl font-bold">
        {employee?.name || "Employee"}
      </h1>

      <p className="mt-2 text-2xl">
        {employee?.role || "-"}
      </p>

      <div className="mt-4 flex gap-6 text-lg">
        <span>{employee?.email}</span>
        <span>{employee?.number}</span>
      </div>
    </div>

  </div>

</div>

 
<div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">
      Personal Details
    </h2>

    <button
      onClick={() => setEditingSection("personal")}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      Edit
    </button>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <p className="text-gray-500">Name</p>
     {editingSection === "personal" ? (
  <input
    name="name"
    value={formData.name || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.name || "-"}</h3>
)}
    </div>

    <div>
      <p className="text-gray-500">Email</p>
{editingSection === "personal" ? (
  <input
    name="email"
    value={formData.email || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.email || "-"}</h3>
)}
    </div>

    <div>
      <p className="text-gray-500">Phone</p>
{editingSection === "personal" ? (
  <input
    name="number"
    value={formData.number || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.number || "-"}</h3>
)}
    </div>

   <div>
  <p className="text-gray-500">Salary</p>

  <h3 className="font-semibold">
    ₹ {employee?.salary || 0}
  </h3>
</div>
  </div>

  {editingSection === "personal" && (
    <div className="flex gap-3 mt-6">
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-5 py-2 rounded-xl"
      >
        Save
      </button>

      <button
        onClick={() => setEditingSection(null)}
        className="bg-red-600 text-white px-5 py-2 rounded-xl"
      >
        Cancel
      </button>
    </div>
  )}
</div>

<div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">
      Career Details
    </h2>

    <button
      onClick={() => setEditingSection("career")}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      Edit
    </button>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <p className="text-gray-500">
        Past Company
      </p>

      {editingSection === "career" ? (
        <input
          name="pastCompany"
          value={formData.pastCompany || ""}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />
      ) : (
        <h3>{employee?.pastCompany || "-"}</h3>
      )}
    </div>

    <div>
      <p className="text-gray-500">
        Future Plans
      </p>
{editingSection === "career" ? (
  <input
    name="futurePlans"
    value={formData.futurePlans || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.futurePlans || "-"}</h3>
)}
    </div>

    <div>
      <p className="text-gray-500">
        Hobby
      </p>

{editingSection === "career" ? (
  <input
    name="hobby"
    value={formData.hobby || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.hobby || "-"}</h3>
)}
    </div>

    <div>
      <p className="text-gray-500">
        Portfolio
      </p>

     {editingSection === "career" ? (
  <input
    name="portfolio"
    value={formData.portfolio || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <a
    href={employee?.portfolio}
    target="_blank"
    rel="noreferrer"
  >
    Open Portfolio
  </a>
)}
    </div>

  </div>

  {editingSection === "career" && (
    <div className="flex gap-3 mt-6">
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-5 py-2 rounded-xl"
      >
        Save
      </button>

      <button
        onClick={() => setEditingSection(null)}
        className="bg-red-600 text-white px-5 py-2 rounded-xl"
      >
        Cancel
      </button>
    </div>
  )}

</div>

      {/* Banking Details */}
<div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">
      Banking Details
    </h2>

    <button
      onClick={() => setEditingSection("banking")}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      Edit
    </button>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <p className="text-gray-500">
        Salary Account
      </p>

      {editingSection === "banking" ? (
        <input
          name="salaryAccount"
          value={formData.salaryAccount || ""}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />
      ) : (
        <h3>{employee?.salaryAccount || "-"}</h3>
      )}
    </div>

    <div>
      <p className="text-gray-500">
        Account Number
      </p>

{editingSection === "banking" ? (
  <input
    name="accountNumber"
    value={formData.accountNumber || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.accountNumber || "-"}</h3>
)}
    </div>

    <div>
      <p className="text-gray-500">
        PF Account
      </p>

   {editingSection === "banking" ? (
  <input
    name="pfAccount"
    value={formData.pfAccount || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.pfAccount || "-"}</h3>
)}
    </div>

    <div>
      <p className="text-gray-500">
        Emergency Contact
      </p>
{editingSection === "banking" ? (
  <input
    name="emergencyContact"
    value={formData.emergencyContact || ""}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
) : (
  <h3>{employee?.emergencyContact || "-"}</h3>
)}
    </div>

  </div>

  {editingSection === "banking" && (
    <div className="flex gap-3 mt-6">
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-5 py-2 rounded-xl"
      >
        Save
      </button>

      <button
        onClick={() => setEditingSection(null)}
        className="bg-red-600 text-white px-5 py-2 rounded-xl"
      >
        Cancel
      </button>
    </div>
  )}

</div>

      {/* Documents */}

      <div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Documents
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500">
              PAN Number
            </p>

            <h3>
              {employee?.pan || "-"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">
              Aadhaar Number
            </p>

            <h3>
              {employee?.aadhar || "-"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">
              Resume
            </p>

            <h3>
              {employee?.resume || "-"}
            </h3>
          </div>

        </div>
      </div>

    </div>
  );
};

export default EmployeeProfile;