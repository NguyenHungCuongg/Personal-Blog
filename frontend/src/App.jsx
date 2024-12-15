import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import ViewBlog from "./pages/ViewBlog";
import MyCollection from "./pages/MyCollection";
import Navbar from "./components/Navbar";
import CreateBlog from "./pages/CreateBlog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import PuffLoader from "react-spinners/PuffLoader";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8f2eb6",
    },
    secondary: {
      main: "#f1ac43",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.05), 0px 2px 2px 0px rgba(0,0,0,0.04), 0px 1px 5px 0px rgba(0,0,0,0.03)",
          "&:hover": {
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.05), 0px 2px 2px 0px rgba(0,0,0,0.04), 0px 1px 5px 0px rgba(0,0,0,0.03)",
          },
        },
        text: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlined: {
          boxShadow: "none",
          borderWidth: "1.6px", // Increase the border width
          "&:hover": {
            borderWidth: "1.6px", // Maintain the border width on hover
          },
        },
      },
    },
  },
});

function App() {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {loading ? (
            <div className="loader-container">
              <PuffLoader color={"var(--main-color)"} loading={loading} size={150} speedMultiplier={1} />
            </div>
          ) : (
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createblog" element={<CreateBlog />} />
                <Route path="/blog/:postId" element={<ViewBlog />} />
                <Route path="/mycollection" element={<MyCollection />} />
              </Routes>
              <Footer />
            </div>
          )}
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
