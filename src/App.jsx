import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageOne from "./pages/HomePageOne";
import DailySiteReportsPage from "./pages/DailySiteReports";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path="/" element={<HomePageOne />} />
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
