import React, { useState } from "react";
import axios from "axios";

export default function ProfileForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/profile", form);
      setMessage(res.data.message);
      setProfile(res.data.profile); // show saved profile
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      setMessage("Error saving profile.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Create Profile</h2>
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {profile && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Profile Saved:</h3>
          <p>Name: {profile.first_name} {profile.last_name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}</p>
          <p className="text-sm text-gray-500">
            Created at: {new Date(profile.created_at).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
