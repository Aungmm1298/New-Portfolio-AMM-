export default function Footer() {
  return (
    <footer>
      <div
        className="py-6 px-6 text-center"
        style={{ borderTop: '1px solid #1e293b' }}
      >
        <p
          className="text-xs"
          style={{ color: '#334155', fontFamily: 'monospace' }}
        >
          &copy; 2025{' '}
          <span style={{ color: '#22d3ee' }}>AMM</span>
          {' · '}Built with Next.js &amp; TailwindCSS
        </p>
      </div>
    </footer>
  );
}
