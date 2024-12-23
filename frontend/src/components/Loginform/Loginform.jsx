import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../api/auth.service";
import "./loginform.css";

const Loginform = () => {
  const [formData, setFormData] = useState({
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

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await authService.login(formData);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="loginform">
        <div className="container-login">
          <div className="wrapper">
            <div className="heading-login">
              <h1>Sign In</h1>
              <p>
                New User ?{" "}
                <span>
                  <Link to="/registration">Create an account</Link>
                </span>
              </p>
            </div>
            <form onSubmit={handleLogin} className="form">
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
                Forgot Password ?{" "}
                <span>
                  <Link to="/forgot-password">Click here to reset</Link>
                </span>
              </p>
              <button 
                className="submit-btn" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loginform;