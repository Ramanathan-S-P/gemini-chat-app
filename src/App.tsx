import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ChatContainer } from './components/ChatContainer'
import { Login } from './components/Auth/Login'
import { SignUp } from './components/Auth/SignUp'
import { ProtectedRoute } from './components/Auth/ProtectedRoute'
import { AuthProvider } from './components/Auth/AuthContext'

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box minH="100vh" minW="100vw" bg="gray.50" >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatContainer />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/chat" replace />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
