import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import PostJobPage from "./pages/admin/PostJobPage";
import JobApplications from "./pages/admin/JobApplications";
import MyPostedJobs from "./pages/admin/MyPostedJobs";
import UpdateStatus from "./pages/admin/UpdateStatus";
import EmployeeDashboardLayout from "./layouts/EmployeeDashboardLayout";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import BrowseJobs from "./pages/employee/BrowseJobs";
import JobDetails from "./pages/employee/JobDetails";
import ApplyJob from "./pages/employee/ApplyJob";
import AppliedJobs from "./pages/employee/AppliedJobs";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminDashboardLayout>
            <AdminDashboard />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/dashboard" element={
          <AdminDashboardLayout>
            <AdminDashboard />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/profile" element={
          <AdminDashboardLayout>
            <AdminProfile />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/update-profile" element={
          <AdminDashboardLayout>
            <AdminProfile />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/post-job" element={
          <AdminDashboardLayout>
            <PostJobPage />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/my-jobs" element={
          <AdminDashboardLayout>
            <MyPostedJobs />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/applications" element={
          <AdminDashboardLayout>
            <JobApplications />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/update-status" element={
          <AdminDashboardLayout>
            <UpdateStatus />
          </AdminDashboardLayout>
        } />

        {/* Employee Routes */}
        <Route path="/employee/profile" element={
          <EmployeeDashboardLayout>
            <EmployeeProfile />
          </EmployeeDashboardLayout>
        } />
        <Route path="/employee/update-profile" element={
          <EmployeeDashboardLayout>
            <EmployeeProfile />
          </EmployeeDashboardLayout>
        } />
        <Route path="/employee/jobs" element={
          <EmployeeDashboardLayout>
            <BrowseJobs />
          </EmployeeDashboardLayout>
        } />
        <Route path="/employee/job-details" element={
          <EmployeeDashboardLayout>
            <JobDetails />
          </EmployeeDashboardLayout>
        } />
        <Route path="/employee/job-details/:id" element={
          <EmployeeDashboardLayout>
            <JobDetails />
          </EmployeeDashboardLayout>
        } />
        <Route path="/employee/apply" element={
          <EmployeeDashboardLayout>
            <ApplyJob />
          </EmployeeDashboardLayout>
        } />
        <Route path="/employee/apply/:id" element={
          <EmployeeDashboardLayout>
            <ApplyJob />
          </EmployeeDashboardLayout>
        } />
        <Route path="/employee/applied-jobs" element={
          <EmployeeDashboardLayout>
            <AppliedJobs />
          </EmployeeDashboardLayout>
        } />
      </Routes>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </Router>
  )
}
export default App;