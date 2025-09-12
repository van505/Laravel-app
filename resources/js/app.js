import React from "react";
import { createRoot } from "react-dom/client";
import ProfileForm from "./components/ProfileForm";

const container = document.getElementById("profile-form");

if (container) {
    const root = createRoot(container);
    root.render(<ProfileForm />);
}
