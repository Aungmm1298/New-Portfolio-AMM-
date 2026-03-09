export default function CVModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex justify-between items-center z-10">
          <h3 className="text-2xl font-display text-white flex items-center gap-2">
            <i className="fas fa-file-pdf" />
            My Resume
          </h3>
          <div className="flex gap-2">
            <a
              href="/CV/My portfolio.pdf"
              download="Aung_Myint_Myat_CV.pdf"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition flex items-center gap-2"
            >
              <i className="fas fa-download" />
              Download
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition flex items-center justify-center"
              aria-label="Close"
            >
              <i className="fas fa-times text-xl" />
            </button>
          </div>
        </div>
        {/* PDF Viewer */}
        <div className="w-full h-full pt-16">
          <iframe src="/CV/My portfolio.pdf" className="w-full h-full border-0" title="CV" />
        </div>
      </div>
    </div>
  );
}
