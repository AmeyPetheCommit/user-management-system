import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {

    const [profile, setProfile] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const getProfile = async () => {
        try {
            const response = await axios.get(
                "https://user-management-system-uh3s.onrender.com/api/user/profile",
                { headers }
            );

            setProfile(response.data);

        } catch (error) {
            setError("Unable to load profile");
        }
    };

    const getTasks = async () => {
        try {
            const response = await axios.get(
                "https://user-management-system-uh3s.onrender.com/api/user/tasks",
                { headers }
            );

            setTasks(response.data);

        } catch (error) {
            setError("Unable to load tasks");
        }
    };

    useEffect(() => {
        getProfile();
        getTasks();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    const activeTasks = tasks.filter(
        (task) =>
            task.status === "PENDING" ||
            task.status === "IN_PROGRESS"
    );

    const completedTasks = tasks.filter(
        (task) => task.status === "COMPLETED"
    );

    return (

        <div className="dashboard">

            {/* Header */}

            <div className="header">

                <div>
                    <h1>User Dashboard</h1>
                    <p>View your profile and assigned tasks</p>
                </div>

                <button
                    onClick={logout}
                    style={{ background: "#ef4444" }}
                >
                    Logout
                </button>

            </div>

            {error && (
                <div className="card">
                    <p className="error">{error}</p>
                </div>
            )}

            {/* Profile */}

            <div className="card">

                <h2>My Profile</h2>

                {profile && (

                    <div className="profile-grid">

                        <div className="profile-item">
                            <span>ID</span>
                            <strong>{profile.id}</strong>
                        </div>

                        <div className="profile-item">
                            <span>Name</span>
                            <strong>{profile.name}</strong>
                        </div>

                        <div className="profile-item">
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>

                        <div className="profile-item">
                            <span>Role</span>
                            <strong>
                                {profile.roles
                                    .map((role) => role.name)
                                    .join(", ")}
                            </strong>
                        </div>

                    </div>

                )}

            </div>

            {/* Active Tasks */}

            <div className="card">

                <div className="section-title">

                    <div>
                        <h2>Active Tasks</h2>
                        <p>
                            Pending and in-progress tasks
                        </p>
                    </div>

                    <div className="task-count">
                        {activeTasks.length} Tasks
                    </div>

                </div>

                {activeTasks.length === 0 ? (

                    <div className="empty-state">
                        <h3>No active tasks</h3>
                        <p>
                            You don't have any pending or
                            in-progress tasks.
                        </p>
                    </div>

                ) : (

                    <div className="task-list">

                        {activeTasks.map((task) => (

                            <div
                                className="task-card"
                                key={task.id}
                            >

                                <div className="task-header">

                                    <h3>
                                        {task.title}
                                    </h3>

                                    <span
                                        className={`status ${task.status
                                            .toLowerCase()
                                            .replace("_", "-")}`}
                                    >
                                        {task.status === "IN_PROGRESS"
                                            ? "IN PROGRESS"
                                            : task.status}
                                    </span>

                                </div>

                                <p>
                                    {task.description}
                                </p>

                                <small>
                                    Task ID: #{task.id}
                                </small>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* Completed Tasks */}

            <div className="card">

                <div className="section-title">

                    <div>
                        <h2>Completed Tasks</h2>
                        <p>
                            Tasks that have been completed
                        </p>
                    </div>

                    <div className="task-count completed-count">
                        {completedTasks.length} Tasks
                    </div>

                </div>

                {completedTasks.length === 0 ? (

                    <div className="empty-state">
                        <h3>No completed tasks</h3>
                        <p>
                            You haven't completed any tasks yet.
                        </p>
                    </div>

                ) : (

                    <div className="task-list">

                        {completedTasks.map((task) => (

                            <div
                                className="task-card completed-task"
                                key={task.id}
                            >

                                <div className="task-header">

                                    <h3>
                                        {task.title}
                                    </h3>

                                    <span className="status completed">
                                        COMPLETED
                                    </span>

                                </div>

                                <p>
                                    {task.description}
                                </p>

                                <small>
                                    Task ID: #{task.id}
                                </small>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default UserDashboard;