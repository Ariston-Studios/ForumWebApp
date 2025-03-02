import { useState } from "react";

interface SetUsernameModalProps {
    user: { email: string; name: string };
    onClose: () => void;
}

const SetUsernameModal = ({ user, onClose }: SetUsernameModalProps) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!username) {
            setError("Username is required.");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/set-username`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email, username, name: user.name }),
                credentials: "include",
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
            } else {
                onClose();
            }
        } catch (err) {
            console.error("Error setting username:", err);
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Set Your Username</h2>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SetUsernameModal;
