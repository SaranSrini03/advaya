export default function Event() {
    return (
      <div
        id="event"
        className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[color:var(--page-bg-from)] via-[color:var(--page-bg-via)] to-[color:var(--page-bg-to)] text-[color:var(--foreground)]"
      >
        <h1 className="text-5xl font-bold mb-4">Upcoming Event</h1>
        <p className="text-lg text-center max-w-2xl mb-8">
          Join us for an exciting event filled with learning, networking, and fun! Stay tuned for more details.
        </p>
        <button 
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 transition rounded-lg text-lg font-semibold"
          onClick={() => alert('Event details coming soon!')}
        >
          Learn More
        </button>
      </div>
    );
  }
  