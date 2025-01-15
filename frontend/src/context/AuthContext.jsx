import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false, // Kiểm tra xem user đã đăng nhập chưa(mỗi lần refresh trang sẽ kiểm tra lại)
    user: null, // Thông tin user
    loading: true, // Trạng thái loading khi kiểm tra xem user đã đăng nhập chưa
    justLoggedIn: false, // Trạng thái xác định xem user vừa mới đăng nhập hay không
    justLoggedOut: false, // Trạng thái xác định xem user vừa mới đăng xuất hay không
    /*Ở đây, justLoggedIn mỗi lần đăng nhập sẽ set thành true, mỗi lần refresh trang sẽ set lại thành false 
    => ta có thể sử dụng để xử lý các thông báo lúc vừa đăng nhập tốt hơn isAuthenicated
    */
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/check-auth", {
          withCredentials: true,
        });
        /*Cần phải thêm ...prevState để các thuộc tính của AuthState sau ghi đè lên các thuộc tính của AuthState trước
        ,vì một Object không được có 2 thuộc tính cùng tên => thuộc tính trùng tên thứ 2 sẽ ghi đè lên thuộc tính trùng tên thứ 1
        */
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: response.data.isAuthenticated,
          user: response.data.user,
          loading: false,
          justLoggedInL: false,
          justLoggedOut: false,
        }));
        //thông tin của AuthState sau khi kiểm tra xem user đã đăng nhập chưa
      } catch (error) {
        console.error("Error checking authentication", error);
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
          user: null,
          loading: false,
          justLoggedIn: false,
          justLoggedOut: false,
        }));
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
