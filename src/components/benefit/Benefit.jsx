import "./Benefit.css";

export function Benefit({ icon, title, description }) {
  return (
    <div className="benefit">
      {icon}

      <div className="benefit-text">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}