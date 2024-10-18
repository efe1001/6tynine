import React from "react";

function RatesInfo({ formData, setFormData}) {
  return (
    <div>
      <div className="register-fields">
        <label>Short Time  *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, shorttime: event.target.value })
          }
        >
          <option selected="selected" value="N20,000">
            N20,000
          </option>
          <option value="N35,000">N35,000</option>
          <option value="N40,000">N40,000</option>
          <option value="N50,000">N50,000</option>
          <option value="N70,000">N70,000</option>
          <option value="N100,000">N100,000</option>
          <option value="N150,000">N150,000</option>
          <option value="N200,000">N200,000</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Over Night  *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, overnight: event.target.value })
          }
        >
          <option selected="selected" value="N40,000">
            N40,000
          </option>
          <option value="N50,000">N50,000</option>
          <option value="N70,000">N70,000</option>
          <option value="N100,000">N100,000</option>
          <option value="N150,000">N150,000</option>
          <option value="N200,000">N200,000</option>
          <option value="N300,000">N300,000</option>
          <option value="N500,000">N500,000</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Weekend (3 Days) *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, weekend_rate: event.target.value })
          }
        >
          <option selected="selected" value="N50,000">
            N50,000
          </option>
          <option value="N100,000">N100,000</option>
          <option value="N200,000">N200,000</option>
          <option value="N300,000">N300,000</option>
          <option value="N500,000">N500,000</option>
          <option value="N1,000,000">N1,000,000</option>
        </select>
      </div>
    </div>
  );
}

export default RatesInfo;
