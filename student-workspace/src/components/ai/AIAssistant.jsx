import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = ({ subjectTitle = 'this subject' }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: `Hi! I'm your AI assistant for ${subjectTitle}. I can help you with:
      
• Summarizing your notes
• Generating practice questions
• Explaining concepts in simple terms

What would you like help with?`,
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock AI responses
    const generateResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
            return `Here's a summary of your notes for ${subjectTitle}:

📝 **Key Points:**
• Main concepts have been organized into digestible sections
• Important formulas and definitions are highlighted
• Real-world applications are noted for better understanding

💡 **Important to Remember:**
Focus on understanding the core principles rather than memorization. The fundamental concepts in this subject build upon each other progressively.`;
        }

        if (lowerMessage.includes('question') || lowerMessage.includes('test') || lowerMessage.includes('quiz')) {
            return `Here are some practice questions for ${subjectTitle}:

❓ **Practice Questions:**

1. What are the fundamental principles covered in this topic?
2. How would you apply this concept to solve a real-world problem?
3. Can you explain the relationship between the key concepts discussed?
4. What are the common mistakes to avoid when working with this material?
5. How does this topic connect to other subjects you're studying?

Try answering these to test your understanding!`;
        }

        if (lowerMessage.includes('explain') || lowerMessage.includes('eli5') || lowerMessage.includes('simple')) {
            return `Let me explain ${subjectTitle} in simple terms! 🌟

Think of it like this: Imagine you're building with LEGO blocks. Each concept is like a different type of block, and understanding how they fit together helps you create something amazing.

The basic idea is to break down complex topics into smaller, manageable pieces. Once you understand each piece, you can see how they all work together to form the bigger picture.

Does this help? Would you like me to explain any specific part in more detail?`;
        }

        // Default response
        return `I understand you're asking about "${userMessage}".

Based on your notes in ${subjectTitle}, I'd recommend:

1. **Review** the fundamental concepts first
2. **Practice** with examples to reinforce understanding
3. **Connect** new information to what you already know

Is there a specific aspect you'd like me to help with? I can summarize notes, generate questions, or explain concepts in simpler terms.`;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                role: 'assistant',
                content: generateResponse(input.trim()),
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = [
        { label: '📝 Summarize Notes', action: 'Please summarize my notes' },
        { label: '❓ Generate Questions', action: 'Generate practice questions' },
        { label: '💡 Explain Simply', action: 'Explain this like I\'m 5' },
    ];

    return (
        <div className="ai-assistant">
            <div className="ai-header">
                <Sparkles size={20} className="ai-icon" />
                <h3>AI Assistant</h3>
            </div>

            <div className="ai-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`ai-message ${message.role}`}
                    >
                        <div className="message-content">
                            {message.content.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                        <div className="message-time">
                            {message.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="ai-message assistant loading">
                        <div className="message-content">
                            <Loader2 size={20} className="spinner" />
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            {messages.length === 1 && (
                <div className="quick-actions">
                    {quickActions.map((qa, index) => (
                        <button
                            key={index}
                            className="quick-action-btn"
                            onClick={() => setInput(qa.action)}
                        >
                            {qa.label}
                        </button>
                    ))}
                </div>
            )}

            <div className="ai-input-container">
                <input
                    type="text"
                    className="ai-input"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button
                    className="ai-send-btn"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default AIAssistant;
