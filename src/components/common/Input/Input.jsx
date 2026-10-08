import './Input.css';

export default function Input({ label, type = 'text', id, ...props }) {
  return (
    <label className="field" htmlFor={id}>
      {label && <span>{label}</span>}
      <input id={id} type={type} className="input-field" {...props} />
    </label>
  );
}
