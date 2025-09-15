import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../sass/profileForm.scss";

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
  const [editingId, setEditingId] = useState(null); // ✅ Track which profile is being edited

  // Load profiles when component mounts
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("/api/profiles");
      setProfiles(res.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // ✅ If editing, send PUT request
        await axios.put(`/api/profiles/${editingId}`, form);
        setMessage("Profile successfully updated!");
        setEditingId(null); // Reset editing state
      } else {
        // ✅ If adding, send POST request
        await axios.post("/api/profiles", form);
        setMessage("Profile successfully added!");
      }

      // Clear form
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
      });

      // Refresh profile list
      fetchProfiles();

      // Hide message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error saving profile.");
    }
  };

  // ✅ Updated delete function with confirmation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/profiles/${id}`);
      setMessage("Profile deleted successfully!");
      fetchProfiles();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting profile:", err);
      setMessage("Error deleting profile.");
    }
  };

  // ✅ Edit function - load data into form
  const handleEdit = (profile) => {
    setForm({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
    });
    setEditingId(profile.id); // Track which profile is being edited
  };

  // ✅ Cancel function - reset form and exit edit mode
  const handleCancelEdit = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditingId(null); // Exit edit mode
  };

  return (
    <div className="profile-form-container">
      <h2>Profile Management</h2>

      {message && <div className="message">{message}</div>}

      <form className="profile-form" onSubmit={handleSubmit}>
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
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit">
            {editingId ? "Update Profile" : "Add Profile"}
          </button>

          {/* ✅ Cancel button shows only in edit mode */}
          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="profile-list">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <li key={profile.id} className="profile-item">
              <div className="profile-info">
                <strong>
                  {profile.first_name} {profile.last_name}
                </strong>
                <small>{profile.email}</small>
                <small>{profile.phone}</small>
                <small>{profile.address}</small>
              </div>
              <div className="profile-actions">
                {/* ✅ Edit button loads data into form */}
                <button
                  className="edit-btn"
                  type="button"
                  onClick={() => handleEdit(profile)}
                >
                  Edit
                </button>

                {/* ✅ Delete button */}
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => handleDelete(profile.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </ul>
    </div>
  );
}
