import React, { useState } from "react";
import "./Contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:8080/save/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("✅ Thanks for contacting us! We'll reach out soon.");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setStatus("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("⚠️ Server not reachable. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section">
      {loading && (
        <div className="loader-overlay">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Sending your message...</p>
        </div>
      )}

      {/* Main Form */}
      <div className={`contact-container ${loading ? "blurred" : ""}`}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
};

export default Contact;