import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import ConversationPage from "./pages/conversationPage";

// components

import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversation/:pdfId"
            element={
              <ProtectedRoute>
                <ConversationPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
