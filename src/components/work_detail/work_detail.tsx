import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './work_detail.module.css';

type WorkDetailProps = {
  work: WorkData;
  onClose(): void;
};

const WorkDetail = ({ work, onClose }: WorkDetailProps) => {
  const [readme, setReadme] = useState<string>('');

  useEffect(() => {
    fetch(work.url, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then(setReadme);
  });

  return (
    <div className={styles.work}>
      <button onClick={onClose}>X</button>
      <ReactMarkdown children={readme} />
    </div>
  );
};

export default WorkDetail;
