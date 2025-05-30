import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, Spinner, Center } from '@chakra-ui/react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Box>{children}</Box>;
};
