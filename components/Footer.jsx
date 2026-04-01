export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-7xl text-center text-sm text-textSecondary md:px-6">
        © {new Date().getFullYear()} BlogSphere. Crafted for thoughtful reading.
      </div>
    </footer>
  );
}
