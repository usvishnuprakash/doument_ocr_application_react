import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";

const ConversationPage = () => {
  const { pdfId } = useParams();
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConversationHistory = async () => {
      try {
        const response = await axiosInstance.get(
          `/conversation-history/${pdfId}`
        );
        setConversation(response.data.history);
      } catch (error) {
        console.error("Failed to fetch conversation history", error);
      }
    };
    fetchConversationHistory();
    console.log("pdfid", pdfId);
  }, [pdfId]);

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("/ask-question/", {
        pdf_id: pdfId,
        question: question,
      });
      const newEntry = {
        question: response.data.question,
        answer: response.data.answer,
      };
      setConversation((prev) => [...prev, newEntry]);
      setQuestion("");
    } catch (error) {
      setError("Failed to get an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Conversation</h1>

        <div className="mb-4">
          {conversation.length === 0 ? (
            <p className="text-gray-500">No conversation yet.</p>
          ) : (
            <ul>
              {conversation.map((entry, index) => (
                <li key={index} className="mb-4">
                  <p className="text-indigo-600 font-bold">
                    Q: {entry.question}
                  </p>
                  <p className="text-gray-700">A: {entry.answer}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={handleAskQuestion}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${
              loading && "opacity-50"
            }`}
            disabled={loading}>
            {loading ? "Getting answer..." : "Ask Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPage;
