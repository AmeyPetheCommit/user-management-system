import { useEffect, useState } from "react";
import axios from "axios";

function ManagerDashboard() {

    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("PENDING");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const getUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/manager/users",
                { headers }
            );

            setUsers(response.data);

        } catch (error) {
            setError("Unable to load users");
        }
    };

    const getTasks = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/manager/tasks",
                { headers }
            );

            setTasks(response.data);

        } catch (error) {
            setError("Unable to load tasks");
        }
    };

    useEffect(() => {
        getUsers();
        getTasks();
    }, []);

    const assignTask = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            await axios.post(
                `http://localhost:8080/api/manager/tasks?userId=${userId}`,
                {
                    title,
                    description,
                    status
                },
                { headers }
            );

            setMessage("Task assigned successfully");

            setUserId("");
            setTitle("");
            setDescription("");
            setStatus("PENDING");

            getTasks();

        } catch (error) {

            setError(
                error.response?.data?.error ||
                "Unable to assign task"
            );
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {

    setMessage("");
    setError("");

    try {

        await axios.put(
            `http://localhost:8080/api/manager/tasks/${taskId}/status?status=${newStatus}`,
            {},
            { headers }
        );

        setMessage("Task status updated successfully");

        getTasks();

    } catch (error) {

        setError(
            error.response?.data?.error ||
            "Unable to update task status"
        );
    }
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
                    <h1>Manager Dashboard</h1>
                    <p>Manage users and assign tasks</p>
                </div>

                <button
                    onClick={logout}
                    style={{ background: "#ef4444" }}
                >
                    Logout
                </button>

            </div>

            {/* Assign Task */}

            <div className="card">

                <h2>Assign New Task</h2>

                <form onSubmit={assignTask}>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Assign To</label>

                            <select
                                value={userId}
                                onChange={(e) =>
                                    setUserId(e.target.value)
                                }
                                required
                            >

                                <option value="">
                                    Select User
                                </option>

                                {users.map((user) => (

                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.name} - {user.email}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Task Title</label>

                            <input
                                type="text"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Status</label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >

                                <option value="PENDING">
                                    PENDING
                                </option>

                                <option value="IN_PROGRESS">
                                    IN PROGRESS
                                </option>

                                <option value="COMPLETED">
                                    COMPLETED
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Description</label>

                            <textarea
                                placeholder="Enter task description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>

                    <button type="submit">
                        Assign Task
                    </button>

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

                <h2>Users</h2>

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>
                                    {user.roles
                                        .map((role) => role.name)
                                        .join(", ")}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Tasks */}

            <div className="card">

                <h2>All Tasks</h2>

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                        </tr>

                    </thead>

                    <tbody>

                        {tasks.map((task) => (

                            <tr key={task.id}>

                                <td>{task.id}</td>

                                <td>{task.title}</td>

                                <td>{task.description}</td>

                                <td>

    <select
        value={task.status}
        onChange={(e) =>
            updateTaskStatus(
                task.id,
                e.target.value
            )
        }
    >

        <option value="PENDING">
            PENDING
        </option>

        <option value="IN_PROGRESS">
            IN PROGRESS
        </option>

        <option value="COMPLETED">
            COMPLETED
        </option>

    </select>

</td>

                                <td>
                                    {task.assignedTo?.name || "N/A"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ManagerDashboard;