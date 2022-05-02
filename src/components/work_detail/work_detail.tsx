import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { convertReadme, convertURL } from '../../util/url_converter';
import styles from './work_detail.module.css';

type WorkDetailProps = {
  work: WorkData;
  onClose(): void;
};

const WorkDetail = ({ work, onClose }: WorkDetailProps) => {
  const [readme, setReadme] = useState<string>('');

  useEffect(() => {
    const url = convertURL(work.url);
    fetch(`${url}/${work.branch}/README.md`, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then((readme) => convertReadme(readme, url, work.branch))
      .then(setReadme);
  });

  return (
    <div className={styles.work}>
      <button onClick={onClose}>X</button>
      <ReactMarkdown children={readme} rehypePlugins={[rehypeRaw]} />
    </div>
  );
};

export default WorkDetail;
