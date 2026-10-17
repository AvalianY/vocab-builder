import { AppRoutes } from './routes/AppRoutes';
import { NotificationProvider } from './components/Notification';
import { SessionBootstrap } from './features/auth/SessionBootstrap';

export function App() {
  return (
    <NotificationProvider>
      <SessionBootstrap>
        <AppRoutes />
      </SessionBootstrap>
    </NotificationProvider>
  );
}
