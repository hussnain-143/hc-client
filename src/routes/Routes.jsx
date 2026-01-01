import { Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import OrganizationManagement from '../pages/OrganizationManagement'
import SendingReferrals from '../pages/SendingReferrals'
import ManagingIncomingReferrals from '../pages/ManagingIncomingReferrals'
import CoverageAreaView from '../pages/CoverageAreaView'

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organizations/:id?" element={<OrganizationManagement />} />
        <Route path="/send-referrals/:to?" element={<SendingReferrals />} />
        <Route path="/incoming-referrals" element={<ManagingIncomingReferrals />} />
        <Route path="/coverage-areas" element={<CoverageAreaView />} />
      </Route>
    </Routes>
  )
}

export default RoutesConfig