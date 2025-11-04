import { BrowserRouter, Link } from 'react-router-dom';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-slate-900'>
        <header className='bg-slate-800 border-b border-slate-700'>
          <div className='max-w-7xl mx-auto px-6 py-4'>
            <Link to='/' className='inline-flex items-center gap-2'>
              <span className='text-2xl'>🧩</span>
              <h1 className='text-xl font-semibold text-gray-100'>
                Project Tracker
              </h1>
            </Link>
          </div>
        </header>
        <main className='max-w-7xl mx-auto'>
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
