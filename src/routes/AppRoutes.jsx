import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import Employee from '../pages/Employee.jsx'
import StubPage from '../pages/StubPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<StubPage title="Home" />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/hiring" element={<StubPage title="Hiring" />} />
        <Route path="/report" element={<StubPage title="Report" />} />
        <Route path="/files" element={<StubPage title="Files" />} />
        <Route path="/payroll" element={<StubPage title="Payroll" />} />
        <Route path="*" element={<Navigate to="/employee" replace />} />
      </Route>
    </Routes>
  )
}

