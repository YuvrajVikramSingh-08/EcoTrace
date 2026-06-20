import PropTypes from 'prop-types';

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`flex gap-2.5 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-blue-600/20 border border-blue-600/30' : 'bg-eco-600/20 border border-eco-600/30'
          }`}
        >
          <span className="text-sm" aria-hidden="true">{isUser ? '👤' : '🌱'}</span>
        </div>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-600/15 border border-blue-600/20 text-gray-200'
              : 'bg-gray-800/60 border border-gray-700/40 text-gray-300'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatMessage;
