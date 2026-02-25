import React, { useState } from 'react';
import './form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateEmail = (email) => {
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9.-]+\.(com|in|[a-zA-Z]{2,})$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
       
        const startsWithCapital = /^[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const minLength = password.length >= 5;

        let passErrors = [];
        if (!startsWithCapital) passErrors.push("Must start with a capital letter.");
        if (!hasNumber) passErrors.push("Must have at least one number.");
        if (!hasSpecialChar) passErrors.push("Must have at least one special character.");
        if (!minLength) passErrors.push("Must be at least 5 characters long.");

        return {
            isValid: startsWithCapital && hasNumber && hasSpecialChar && minLength,
            errors: passErrors
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = { email: '', password: '' };
        let isValid = true;

        if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid email format. Must contain @ and a valid domain (.com, .in, etc.)";
            isValid = false;
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.errors.join(' ');
            isValid = false;
        }

        if (isValid) {
            alert(`Login Successful!\nEmail: ${formData.email}\nPassword: ${formData.password}`);
        } else {
            setErrors(newErrors);
        }
    };

    const handleReset = () => {
        setFormData({ email: '', password: '' });
        setErrors({ email: '', password: '' });
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="button-group">
                        <button type="submit" className="submit-btn" disabled={!formData.email || !formData.password}>
                            Submit
                        </button>
                        <button type="button" className="reset-btn" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
