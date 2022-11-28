import React, { useState } from 'react';
import useWorks from '../../hooks/use_works';
import {
  convertStringToTechs,
  convertTechsToString,
} from '../../util/tech_converter';
import { validateWork } from '../../util/validator';
import ImageFileInput from '../image_file_input/image_file_input';
import Action from '../action/action';
import styles from './edit_work_form.module.css';

type EditWorkFormProps = {
  work: WorkData;
  onCancel(): void;
};

type WorkValidation = {
  title: boolean;
  projectUrl: boolean;
  repoUrl: boolean;
  repoBranch: boolean;
};

function EditWorkForm({ work, onCancel }: EditWorkFormProps) {
  const { updateWork } = useWorks();

  const { title, description, techs, repo, projectURL, thumbnail } = work;
  const [changed, setChanged] = useState<WorkInputData>({
    title,
    description,
    techs,
    repo,
    projectURL,
    thumbnail,
  });
  const [validation, setValidation] = useState<WorkValidation>({
    title: true,
    projectUrl: true,
    repoUrl: true,
    repoBranch: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name !== 'techs' && name !== 'description') {
      setValidation((validation) => ({
        ...validation,
        [name]: validateWork(name, value),
      }));
    }
    if (name.includes('repo')) {
      setChanged((changed) => ({
        ...changed,
        repo: {
          ...changed.repo,
          [name === 'repoUrl' ? 'url' : 'branch']: value,
        },
      }));
    } else {
      setChanged((changed) => ({
        ...changed,
        [name]: name === 'techs' ? convertStringToTechs(value) : value,
      }));
    }
  };

  const handleFileChange = (file: FileData) => {
    setChanged((changed) => ({ ...changed, thumbnail: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Object.values(validation).includes(false)) {
      updateWork.mutate(changed);
      onCancel();
    }
  };

  return (
    <li className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <label className={styles.field}>Title</label>
          <input
            className={`${styles.input}${
              validation.title ? '' : ` ${styles.invalid}`
            }`}
            type='text'
            name='title'
            defaultValue={changed.title ?? ''}
            placeholder='title'
            required
            readOnly
          />
        </div>
        <div>
          <label className={styles.field}>Project URL</label>
          <input
            className={`${styles.input}${
              validation.projectUrl ? '' : ` ${styles.invalid}`
            }`}
            type='text'
            name='projectUrl'
            defaultValue={changed.projectURL ?? ''}
            placeholder='project url'
            onChange={handleChange}
          />
        </div>
        <div className={styles.repo}>
          <div className={`${styles.field} ${styles.url}`}>
            <label>Repository URL</label>
            <input
              className={`${styles.input}${
                validation.repoUrl ? '' : ` ${styles.invalid}`
              }`}
              type='text'
              name='repoUrl'
              defaultValue={changed.repo.url ?? ''}
              placeholder='repo url'
              required
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.field} ${styles.branch}`}>
            <label>Branch</label>
            <input
              className={`${styles.input}${
                validation.repoBranch ? '' : ` ${styles.invalid}`
              }`}
              type='text'
              name='repoBranch'
              defaultValue={changed.repo.branch ?? ''}
              placeholder='repo branch'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={`${styles.field} ${styles.description}`}>
          <label>Description</label>
          <textarea
            className={`${styles.textarea}`}
            name='description'
            defaultValue={changed.description ?? ''}
            placeholder='description'
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Techs</label>
          <input
            className={`${styles.input}`}
            type='text'
            name='techs'
            defaultValue={convertTechsToString(changed.techs) ?? ''}
            placeholder='techs'
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Thumbnail</label>
          <ImageFileInput
            name={
              changed.thumbnail?.fileName ? changed.thumbnail.fileName : null
            }
            onFileChange={handleFileChange}
          />
        </div>

        <ul className={styles.actions}>
          <li>
            <Action
              type='button'
              title='Cancel'
              isDisable={false}
              onClick={onCancel}
            />
          </li>
          <li>
            <Action
              type='submit'
              title='Edit'
              isDisable={Object.values(validation).includes(false)}
            />
          </li>
        </ul>
      </form>
    </li>
  );
}

export default EditWorkForm;
