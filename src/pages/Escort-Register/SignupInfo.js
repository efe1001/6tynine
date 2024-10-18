import React from "react";
import {
  FilePicker,
  Spinner,
  Textarea,
  TextInput,
  Select,
  Button,
  DoubleChevronLeftIcon,
  Alert,
} from "evergreen-ui";

function SignupInfo({ formData, setFormData, error, setError }) {
  return (
    <div>
      <div className="register-fields">
        <label>Email ID *</label>
        <input
          type="email"
          placeholder="Enter here ..."
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
      </div>

      <div className="register-fields">
        <label>Password *</label>
        <input
          type="text"
          placeholder="Enter here ..."
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
      </div>

      <div className="register-fields">
        <label>Display Name *</label>
        <input
          type="text"
          placeholder="Enter here ..."
          value={formData.displayname}
          onChange={(event) => {
            setFormData({ ...formData, displayname: event.target.value });
          }}
        />
      </div>

      <div className="register-fields">
        <label>Age *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, age: event.target.value })
          }
        >
          <option value="18" selected>
            18
          </option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Profile Picture Upload *</label>
        <FilePicker
          onChange={(files) => {
            if (!files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
              setError({
                ...error,
                message: "You upoaded a wrong file type, Please Change it",
                valid: false,
              });
            } else if (files[0].size > 5000000) {
              setError({
                ...error,
                message: "Please upload a file less than 5MB",
                valid: false,
              });
            } else {
              setError({
                ...error,
                message: "",
                valid: true,
              });

              setFormData({ ...formData, profile_picture: files[0] });
            }
          }}
        />
      </div>

      <div className="info">
        <p>
          <b>Username </b> is a unique name for admin to identify you. It can be
          anything or whatever you can remember.
        </p>
        <br />
        <p>
          Your <b>display name</b> is the important name everybody will see on
          your profile.
        </p>
        <br />
        <p>
          So, Don't use your <b>real name</b> as a <b>display name</b>.
        </p>
        <br />
        <p>
          Use a fancy name like a nice <b>nickname</b> but one your mum and dad
          don't know about.
        </p>
        <p>
          You can change your <b>display name</b> later through your profile at
          a cost.
        </p>
        <br />
        <h2>
          <b>Age:</b>
        </h2>
        Pick your <b>Age</b>, it Can not be changed once your registration is
        completed.
      </div>
    </div>
  );
}

export default SignupInfo;
