import React from "react";

export default function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter New Collection"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
