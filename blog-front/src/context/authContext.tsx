import { useEffect, createContext, useState, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    dataSession: { token: string | null; user: any };
    isReady: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [dataSession, setDataSession] = useState<{ token: string | null; user: any }>({
        token: null,
        user: null,
    });
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            const decoded = decodeToken(savedToken);
            setDataSession({ token: savedToken, user: decoded });
        }
        setIsReady(true);
    }, []);

    const login = (token: string) => {
        const decoded = decodeToken(token);
        setDataSession({ token, user: decoded });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setDataSession({ token: null, user: null });
        localStorage.removeItem('token');
    };


    return (
        <AuthContext.Provider value={{ dataSession, login, logout, isReady }}>
            {children}
        </AuthContext.Provider>
    );
};


const decodeToken = (token: string) => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};