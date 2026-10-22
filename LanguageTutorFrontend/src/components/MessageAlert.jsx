function MessageAlert({ type = 'info', message, onDismiss }) {
  if (!message) return null

  const role = type === 'danger' ? 'alert' : 'status'

  return (
    <div className={`alert alert-${type} d-flex align-items-center justify-content-between gap-3`} role={role}>
      <span>{message}</span>
      {onDismiss && (
        <button
          className="btn-close"
          type="button"
          aria-label="Dismiss message"
          onClick={onDismiss}
        />
      )}
    </div>
  )
}

export default MessageAlert
