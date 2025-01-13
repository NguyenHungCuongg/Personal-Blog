import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://personal-blog-backend-ad0g.onrender.com/api/check-auth", { withCredentials: true });
        setAuthState({
          isAuthenticated: response.data.isAuthenticated,
          user: response.data.user,
          loading: false,
        });
      } catch (error) {
        console.error("Error checking authentication", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ ...authState, setAuthState }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
