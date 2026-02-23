import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Stories from './pages/Stories';
import StoryReader from './pages/StoryReader';
import AdminUploadStory from './pages/AdminUploadStory';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const storiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stories',
  component: Stories,
});

const storyReaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stories/$id',
  component: StoryReader,
});

const adminUploadStoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/upload-story',
  component: AdminUploadStory,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  contactRoute,
  storiesRoute,
  storyReaderRoute,
  adminUploadStoryRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
