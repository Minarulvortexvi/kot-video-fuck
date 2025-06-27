import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Login() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <a href="http://localhost:5000/api/auth/google" className="bg-blue-500 text-white px-4 py-2 rounded">
        {t('login_with_google')}
      </a>
    </motion.div>
  );
}

export default Login;
