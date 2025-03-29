import React, { useState } from "react";
import BorderlessInput from "./BorderlessInput";
import Greeting from "./Greeting";

interface SetUsernameModalProps {
    user: { email: string; name: string };
    onClose: () => void;
}



const SetUsernameModal: React.FC<SetUsernameModalProps> = ({ user, onClose }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const firstName = user.name.split(" ")[0];

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
        <div className="z-20 fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <Greeting name={firstName} />
                <BorderlessInput
                    type="text"
                    label="Set Username"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
                {error && <p className="text-red-400 mt-2">{error}</p>}
                <div className="flex justify-end mt-4">
                    <button onClick={handleSubmit} className="px-4 py-2 outline-2 w-full outline-green-400 text-green-400 text-raised font-[600] subpixel-antialiased rounded hover:cursor-pointer hover:text-white hover:bg-green-400 transition-all delay-100">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SetUsernameModal;
