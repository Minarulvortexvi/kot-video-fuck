import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { motion } from 'framer-motion';

const GET_CHATS = gql`
  query Chats {
    chats {
      id
      participants {
        displayName
      }
      messages {
        sender {
          displayName
        }
        text
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: ID!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text) {
      id
      messages {
        text
      }
    }
  }
`;

function Chat() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const { data, loading } = useQuery(GET_CHATS);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('message', (msg) => {
      // Update messages
    });
    return () => socket.disconnect();
  }, []);

  const handleSendMessage = async () => {
    await sendMessage({ variables: { chatId, text: message } });
    setMessage('');
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto bg-white rounded shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{t('chat')}</h2>
      <select onChange={(e) => setChatId(e.target.value)} className="border p-2 mb-2 w-full">
        <option value="">{t('select_chat')}</option>
        {data.chats.map(chat => (
          <option key={chat.id} value={chat.id}>{chat.participants.map(p => p.displayName).join(', ')}</option>
        ))}
      </select>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2">{t('send')}</button>
    </motion.div>
  );
}

export default Chat;
