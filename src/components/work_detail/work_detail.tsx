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

    setRepoURL(convertToRepoURL(work.repo, work.branch));
    setRepoContentURL(convertToRepoContentURL(work.repo, work.branch));
    setContentURL(convertToRawContentURL(work.repo, work.branch));
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
        <>
          <header>
            <h2>{work.title}</h2>
            <a href={repoURL} target='_blank'>
              Github
            </a>
            <button onClick={onClose}>X</button>
          </header>
          <ReactMarkdown
            children={readme}
            rehypePlugins={[rehypeRaw]}
            transformLinkUri={(uri) => `${repoContentURL}/${uri}`}
            transformImageUri={(uri) => `${contentURL}/${uri}`}
          />
        </>
      )}
    </div>
  );
};

export default WorkDetail;
