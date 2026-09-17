import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const loginResponse = await axios.post(
                "https://user-management-system-uh3s.onrender.com/api/auth/login",
                {
                    email: email,
                    password: password
                }
            );

            const token = loginResponse.data;

            localStorage.setItem("token", token);

            const profileResponse = await axios.get(
                "https://user-management-system-uh3s.onrender.com/api/user/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const user = profileResponse.data;

            localStorage.setItem("user", JSON.stringify(user));

            const role = user.roles[0].name;

            if (role === "ADMIN") {
                window.location.href = "/admin";
            } 
            else if (role === "MANAGER") {
                window.location.href = "/manager";
            } 
            else {
                window.location.href = "/user";
            }

        } catch (error) {

            console.log(error);
            setError("Invalid email or password");

        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <div className="login-logo">
                    U
                </div>

                <h1>User Management System</h1>

                <p className="login-subtitle">
                    Sign in to continue
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Sign In
                    </button>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                </form>

                <p className="login-footer">
                    Secure Role-Based User Management System
                </p>

            </div>

        </div>
    );
}

export default Login;