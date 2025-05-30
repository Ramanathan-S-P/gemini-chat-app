import { Box, Input, Button, VStack, HStack, useToast } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { generateChatResponse } from '../services/chatService';

interface Message {
  text: string;
  isUser: boolean;
}

export const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const abortController = useRef<AbortController | null>(null);
  const toast = useToast();

  const handleSend = async () => {
    if (newMessage.trim()) {
      const userMessage = newMessage.trim();
      // Add user message
      setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
      setNewMessage('');
      setIsTyping(true);      
      // Create new AbortController for this request
      abortController.current = new AbortController();      try {
        if (!abortController.current) return;
        const response = await generateChatResponse(userMessage, abortController.current.signal);
        
        // Only add the response if we haven't been cancelled
        if (!abortController.current?.signal.aborted) {
          setMessages(prev => [...prev, { text: response, isUser: false }]);
        }
      } catch (error: any) {
        // Don't show any error message if the request was cancelled
        if (error.name !== 'AbortError') {
          const errorMessage = error.message || 'Failed to get response from Gemini';
          toast({
            title: 'Error',
            description: errorMessage,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          
          // Add error message to chat only if not cancelled
          if (!abortController.current?.signal.aborted) {
            setMessages(prev => [...prev, { 
              text: `⚠️ ${errorMessage}`, 
              isUser: false 
            }]);
          }
        }
      } finally {
        setIsTyping(false);
        abortController.current = null;
      }
    }
  };
  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
      setIsTyping(false);
      toast({
        title: 'Cancelled',
        description: 'Response generation cancelled',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <Box 
      w="full"
      h="75vh"
      borderWidth={1} 
      borderRadius="xl" 
      p={4}
      bg="white"
      boxShadow="xl"
      display="flex"
      flexDirection="column"
    >
      <VStack h="100%" spacing={4}>        <HStack w="100%" px={2} justify="flex-end">
          <HStack spacing={2}>
            {isTyping && (
              <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                _hover={{ bg: 'red.50' }}
              >
                Cancel Response
              </Button>
            )}            <Button 
              colorScheme="red" 
              size="sm" 
              onClick={handleClearChat}
              variant="ghost"
              _hover={{ bg: 'red.50' }}
              disabled={messages.length === 0}
              opacity={messages.length === 0 ? 0.6 : 1}
            >
              Clear Chat
            </Button>
          </HStack>
        </HStack>
        <Box 
          flex={1} 
          w="100%" 
          overflowY="auto" 
          p={4}
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              bg: 'gray.50',
              borderRadius: 'full',
            },
            '&::-webkit-scrollbar-thumb': {
              bg: 'blue.100',
              borderRadius: 'full',
              '&:hover': {
                bg: 'blue.200',
              },
            },
          }}
        >
          <VStack spacing={4} align="stretch">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            {isTyping && (
              <ChatMessage
                message="Gemini is thinking..."
                isUser={false}
              />
            )}
          </VStack>
        </Box>
        <HStack w="100%" p={2}>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
            placeholder="Type your message here..."
            size="lg"
            bg="gray.50"
            border="none"
            _focus={{
              boxShadow: 'none',
              bg: 'white',
              borderColor: 'blue.200'
            }}
            disabled={isTyping}
          />          <Button 
            colorScheme="blue" 
            onClick={handleSend}
            isLoading={isTyping}
            loadingText="Sending"
            disabled={isTyping || !newMessage.trim()}
            size="lg"
            px={8}
            bg="blue.500"
            _hover={{ bg: 'blue.600' }}
            opacity={!newMessage.trim() ? 0.6 : 1}
          >
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
