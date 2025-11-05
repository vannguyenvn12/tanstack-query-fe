import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route
        path='/projects'
        element={
          <>
            <ProjectsPage />
            <ProjectsPage />
            <ProjectsPage />
          </>
        }
      />
      <Route path='/projects/:id' element={<ProjectDetailPage />} />
    </Routes>
  );
}
