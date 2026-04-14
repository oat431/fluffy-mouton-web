import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashBoardPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

const ReactRouter = createBrowserRouter([
    { path: '/', Component: HomePage },
    { path: '/login', Component: LoginPage },
    { path: '/register', Component: RegisterPage },
    { path: '/verify-email', Component: VerifyEmailPage },
    { path: '/dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
]);

export default ReactRouter;