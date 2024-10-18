import React from "react";

function PreferenceInfo({ formData, setFormData }) {
  return (
    <div>
      <div className="register-fields">
        <label>OWO (Oral without Condom) *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, owo: event.target.value })
          }
        >
          <option value="Yes">Yes</option>
          <option selected="selected" value="No">
            No
          </option>
        </select>
      </div>

      <div className="register-fields">
        <label>O-Level (Oral sex) *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, oral: event.target.value })
          }
        >
          <option value="Yes">Yes</option>
          <option selected="selected" value="No">
            No
          </option>
        </select>
      </div>

      <div className="register-fields">
        <label>CIM (Come in mouth) *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, cim: event.target.value })
          }
        >
          <option value="Yes">Yes</option>
          <option selected="selected" value="No">
            No
          </option>
        </select>
      </div>

      <div className="register-fields">
        <label>COF (Come on Face) *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, cof: event.target.value })
          }
        >
          <option value="Yes">Yes</option>
          <option selected="selected" value="No">
            No
          </option>
        </select>
      </div>

      

      <div className="register-fields">
        <label>69 (69 sex position) *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, sixtynine: event.target.value })
          }
        >
          <option value="Yes">Yes</option>
          <option selected="selected" value="No">
            No
          </option>
        </select>
      </div>

      <div className="register-fields">
        <label>Threesome *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, threesome: event.target.value })
          }
        >
          <option value="Yes">Yes</option>
          <option selected="selected" value="No">
            No
          </option>
        </select>
      </div>

      <div className="register-fields">
        <label>Extraball (Having sex multiple times) *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, extraball: event.target.value })
          }
        >
          <option value="Yes">Yes</option>
          <option selected="selected" value="No">
            No
          </option>
        </select>
      </div>
    </div>
  );
}

export default PreferenceInfo;

