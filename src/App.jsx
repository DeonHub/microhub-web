import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Dashboard from './Admin/Dashboard';
import Settings from './Admin/Settings';
import ViewLogs from './Admin/ViewLogs';
// import CreateFaq from './Admin/CreateFaqx';
import ViewLoans from './Admin/ViewLoans';
import ViewTransactions from './Admin/ViewTransactions';
import ViewCategories from './Admin/ViewCategories';
import ViewSubcategories from './Admin/ViewSubcategories';
import ViewOfficers from './Admin/ViewOfficers';
import ViewClients from './Admin/ViewClients';
import ViewRoles from './Admin/ViewRoles';
import ViewPermissions from './Admin/ViewPermissions';
import ViewAdmins from './Admin/ViewAdmins';
import ViewTickets from './Admin/ViewTickets';
import ViewCountries from './Admin/ViewCountries';
import ViewProfile from './Admin/ViewProfile';
import CreateRole from './Admin/CreateRole';
import EditRole from './Admin/EditRole';
import ViewReports from './Admin/ViewReports';
import ViewAccounts from './Admin/ViewAccounts';
import Signup from './Auth/Signup';
import OfficerDashboard from './Officer/OfficerDashboard';
import OfficerClients from './Officer/OfficerClients';
import OfficerAccounts from './Officer/OfficerAccounts';
import OfficerLoans from './Officer/OfficerLoans';
import OfficerTransactions from './Officer/OfficerTransactions';
import OfficerReports from './Officer/OfficerReports';
import OfficerTickets from './Officer/OfficerTickets';
import OfficerProfile from './Officer/OfficerProfile';
import OfficerPasswordReset from './Officer/OfficerPasswordReset';
import PasswordReset from './Admin/PasswordReset';

const App = () => {

  return (
    <Router>
      <Routes>

        <Route path={`/`} element={<Login />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/signup`} element={<Signup />} />
        <Route path={`/admin/dashboard`} element={<Dashboard />} />
        <Route path={`/admin/settings`} element={<Settings />} />

        {/* Admin */}
        <Route path={`/admin/logs`} element={<ViewLogs />} />
        <Route path={`/admin/loans`} element={<ViewLoans />} />
        <Route path={`/admin/transactions`} element={<ViewTransactions />} />
        <Route path={`/admin/reports`} element={<ViewReports />} />
        <Route path={`/admin/officers`} element={<ViewOfficers />} />
        <Route path={`/admin/clients`} element={<ViewClients />} />
        <Route path={`/admin/accounts`} element={<ViewAccounts />} />
        <Route path={`/admin/tickets`} element={<ViewTickets />} />
        <Route path={`/admin/profile`} element={<ViewProfile />} />
        <Route path={'/admin/password-reset'} element={<PasswordReset/>} />


        {/* Officer */}
        <Route path={`/officer/dashboard`} element={<OfficerDashboard />} />
        <Route path={`/officer/clients`} element={<OfficerClients />} />
        <Route path={`/officer/accounts`} element={<OfficerAccounts />} />
        <Route path={`/officer/loans`} element={<OfficerLoans />} />
        <Route path={`/officer/transactions`} element={<OfficerTransactions />} />
        <Route path={`/officer/reports`} element={<OfficerReports />} />
        <Route path={`/officer/tickets`} element={<OfficerTickets />} />
        <Route path={`/officer/profile`} element={<OfficerProfile />} />
        <Route path={'/officer/password-reset'} element={<OfficerPasswordReset/>} />


        {/* <Route path={`/admin/logs`} element={<ViewLogs />} />
        <Route path={`/admin/reports`} element={<ViewReports />} />
        <Route path={`/admin/officers`} element={<ViewOfficers />} />
        <Route path={`/admin/accounts`} element={<ViewAccounts />} />
        <Route path={`/admin/tickets`} element={<ViewTickets />} />
        <Route path={`/admin/profile`} element={<ViewProfile />} /> */}





      </Routes>
    </Router>
  );
};

export default App;