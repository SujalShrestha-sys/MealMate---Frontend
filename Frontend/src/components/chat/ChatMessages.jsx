import React, { useEffect, useRef } from "react";
import useAuthStore from "../../store/useAuthStore";

const ChatMessages = ({ messages }) => {
  const bottomRef = useRef(null);
  const { user } = useAuthStore();

  // Scroll to bottom whenever a new message is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper to format time
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/60">
      {messages.map((msg) => {
        const isUser = msg.senderId === user?.id;
        const senderName = isUser ? "You" : msg.sender?.name || "Support";

        return (
          <div
            key={msg.id}
            className={`animate-[chat-fade-in_0.25s_ease-out] flex flex-col ${isUser ? "items-end" : "items-start"}`}
          >
            {/* Sender name with avatar */}
            <div
              className={`flex items-center gap-2 mb-1 ${isUser ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${isUser ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}
              >
                {senderName.charAt(0)}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {senderName}
              </span>
            </div>

            {/* Message bubble */}
            <div
              className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed
                ${
                  isUser
                    ? "bg-green-600 text-white rounded-2xl rounded-tr-md"
                    : "bg-white text-slate-700 rounded-2xl rounded-tl-md border border-slate-100 shadow-sm"
                }`}
            >
              {msg.content}
            </div>

            {/* Time */}
            <span className="text-[10px] text-slate-400 mt-1 px-1">
              {formatTime(msg.createdAt)}
            </span>
          </div>
        );
      })}

      {/* Invisible element to scroll to */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
