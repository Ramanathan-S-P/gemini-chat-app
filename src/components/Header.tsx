import { Box, Flex, Button, Heading, useColorModeValue, HStack } from '@chakra-ui/react';
import { BiBrain } from 'react-icons/bi';
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
        <HStack spacing={3}>
          <BiBrain size="24px" color="#4299E1" />
          <Heading 
            color="blue.600" 
            fontSize="2xl"
            fontWeight="medium"
          >
            Chat with Gemini AI
          </Heading>
        </HStack>
        
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
