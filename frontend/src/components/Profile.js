import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      displayName
      email
      profilePicture
      videos {
        id
        title
        url
      }
      groups {
        id
        name
      }
    }
  }
`;

function Profile() {
  const { t } = useTranslation();
  const userId = localStorage.getItem('userId');
  const { data, loading } = useQuery(GET_USER, { variables: { id: userId } });

  if (loading) return <div>{t('loading')}</div>;

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto bg-white rounded shadow"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">{data.user.displayName}</h1>
      <img src={data.user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full" />
      <p>{data.user.email}</p>
      <h2>{t('my_videos')}</h2>
      {data.user.videos.map(video => (
        <div key={video.id} className="border p-4 mb-4">
          <h3>{video.title}</h3>
          <video src={video.url} controls className="w-full" />
        </div>
      ))}
      <h2>{t('my_groups')}</h2>
      {data.user.groups.map(group => (
        <div key={group.id} className="border p-2 mb-2">{group.name}</div>
      ))}
    </motion.div>
  );
}

export default Profile;
