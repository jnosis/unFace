import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  convertToRawContentURL,
  convertToRepoContentURL,
} from '../../util/url_converter';
import styles from './work_detail.module.css';

type WorkDetailProps = {
  work: WorkData;
  onClose(): void;
};

const WorkDetail = ({ work, onClose }: WorkDetailProps) => {
  const [readme, setReadme] = useState<string>('');
  const repoContentURL = convertToRepoContentURL(work.url, work.branch);
  const contentURL = convertToRawContentURL(work.url, work.branch);

  useEffect(() => {
    fetch(`${contentURL}/README.md`, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then(setReadme);
  });

  return (
    <div className={styles.work}>
      <button onClick={onClose}>X</button>
      <ReactMarkdown
        children={readme}
        rehypePlugins={[rehypeRaw]}
        transformLinkUri={(uri) => `${repoContentURL}/${uri}`}
        transformImageUri={(uri) => `${contentURL}/${uri}`}
      />
    </div>
  );
};

export default WorkDetail;
