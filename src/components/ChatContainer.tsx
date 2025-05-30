import { Box } from '@chakra-ui/react';
import { ChatBox } from './ChatBox';
import { Header } from './Header';

export const ChatContainer = () => {
  return (
    <Box>
      <Header />
      <Box 
        w="full"
        h="calc(100vh - 64px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box 
          w="full"
          maxW="800px"
          mx={4}
        >
          <ChatBox />
        </Box>
      </Box>
    </Box>
  );
};
