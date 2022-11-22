import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import useWorks from '../../hooks/use_works';
import {
  checkRepoContent,
  convertToRawContentURL,
  convertToRepoContentURL,
  convertToRepoURL,
} from '../../util/url_converter';
import styles from './work_detail.module.css';

export default function WorkDetail() {
  const { title } = useParams();
  const { workQuery } = useWorks();
  const { data: work } = workQuery(title || '');

  const { repoUrl, repoContentUrl, contentUrl, projectUrl } = convertUrls(work);
  const [readme, setReadme] = useState('');
  getReadme(contentUrl, setReadme);

  return (
    <section className={styles.container}>
      {work && (
        <>
          <header className={styles.header}>
            <h2 className={styles.title}>{work.title}</h2>
            <div className={styles.links}>
              <a
                className={styles.link}
                href={repoUrl}
                aria-label='Github'
                target='_blank'
              >
                <i className='fa-brands fa-github'></i>
              </a>
              {projectUrl && (
                <a
                  className={styles.link}
                  href={projectUrl}
                  aria-label='Project URL'
                  target='_blank'
                >
                  <i className='fa-solid fa-arrow-up-right-from-square'></i>
                </a>
              )}
            </div>
            <Link to='/' className={styles.close}>
              <i className='fa-solid fa-xmark'></i>
            </Link>
          </header>
          <article className={styles.readme}>
            <ReactMarkdown
              children={readme}
              rehypePlugins={[rehypeRaw]}
              transformLinkUri={(uri) =>
                checkRepoContent(uri) ? `${repoContentUrl}/${uri}` : uri
              }
              transformImageUri={(uri) =>
                checkRepoContent(uri) ? `${contentUrl}/${uri}` : uri
              }
            />
          </article>
        </>
      )}
    </section>
  );
}

function convertUrls(work?: WorkData | null) {
  const repoUrl = work ? convertToRepoURL(work.repo.url, work.repo.branch) : '';

  const repoContentUrl = work
    ? convertToRepoContentURL(work.repo.url, work.repo.branch)
    : '';

  const contentUrl = work
    ? convertToRawContentURL(work.repo.url, work.repo.branch)
    : '';

  const projectUrl = work ? work.projectURL : '';

  return { repoUrl, repoContentUrl, contentUrl, projectUrl };
}

function getReadme(
  url: string,
  callback: React.Dispatch<React.SetStateAction<string>>
) {
  if (url !== '') {
    fetch(`${url}/README.md`, { method: 'GET' })
      .then((res) => res.text())
      .then(callback);
  }
}
