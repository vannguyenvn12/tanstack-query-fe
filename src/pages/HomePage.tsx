import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-100">Welcome to Project Tracker</h1>
        <p className="text-lg text-gray-300">
          A clean and simple project management application built for learning React Query.
        </p>
        <div className="mt-10 space-y-4">
          <Link
            to="/projects"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

