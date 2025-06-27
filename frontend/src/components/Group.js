import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Group() {
  const { t } = useTranslation();
  const [name, setName] = useState('');

  const handleCreateGroup = async () => {
    await axios.post('http://localhost:5000/api/groups/create', { name }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    alert(t('group_created'));
  };

  return (
    <motion.div
      className="p-4 max-w-md mx-auto bg-white rounded shadow"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{t('create_group')}</h2>
      <input type="text" placeholder={t('group_name')} onChange={(e) => setName(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleCreateGroup} className="bg-blue-500 text-white px-4 py-2 w-full">{t('create')}</button>
    </motion.div>
  );
}

export default Group;
