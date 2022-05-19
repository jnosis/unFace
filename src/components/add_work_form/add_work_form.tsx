import React, { memo, useRef, useState } from 'react';
import styles from './add_work_form.module.css';
import { IFileInput } from '../..';
import { validateRepo, validateTitle } from '../../util/validator';
import { addHttpsOnURL } from '../../util/url_converter';

type AddWorkFormProps = {
  FileInput: typeof IFileInput;
  onAdd(work: WorkData): void;
  onCancel(): void;
};

const AddWorkForm = memo(({ FileInput, onAdd, onCancel }: AddWorkFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const repoRef = useRef<HTMLInputElement>(null);
  const branchRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [file, setFile] = useState<FileData | null>(null);

  const onFileChange = (file: FileData) => {
    setFile(file);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = Date.now();
    const title = titleRef.current?.value || '';
    const repo = addHttpsOnURL(repoRef.current?.value || '');
    const branch = branchRef.current?.value || 'master';
    const description = descriptionRef.current?.value || '';
    const thumbnail = file || { fileName: '', fileURL: '' };

    if (validateTitle(title) && validateRepo(repo)) {
      const work: WorkData = {
        id,
        title,
        repo,
        branch,
        description,
        thumbnail,
      };
      formRef.current?.reset();
      setFile(null);
      onAdd(work);
    }
  };

  const onChange = () => {
    const title = titleRef.current?.value || '';
    const repo = addHttpsOnURL(repoRef.current?.value || '');
    if (validateTitle(title) && validateRepo(repo)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <form ref={formRef} className={styles.container} onChange={onChange}>
      <label className={styles.label}>
        Title
        <input
          ref={titleRef}
          className={styles.title}
          type='text'
          name='title'
          placeholder='title'
          required
        />
      </label>
      <label className={styles.label}>
        Repository URL
        <input
          ref={repoRef}
          className={styles.repo}
          type='text'
          name='repo'
          placeholder='repository url'
          required
        />
      </label>
      <label className={styles.label}>
        Branch
        <input
          ref={branchRef}
          className={styles.branch}
          type='text'
          name='branch'
          placeholder='master'
        />
      </label>
      <label className={styles.label}>
        Description
        <textarea
          ref={descriptionRef}
          className={styles.description}
          name='description'
          placeholder='description'
        />
      </label>
      <label className={styles.label}>
        Thumbnail
        <div>
          <FileInput
            name={file?.fileName ? file.fileName : null}
            onFileChange={onFileChange}
          />
        </div>
      </label>
      <div className={styles.commands}>
        <button type='button' className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
        <button
          className={isValid ? styles.add : `${styles.add} ${styles.disable}`}
          onClick={onSubmit}
        >
          Add
        </button>
      </div>
    </form>
  );
});

export default AddWorkForm;
