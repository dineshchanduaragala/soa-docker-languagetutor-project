function ConfirmDelete({ tutor, onConfirm, onCancel, loading = false }) {
  if (!tutor) return null

  return (
    <div
      className="delete-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onCancel()
      }}
    >
      <section
        className="delete-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <p className="eyebrow mb-2">Please confirm</p>
        <h2 className="h4 mb-2" id="delete-dialog-title">Remove this tutor?</h2>
        <p className="text-secondary mb-4" id="delete-dialog-description">
          {tutor.tutorName} will be permanently removed from your tutor list.
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-light" type="button" onClick={onCancel} disabled={loading}>
            Keep tutor
          </button>
          <button className="btn btn-danger" type="button" onClick={onConfirm} disabled={loading}>
            {loading ? 'Removing…' : 'Remove tutor'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmDelete
