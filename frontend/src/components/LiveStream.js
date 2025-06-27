import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function LiveStream() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto bg-white rounded shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{t('live_stream')}</h2>
      <p>{t('live_stream_not_implemented')}</p>
      {/* WebRTC or AWS MediaLive integration would go here */}
    </motion.div>
  );
}

export default LiveStream;
