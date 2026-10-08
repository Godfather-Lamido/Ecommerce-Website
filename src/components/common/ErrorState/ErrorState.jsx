import './ErrorState.css';

export default function ErrorState({ title = 'Something went wrong', message }) {
  return (
    <div className="error-state card">
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  );
}
