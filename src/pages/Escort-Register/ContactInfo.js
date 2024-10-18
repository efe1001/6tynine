import React from "react";

function ContactInfo({ formData, setFormData, setImageUpload }) {
  return (
    <div>
      <div className="register-fields">
        <label> Location *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, state: event.target.value })
          }
        >
          <option selected="selected" value="null">
            Select Location
          </option>

          <option value="Dubai">Dubai</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Turkey">Turkey</option>
          <option value="Cote d'Ivoire">Cote d'Ivoire</option>
          <option value="Ghana">Ghana</option>
          <option value="Usa">Usa</option>
          <option value="Cryus">Cyrus</option>
          <option value="Abia">Abia</option>
          <option value="Abuja">Abuja</option>
          <option value="Adamawa">Adamawa</option>
          <option value="Akwa Ibom">Akwa Ibom</option>
          <option value="Anambra">Anambra</option>
          <option value="Bauchi">Bauchi</option>
          <option value="Bayelsa">Bayelsa</option>
          <option value="Benue">Benue</option>
          <option value="Borno">Borno</option>
          <option value="Cross River">Cross River</option>
          <option value="Delta">Delta</option>
          <option value="Ebonyi">Ebonyi</option>
          <option value="Edo">Edo</option>
          <option value="Ekiti">Ekiti</option>
          <option value="Enugu">Enugu</option>
          <option value="Gombe">Gombe</option>
          <option value="Imo">Imo</option>
          <option value="Jigawa">Jigawa</option>
          <option value="Kaduna">Kaduna</option>
          <option value="Kebbi">Kebbi</option>
          <option value="Kogi">Kogi</option>
          <option value="Kwara">Kwara</option>
          <option value="Lagos">Lagos</option>
          <option value="Nasarawa">Nasarawa</option>
          <option value="Niger">Niger</option>
          <option value="Ogun">Ogun</option>
          <option value="Ondo">Ondo</option>
          <option value="Osun">Osun</option>
          <option value="Oyo">Oyo</option>
          <option value="Plateau">Plateau</option>
          <option value="Rivers">Rivers</option>
          <option value="Sokoto">Sokoto</option>
          <option value="Taraba">Taraba</option>
          <option value="Yobe">Yobe</option>
          <option value="Zamfara">Zamfara</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Phone Number 1 *</label>
        <input
          type="text"
          placeholder="Enter here ..."
          value={formData.phone_number_1}
          onChange={(event) =>
            setFormData({ ...formData, phone_number_1: event.target.value })
          }
        />
      </div>

      <div className="register-fields">
        <label>Phone Number 2</label>
        <input
          type="text"
          placeholder="Enter here ..."
          value={formData.phone_number_2}
          onChange={(event) =>
            setFormData({ ...formData, phone_number_2: event.target.value })
          }
        />
      </div>

      <div className="register-fields">
        <label>WhatsApp Number *</label>
        <input
          type="text"
          placeholder="Enter here ..."
          value={formData.whatsapp_number}
          onChange={(event) =>
            setFormData({ ...formData, whatsapp_number: event.target.value })
          }
        />
      </div>
    </div>
  );
}

export default ContactInfo;
