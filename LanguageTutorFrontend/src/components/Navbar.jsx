import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom">
      <div className="container py-2">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/dashboard">
          <span className="brand-mark" aria-hidden="true">L</span>
          LanguageTutor
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <div className="navbar-nav ms-auto gap-md-2">
            <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>
            <NavLink className={linkClass} to="/tutors/add">Add Tutor</NavLink>
            <NavLink className={linkClass} to="/tutors">View Tutors</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
