import { useState } from "react";
import "./form.css";

function Form() {
    const initialState = {
        name: "",
        lname: "",
        gender: "",
        dob: "",
        skills: {
            "C++": false,
            "Python": false
        },
        address: "",
        state: "Orissa"
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                skills: {
                    ...formData.skills,
                    [name]: checked
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const calculateAge = (dob) => {
        if (!dob) return "N/A";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const age = calculateAge(formData.dob);
        const skillList = Object.keys(formData.skills)
            .filter(skill => formData.skills[skill])
            .join(", ");

        const alertInfo = `
            Name: ${formData.name} ${formData.lname}
            Gender: ${formData.gender}
            Date of Birth: ${formData.dob}
            Age: ${age}
            Skills: ${skillList || "None"}
            Address: ${formData.address}
            State: ${formData.state}
        `;
        alert(alertInfo);
    };

    const handleReset = () => {
        setFormData(initialState);
    };

    return (
        <div className="form">
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">Name:</label>
                <input
                    type="text"
                    id="fname"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="lname">Last Name:</label>
                <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                />

                <label>Gender:</label>
                <div className="radio-group">
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        
                    />
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="female">Female</label>
                </div>

                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="datetime-local"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    max={new Date().toISOString().slice(0, 16)} 
                    required
                />

                <label>Skills:</label>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="cpp"
                        name="C++"
                        checked={formData.skills["C++"]}
                        onChange={handleChange}
                    />
                    <label htmlFor="cpp">C++</label>
                    <input
                        type="checkbox"
                        id="python"
                        name="Python"
                        checked={formData.skills["Python"]}
                        onChange={handleChange}
                    />
                    <label htmlFor="python">Python</label>
                </div>

                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                ></textarea>

                <label htmlFor="state">State:</label>
                <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                >
                    <option value="Punjab">Punjab</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Orissa">Orissa</option>
                </select>

                <div className="button-group">
                    <button type="submit">Submit</button>
                    <button type="reset" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
