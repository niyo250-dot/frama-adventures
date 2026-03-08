export default function Footer() {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} FRAMA Nature Adventures. All rights reserved.</p>
        <p>Designed with love for nature.</p>
        <p className="mt-2">
          <a href="/admin/login" className="text-sm text-gray-400 hover:text-gray-600">
            Admin
          </a>
        </p>
      </div>
    </footer>
  );
}
