import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import WorkRepository from '../../service/work_repository';
import {
  convertToRawContentURL,
  convertToRepoContentURL,
  convertToRepoURL,
} from '../../util/url_converter';
import styles from './work_detail.module.css';

type WorkDetailProps = {
  workRepository: WorkRepository;
  onClose(): void;
};

const WorkDetail = ({ workRepository, onClose }: WorkDetailProps) => {
  const { workTitle } = useParams<string>();
  const [work, setWork] = useState<WorkData | null>(null);
  const [readme, setReadme] = useState<string>('');
  const [repoURL, setRepoURL] = useState<string>('');
  const [repoContentURL, setRepoContentURL] = useState<string>('');
  const [contentURL, setContentURL] = useState<string>('');

  useEffect(() => {
    workRepository.getWorkByTitle(workTitle ? workTitle : '').then((work) => {
      setWork(work);
    });
  }, [workRepository]);

  useEffect(() => {
    if (work == null) {
      return;
    }

    const { url, branch } = work.repo;
    setRepoURL(convertToRepoURL(url, branch));
    setRepoContentURL(convertToRepoContentURL(url, branch));
    setContentURL(convertToRawContentURL(url, branch));
  }, [work]);

  useEffect(() => {
    if (contentURL !== '') {
      fetch(`${contentURL}/README.md`, {
        method: 'GET',
      })
        .then((res) => res.text())
        .then(setReadme);
    }
  }, [contentURL]);

  return (
    <div className={styles.work}>
      {!!work && !!contentURL && (
        <div className={styles.container}>
          <header className={styles.header}>
            <a className={styles.title} href={repoURL} target='_blank'>
              <h2>{work.title}</h2>
            </a>
            <button className={styles.close} onClick={onClose}>
              X
            </button>
          </header>
          <div className={styles.readme}>
            <ReactMarkdown
              children={readme}
              rehypePlugins={[rehypeRaw]}
              transformLinkUri={(uri) => `${repoContentURL}/${uri}`}
              transformImageUri={(uri) => `${contentURL}/${uri}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkDetail;
