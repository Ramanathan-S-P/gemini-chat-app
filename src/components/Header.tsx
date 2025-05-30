import { Box, Flex, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from './Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <Box bg={bgColor} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading 
          color="blue.600" 
          fontSize="2xl"
          fontWeight="medium"
        >
          Chat with Gemini AI
        </Heading>
        
        {user && (
          <Flex alignItems="center">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              size="sm"
              colorScheme="blue"
            >
              Sign Out
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
