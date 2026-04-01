export default function Footer() {
  return (
    <footer className="mb-32 border-t border-border bg-background px-4 py-8 lg:mb-36">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center md:px-6">
        <a
          href="https://abhijeethere.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface/80 px-4 py-3 text-sm text-textSecondary transition-colors duration-300 hover:border-primary/40 hover:text-textPrimary"
        >
          <img
            src="https://cdn.displate.com/artwork/270x380/2021-05-18/4228f287d5f02898cdca54134b02df4e_baec7ebe2fa8df8e03d9d6b3b3310344.jpg"
            alt="Abhijeet"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span>
            Made by <span className="font-semibold text-textPrimary group-hover:text-primary">Abhijeet</span>
          </span>
        </a>
      </div>
    </footer>
  );
}