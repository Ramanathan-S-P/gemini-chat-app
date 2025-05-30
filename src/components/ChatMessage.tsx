import { Box, Text } from '@chakra-ui/react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  return (
    <Box
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      bg={isUser ? 'blue.500' : 'gray.100'}
      color={isUser ? 'white' : 'gray.800'}
      px={6}
      py={3}
      borderRadius="2xl"
      maxW="80%"
      boxShadow="sm"
      fontSize="md"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        borderWidth: '8px',
        borderStyle: 'solid',
        borderColor: isUser 
          ? 'transparent transparent transparent blue.500'
          : 'transparent gray.100 transparent transparent',
        right: isUser ? '-12px' : 'auto',
        left: isUser ? 'auto' : '-12px',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <Text lineHeight="tall">{message}</Text>
    </Box>
  );
};
