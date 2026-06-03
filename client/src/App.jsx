import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx"
import Home from "./Pages/Home.jsx"
import AuthRoute from "./Routes/AuthRoute.jsx"
import ProtectedRoute from "./Routes/ProtectedRoute.jsx"

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;