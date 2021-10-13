import React from "react";

const LoginForm = ({
  handleSubmit,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <button disabled={!email || !password} className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
