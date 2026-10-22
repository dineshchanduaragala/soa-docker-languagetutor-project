import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import AddTutor from './pages/AddTutor.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EditTutor from './pages/EditTutor.jsx'
import NotFound from './pages/NotFound.jsx'
import TutorList from './pages/TutorList.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container app-main py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutors/add" element={<AddTutor />} />
          <Route path="/tutors/edit/:id" element={<EditTutor />} />
          <Route path="/tutors" element={<TutorList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">LanguageTutor · Learn together, one lesson at a time.</div>
      </footer>
    </BrowserRouter>
  )
}

export default App
