import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import WorkService from '../../service/work';
import {
  checkRepoContent,
  convertToRawContentURL,
  convertToRepoContentURL,
  convertToRepoURL,
} from '../../util/url_converter';
import styles from './work_detail.module.css';

type WorkDetailProps = {
  workRepository: WorkService;
  onClose(): void;
};

const WorkDetail = ({ workRepository, onClose }: WorkDetailProps) => {
  const { workTitle } = useParams<string>();
  const [work, setWork] = useState<WorkData | null>(null);
  const [readme, setReadme] = useState<string>('');
  const [repoURL, setRepoURL] = useState<string>('');
  const [repoContentURL, setRepoContentURL] = useState<string>('');
  const [contentURL, setContentURL] = useState<string>('');
  const [projectURL, setProjectURL] = useState<string>('');

  useEffect(() => {
    workRepository.getWorkByTitle(workTitle ? workTitle : '').then((work) => {
      setWork(work);
    });
  }, [workRepository]);

  useEffect(() => {
    if (work == null) {
      return;
    }

    const { repo, projectURL } = work;
    const { url, branch } = repo;
    setRepoURL(convertToRepoURL(url, branch));
    setRepoContentURL(convertToRepoContentURL(url, branch));
    setContentURL(convertToRawContentURL(url, branch));
    projectURL && setProjectURL(projectURL);
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
            <h2 className={styles.title}>{work.title}</h2>
            <div className={styles.links}>
              <a
                className={styles.link}
                href={repoURL}
                aria-label='Github'
                target='_blank'
              >
                <i className='fa-brands fa-github'></i>
              </a>
              {projectURL && (
                <a
                  className={styles.link}
                  href={projectURL}
                  aria-label='Project URL'
                  target='_blank'
                >
                  <i className='fa-solid fa-arrow-up-right-from-square'></i>
                </a>
              )}
            </div>
            <button className={styles.close} onClick={onClose}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </header>
          <div className={styles.readme}>
            <ReactMarkdown
              children={readme}
              rehypePlugins={[rehypeRaw]}
              transformLinkUri={(uri) =>
                checkRepoContent(uri) ? `${repoContentURL}/${uri}` : uri
              }
              transformImageUri={(uri) =>
                checkRepoContent(uri) ? `${contentURL}/${uri}` : uri
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkDetail;
