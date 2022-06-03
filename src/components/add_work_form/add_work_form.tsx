import React, { memo, useRef, useState } from 'react';
import styles from './add_work_form.module.css';
import { IFileInput } from '../..';
import { validateRepo, validateTitle } from '../../util/validator';
import { addHttpsOnURL } from '../../util/url_converter';
import Actions from '../actions/actions';
import { convertTechs } from '../../util/tech_converter';

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
  const techsRef = useRef<HTMLInputElement>(null);
  const [isValidTitle, setIsValidTitle] = useState<boolean>(false);
  const [isValidRepo, setIsValidRepo] = useState<boolean>(false);
  const [file, setFile] = useState<FileData | null>(null);

  const onFileChange = (file: FileData) => {
    setFile(file);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isValidTitle && isValidRepo) {
      const work: WorkData = {
        id: Date.now(),
        title: titleRef.current?.value || '',
        repo: {
          url: addHttpsOnURL(repoRef.current?.value || ''),
          branch: branchRef.current?.value || 'master',
        },
        techs: convertTechs(techsRef.current?.value || ''),
        description: descriptionRef.current?.value || '',
        thumbnail: file || { fileName: '', fileURL: '' },
      };
      formRef.current?.reset();
      setFile(null);
      onAdd(work);
    }
  };

  const onChange = () => {
    const title = titleRef.current?.value || '';
    const repo = addHttpsOnURL(repoRef.current?.value || '');

    setIsValidTitle(validateTitle(title));
    setIsValidRepo(validateRepo(repo));
  };

  return (
    <form ref={formRef} className={styles.container} onChange={onChange}>
      <label className={`${styles.field} ${styles.title}`}>
        Title
        <input
          ref={titleRef}
          className={`${styles.input}${
            isValidTitle ? '' : ` ${styles.invalid}`
          }`}
          type='text'
          name='title'
          placeholder='title'
        />
      </label>
      <div className={styles.repo}>
        <label className={`${styles.field} ${styles.url}`}>
          Repository URL
          <input
            ref={repoRef}
            className={`${styles.input}${
              isValidRepo ? '' : ` ${styles.invalid}`
            }`}
            type='text'
            name='repo'
            placeholder='repository url'
          />
        </label>
        <label className={`${styles.field} ${styles.branch}`}>
          Branch
          <input
            ref={branchRef}
            className={styles.input}
            type='text'
            name='branch'
            placeholder='master'
          />
        </label>
      </div>
      <label className={`${styles.field} ${styles.description}`}>
        Description
        <textarea
          ref={descriptionRef}
          className={styles.textarea}
          name='description'
          placeholder='description'
        />
      </label>
      <label className={`${styles.field} ${styles.techs}`}>
        Techs
        <input
          ref={techsRef}
          className={styles.input}
          type='text'
          name='techs'
          placeholder='techs'
        />
      </label>
      <div className={`${styles.field} ${styles.thumbnail}`}>
        Thumbnail
        <div>
          <FileInput
            name={file?.fileName ? file.fileName : null}
            onFileChange={onFileChange}
          />
        </div>
      </div>
      <Actions
        actions={[
          {
            type: 'button',
            title: 'Cancel',
            isDisable: false,
            onClick: onCancel,
          },
          {
            type: 'submit',
            title: 'Add',
            isDisable: !(isValidTitle && isValidRepo),
            onClick: onSubmit,
          },
        ]}
      />
    </form>
  );
});

export default AddWorkForm;
