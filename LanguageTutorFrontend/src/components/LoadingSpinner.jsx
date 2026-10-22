function LoadingSpinner({ label = 'Loading tutors…' }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-3 py-5" role="status">
      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      <span className="text-secondary">{label}</span>
    </div>
  )
}

export default LoadingSpinner
