import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageOne from "./pages/HomePageOne";
import DailySiteReportsPage from "./pages/DailySiteReports";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UsersListPage from "./pages/UsersListPage";
import AddUserPage from "./pages/AddUserPage";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <RouteScrollToTop />
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePageOne />} />
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/add-user" element={<AddUserPage />} />
              <Route path="/users/new" element={<AddUserPage />} />
              <Route path="/users/:userId/edit" element={<AddUserPage />} />
              <Route
                path="/daily-site-reports"
                element={<DailySiteReportsPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
