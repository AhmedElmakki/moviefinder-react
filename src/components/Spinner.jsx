export default function Spinner() {
  return (
    <div className="spinner" role="status" aria-live="polite" aria-label="Loading">
      <div className="spinner__dot" />
      <div className="spinner__dot" />
      <div className="spinner__dot" />
    </div>
  );
}
