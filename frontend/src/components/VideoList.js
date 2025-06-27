import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

const GET_VIDEOS = gql`
  query Videos {
    videos {
      id
      title
      url
      description
      category
      tags
      likes {
        id
      }
      userId {
        displayName
      }
    }
  }
`;

function VideoList() {
  const { t } = useTranslation();
  const { data, loading } = useQuery(GET_VIDEOS);

  const handleLike = async (videoId) => {
    await axios.post(`http://localhost:5000/api/videos/${videoId}/like`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {data.videos.map(video => (
        <motion.div
          key={video.id}
          className="border p-4 mb-4 bg-white rounded shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">{video.title}</h2>
          <video src={video.url} controls className="w-full" />
          <p>{video.description}</p>
          <p>{t('category')}: {video.category}</p>
          <p>{t('tags')}: {video.tags.join(', ')}</p>
          <button onClick={() => handleLike(video.id)} className="bg-blue-500 text-white px-2 py-1">{t('like')} ({video.likes.length})</button>
          <button className="bg-gray-500 text-white px-2 py-1">{t('comment')}</button>
          <button className="bg-green-500 text-white px-2 py-1">{t('share')}</button>
        </motion.div>
      ))}
    </div>
  );
}

export default VideoList;
