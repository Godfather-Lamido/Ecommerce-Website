import './Spinner.css';

export default function Spinner({ size = 18, label = 'Loading...' }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite" aria-label={label}>
      <span className="spinner" style={{ width: size, height: size }} />
    </div>
  );
}
