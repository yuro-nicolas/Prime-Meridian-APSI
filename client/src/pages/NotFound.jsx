import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <section className="section">
      <div className="shell empty">
        <h2>Page not found</h2>
        <p style={{ marginTop: 8, marginBottom: 24 }}>
          The page you're looking for doesn't exist.
        </p>
        <Button to="/" variant="ghost">Back home</Button>
      </div>
    </section>
  );
}
