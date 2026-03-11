import React from "react";
import { motion } from "motion/react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatPanel = ({
  messages,
  input,
  onInputChange,
  onSend,
  onClose,
  isWelcome,
  onStartChat,
}) => {
  const variants = {
    initial: { opacity: 0, y: 16, scale: 0.97 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: 16,
      scale: 0.97,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-[370px] h-[510px] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
    >
      <ChatHeader onClose={onClose} />

      {isWelcome ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/60">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl">👋</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            How can we help?
          </h3>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Our support team is online and ready specifically for you.
          </p>
          <button
            onClick={onStartChat}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-green-600/20 active:scale-[0.98]"
          >
            Start a Conversation
          </button>
        </div>
      ) : (
        <>
          <ChatMessages messages={messages} />
          <ChatInput value={input} onChange={onInputChange} onSend={onSend} />
        </>
      )}
    </motion.div>
  );
};

export default ChatPanel;
