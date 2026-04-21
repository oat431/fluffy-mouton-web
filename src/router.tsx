import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ShortLinkPage from './pages/ShortLinkPage';

const ReactRouter = createBrowserRouter([
    { path: '/', Component: HomePage },
    { path: '/login', Component: LoginPage },
    { path: '/register', Component: RegisterPage },
    { path: '/verify-email', Component: VerifyEmailPage },
    { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
    { path: '/short-link', element: <ProtectedRoute><ShortLinkPage /></ProtectedRoute> },
]);

export default ReactRouter;