import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [profiles, setProfiles] = useState([]);
  const [message, setMessage] = useState("");

  // GET profiles
  const fetchProfiles = async () => {
    try {
      const res = await axios.get("/api/profiles");
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // POST profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/profiles", form);
      setMessage(res.data.message);
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
      });
      fetchProfiles(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessage("Error saving profile.");
    }
  };

  // DELETE profile
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/profiles/${id}`);
      setMessage("Profile deleted successfully.");
      fetchProfiles();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting profile.");
    }
  };

  return (
    <div className="profile-form-container">
      <h2>Profile Management</h2>
      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Profile</button>
      </form>

      <h3>Profiles List</h3>
      <ul className="profile-list">
        {profiles.map((profile) => (
          <li key={profile.id} className="profile-item">
            <div>
              <strong>{profile.first_name} {profile.last_name}</strong><br />
              {profile.email} | {profile.phone} | {profile.address}
            </div>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
