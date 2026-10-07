import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageOne from "./pages/HomePageOne";
import DailySiteReportsPage from "./pages/DailySiteReports";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UsersListPage from "./pages/UsersListPage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path="/" element={<HomePageOne />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route
          exact
          path="/daily-site-reports"
          element={<DailySiteReportsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
