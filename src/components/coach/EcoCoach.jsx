import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage.jsx';
import CoachInput from './CoachInput.jsx';
import LoadingSpinner from '../shared/LoadingSpinner.jsx';
import EmptyState from '../shared/EmptyState.jsx';

const SUGGESTED_PROMPTS = [
  'How can I reduce my commute footprint?',
  "What's my biggest carbon category?",
  'Plan a low-carbon week for me',
  'Compare me to the average Indian',
];

function EcoCoach({
  messages = [],
  sending = false,
  onSend,
  onClear,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <EmptyState
              icon="💬"
              title="Ask EcoCoach anything"
              description="Your personal carbon footprint advisor. Ask about your emissions, get personalised tips, or plan a low-carbon week."
            />
            <div className="flex flex-wrap gap-2 mt-4 justify-center max-w-md">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onSend(prompt)}
                  className="text-xs bg-eco-600/10 text-eco-400 border border-eco-600/20 px-3 py-1.5 rounded-full hover:bg-eco-600/20 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {sending && (
              <div className="flex justify-start animate-slide-up">
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-eco-600/20 border border-eco-600/30 flex items-center justify-center">
                    <span className="text-sm" aria-hidden="true">🌱</span>
                  </div>
                  <div className="bg-gray-800/60 border border-gray-700/40 rounded-2xl px-4 py-3">
                    <LoadingSpinner size="sm" />
                    <span className="sr-only">EcoCoach is typing</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Clear chat */}
      {messages.length > 0 && (
        <div className="flex justify-center mb-2">
          <button onClick={onClear} className="btn-ghost text-xs">
            Clear chat
          </button>
        </div>
      )}

      {/* Input */}
      <CoachInput onSend={onSend} disabled={sending} />
    </div>
  );
}

EcoCoach.propTypes = {
  messages: PropTypes.array,
  sending: PropTypes.bool,
  onSend: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};

export default EcoCoach;
