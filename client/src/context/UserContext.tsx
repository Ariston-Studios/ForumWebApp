import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  name: string;
  email_id: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
    const context = useContext(UserContext);

    if(!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}
