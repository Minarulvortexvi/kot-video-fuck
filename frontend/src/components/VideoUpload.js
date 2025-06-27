import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const UPLOAD_VIDEO = gql`
  mutation UploadVideo($title: String!, $description: String!, $category: String!, $tags: [String], $file: Upload!) {
    uploadVideo(title: $title, description: $description, category: $category, tags: $tags, file: $file) {
      id
      title
      url
    }
  }
`;

function VideoUpload() {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [uploadVideo] = useMutation(UPLOAD_VIDEO);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadVideo({ variables: { title, description, category, tags: tags.split(','), file } });
    alert(t('video_uploaded'));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto bg-white rounded shadow"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input type="text" placeholder={t('title')} onChange={(e) => setTitle(e.target.value)} className="border p-2 mb-2 w-full" />
      <textarea placeholder={t('description')} onChange={(e) => setDescription(e.target.value)} className="border p-2 mb-2 w-full"></textarea>
      <select onChange={(e) => setCategory(e.target.value)} className="border p-2 mb-2 w-full">
        <option value="">{t('select_category')}</option>
        <option value="entertainment">{t('entertainment')}</option>
        <option value="education">{t('education')}</option>
      </select>
      <input type="text" placeholder={t('tags')} onChange={(e) => setTags(e.target.value)} className="border p-2 mb-2 w-full" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full">{t('upload')}</button>
    </motion.form>
  );
}

export default VideoUpload;
