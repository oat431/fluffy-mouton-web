import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';

const ReactRouter = createBrowserRouter([
    { path: '/', Component: HomePage },
]);

export default ReactRouter;