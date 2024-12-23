import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../api/auth.service";

const Registrationform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await authService.register(formData);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginform">
      <div className="container-login">
        <div className="wrapper">
          <div className="heading-login">
            <h1>Sign Up</h1>
            <p>
              Already a user?{" "}
              <span>
                <Link to="/login">Login here</Link>
              </span>
            </p>
          </div>
          <form onSubmit={handleRegister} className="form">
            <label className="label">
              Name
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="label">
              Email
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="label">
              Password
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <p className="forgot-pass">
              By signing up you agree to our{" "}
              <span>
                <Link to="/termsNconditions">terms & conditions</Link>
              </span>
            </p>
            <button 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registrationform;