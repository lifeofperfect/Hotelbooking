import React, { useState } from "react";

export const RegisterForm = ({handleSubmit, name, email, password, setName, setEmail, setPassword}) => (

    
  <form onSubmit={handleSubmit}>
    <div className="form-group mt-3">
      <label className="form-label">Your Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label className="form-label">Email</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="pASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button className="btn btn-primary">Submit</button>
  </form>
);
