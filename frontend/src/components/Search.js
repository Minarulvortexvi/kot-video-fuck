import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto bg-white rounded shadow"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{t('search')}</h2>
      <input type="text" placeholder={t('search_placeholder')} onChange={(e) => setQuery(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">{t('search')}</button>
      {results.map(result => (
        <div key={result._id} className="border p-2 mb-2">
          <p>{result.title || result.displayName}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default Search;
