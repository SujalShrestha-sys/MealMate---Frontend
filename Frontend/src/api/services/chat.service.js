import apiClient from "../apiClient";

const chatService = {
  // Create or retrieve a conversation
  createConversation: (receiverId) => {
    return apiClient.post("/chat/create", { receiverId });
  },

  // Get user's conversations
  getConversations: () => {
    return apiClient.get("/chat/conversations");
  },

  // Send a message
  sendMessage: (conversationId, content) => {
    return apiClient.post("/chat/message", { conversationId, content });
  },

  // Get messages for a conversation
  getMessages: (conversationId) => {
    return apiClient.get(`/chat/${conversationId}/messages`);
  },
};

export default chatService;
 