import React, { memo, useRef, useState } from 'react';
import styles from './add_work_form.module.css';
import { IFileInput } from '../..';
import { validateRepo, validateTitle } from '../../util/validator';

type AddWorkFormProps = {
  FileInput: typeof IFileInput;
  onAdd(work: WorkData): void;
};

const AddWorkForm = memo(({ FileInput, onAdd }: AddWorkFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const repoRef = useRef<HTMLInputElement>(null);
  const branchRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<FileData | null>(null);

  const onFileChange = (file: FileData) => {
    setFile(file);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = Date.now();
    const title = titleRef.current?.value || '';
    const repo = repoRef.current?.value || '';
    const branch = branchRef.current?.value || 'master';
    const description = descriptionRef.current?.value || '';
    const thumbnail = file || null;

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

  return (
    <form ref={formRef} className={styles.container}>
      <input
        ref={titleRef}
        className={styles.title}
        type='text'
        name='title'
        placeholder='title'
        required
      />
      <input
        ref={repoRef}
        className={styles.repo}
        type='text'
        name='repo'
        placeholder='repository url'
        required
      />
      <input
        ref={branchRef}
        className={styles.branch}
        type='text'
        name='branch'
        placeholder='master'
      />
      <textarea
        ref={descriptionRef}
        className={styles.description}
        name='description'
        placeholder='description'
      />
      <div>
        <FileInput
          name={file?.fileName ? file.fileName : null}
          onFileChange={onFileChange}
        />
      </div>
      <button onClick={onSubmit}>Add</button>
    </form>
  );
});

export default AddWorkForm;
