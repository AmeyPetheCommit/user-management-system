import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const [editId, setEditId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const getUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/admin/users",
                { headers }
            );

            setUsers(response.data);

        } catch (error) {

            setError("Unable to load users");

        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            await axios.post(
                "http://localhost:8080/api/admin/users",
                {
                    name,
                    email,
                    password,
                    role
                },
                { headers }
            );

            setMessage("User created successfully");

            clearForm();
            getUsers();

        } catch (error) {

            setError(
                error.response?.data?.error ||
                "Unable to create user"
            );

        }
    };

    const startEdit = (user) => {

        setEditId(user.id);
        setName(user.name);
        setEmail(user.email);
        setPassword("");
        setRole(user.roles[0]?.name || "USER");

        setMessage("");
        setError("");
    };

    const updateUser = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            await axios.put(
                `http://localhost:8080/api/admin/users/${editId}`,
                {
                    name,
                    email,
                    password,
                    role
                },
                { headers }
            );

            setMessage("User updated successfully");

            clearForm();
            getUsers();

        } catch (error) {

            setError(
                error.response?.data?.error ||
                "Unable to update user"
            );

        }
    };

    const changeRole = async (id, newRole) => {

        try {

            await axios.put(
                `http://localhost:8080/api/admin/users/${id}/role?role=${newRole}`,
                {},
                { headers }
            );

            setMessage("Role updated successfully");

            getUsers();

        } catch (error) {

            setError(
                error.response?.data?.error ||
                "Unable to update role"
            );

        }
    };

    const deleteUser = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/api/admin/users/${id}`,
                { headers }
            );

            setMessage("User deleted successfully");

            getUsers();

        } catch (error) {

            setError(
                error.response?.data?.error ||
                "Unable to delete user"
            );

        }
    };

    const clearForm = () => {

        setEditId(null);
        setName("");
        setEmail("");
        setPassword("");
        setRole("USER");

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

    };

    return (

        <div className="dashboard">

            {/* Header */}

            <div className="header">

                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Manage users and roles</p>
                </div>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

            {/* Create / Edit */}

            <div className="card">

                <h2>
                    {editId ? "Edit User" : "Create New User"}
                </h2>

                <form
                    onSubmit={
                        editId
                            ? updateUser
                            : createUser
                    }
                >

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter email"
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
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Role</label>

                            <select
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value)
                                }
                            >
                                <option value="USER">
                                    USER
                                </option>

                                <option value="MANAGER">
                                    MANAGER
                                </option>

                                <option value="ADMIN">
                                    ADMIN
                                </option>

                            </select>

                        </div>

                    </div>

                    <button type="submit">

                        {editId
                            ? "Update User"
                            : "Create User"}

                    </button>

                    {editId && (

                        <button
                            type="button"
                            onClick={clearForm}
                            style={{
                                marginLeft: "10px",
                                background: "#6b7280"
                            }}
                        >
                            Cancel
                        </button>

                    )}

                </form>

                {message && (
                    <p className="success">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

            </div>

            {/* Users */}

            <div className="card">

                <h2>All Users</h2>

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    <select
                                        value={
                                            user.roles[0]?.name ||
                                            "USER"
                                        }
                                        onChange={(e) =>
                                            changeRole(
                                                user.id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="USER">
                                            USER
                                        </option>

                                        <option value="MANAGER">
                                            MANAGER
                                        </option>

                                        <option value="ADMIN">
                                            ADMIN
                                        </option>

                                    </select>

                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            startEdit(user)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteUser(user.id)
                                        }
                                        style={{
                                            marginLeft: "8px",
                                            background: "#dc2626"
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default AdminDashboard;