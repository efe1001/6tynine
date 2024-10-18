import React from "react";

function EscortInfo({ formData, setFormData }) {
  return (
    <div>
      <div className="register-fields">
        <label>Bio (Short info about yourself)</label>
        <textarea
          style={{ width: "100%", height: "100px" }}
          value={formData.bio}
          onChange={(event) =>
            setFormData({ ...formData, bio: event.target.value })
          }
        ></textarea>
      </div>

      <h1>Body Detail</h1>

      <div className="register-fields">
        <label>Ethnicity *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, ethnicity: event.target.value })
          }
        >
          <option selected="selected" value="Black">
            Black
          </option>
          <option value="Indian">Indian</option>
          <option value="Latino">Latino</option>
          <option value="Mix-race">Mix-Race</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Height *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, height: event.target.value })
          }
        >
          <option selected="selected" value="Average">
            Average
          </option>
          <option value="Portable">Portable</option>
          <option value="Tall">Tall</option>
          <option value="Very Tall">Very Tall</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Weight *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, weight: event.target.value })
          }
        >
          <option selected="selected" value="Average">
            Average
          </option>
          <option value="Light">Light</option>
          <option value="Thick">Thick</option>
          <option value="BBW">BBW</option>
          <option value="Heavy">Heavy</option>
          <option value="Heavy Duty">Heavy Duty</option>
          <option value="SSBBW">SSBBW</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Bust Size *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, bustsize: event.target.value })
          }
        >
          <option selected="selected" value="Average">
            Average
          </option>
          <option value="Small">Small</option>
          <option value="Big">Big</option>
          <option value="Very Big">Very Big</option>
          <option value="Enormous">Enormous</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Looks *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, looks: event.target.value })
          }
        >
          <option selected="selected" value="Stripper">
            Stripper
          </option>
          <option value="Average">Average</option>
          <option value="Cooperate Type">Cooperate Type</option>
          <option value="Dominatrix">Dominatrix</option>
          <option value="Eye Candy">Eye Candy</option>
          <option value="Goddess">Goddess</option>
          <option value="Naugty Teacher">Naugty Teacher</option>
          <option value="Porn Star">Pornstar</option>
          <option value="Pretty boy with red lips">
            Pretty boy with red lips
          </option>
          <option value="Sexy">Sexy</option>
          <option value="Sexy Tranny">Sexy tranny</option>
          <option value="Slutty Nurse">Slutty Nurse</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Smoker / Drinker / Drugs*</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, smoker: event.target.value })
          }
        >
          <option selected="selected" value="I don't Drink, Smoke or use Drugs">
            I don't Drink, Smoke or use Drugs
          </option>
          <option value="Only Smoke">Only Smoke</option>
          <option value="Only Drink">Only Drink</option>
          <option value="Only Drugs">Only Drugs</option>
          <option value="Smoke AND Drink - NO DRUGS">
            Smoke AND Drink - NO DRUGS
          </option>
          <option value="Smoke, Drink and Drugs">Smoke, Drink and Drugs</option>
        </select>
      </div>

      <div className="register-fields">
        <label>Sexual Orientation *</label>
        <select
          onChange={(event) =>
            setFormData({ ...formData, sexualorientation: event.target.value })
          }
        >
          <option selected="selected" value="HetroSexual(Straight)">HetroSexual(Straight)</option>
          <option value="Master (Domination)">
            Master (Domination)
          </option>
          <option value="Mistress (Domination)">Mistress (Domination)</option>
          <option value="Transexual">Transexual</option>
          <option value="Gay">Gay</option>
          <option value="Lesbian">Lesbian</option>
          <option value="BiSexual">BiSexual</option>
        </select>
      </div>

      <div className="info">
        <p>
          <b>BIO</b> Tell us in details what you are about
          <br />
          Your Pesonality
          <br />
          Your skills
          <br />
          And what the client should expect
          <br />A one line (eg : here for fun, here for hook up.) makes you look
          lazy and unintelligent
        </p>
        <br />
        <p>
          Please make out time to write a good bio, clients will judge you by
          what you have in your bio.
        </p>{" "}
      </div>
    </div>
  );
}

export default EscortInfo;
