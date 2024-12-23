import React, { useState, useEffect } from 'react';
import { authAPI } from '../../api/auth.api';
import toast from 'react-hot-toast';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: ''
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.updateProfile(formData);
      setProfile(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="profile-section">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password (leave blank to keep current)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <div className="profile-header">
              <div className="avatar">
                <i className="fa fa-user"></i>
              </div>
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
            <div className="profile-details">
              <div className="detail-group">
                <h3>Account Details</h3>
                <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                <p><strong>Role:</strong> {profile.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;