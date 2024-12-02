import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userAccountName, setUserAccountName] = useState(null);

    const login = (token, accountName) => {
        setUserToken(token);
        setUserAccountName(accountName);
    };

    const logout = () => {
        setUserToken(null);
        setUserAccountName(null);
    };

    return (
        // 컴포넌트 트리로 파라미터 제공
        <AuthContext.Provider value={{userToken, userAccountName, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useContent = () => {
    return useContext(AuthContext); // useContext로 AuthContext 값에 접근
}