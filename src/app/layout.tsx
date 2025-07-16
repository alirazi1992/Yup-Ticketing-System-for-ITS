import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthProvider';
import { UserSettingsProvider } from '@/context/UserSettingsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Support Ticket System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <UserSettingsProvider>
          <AuthProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </AuthProvider>
        </UserSettingsProvider>
      </body>
    </html>
  );
}