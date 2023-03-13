import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
    const [tokenId, setTokenId] = useState(null);
  

    const userLoggedIn=!!tokenId;

    const loginUserHandler = (responseToken) => {
        setTokenId(responseToken);
       
        console.log(responseToken);
    };

    const logoutUserHandler = () => {
        setTokenId(null);
    }

    const authContext = {
        tokens: tokenId,
        isLoggenIn: userLoggedIn,
        login: loginUserHandler,
        logout: logoutUserHandler
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;