import React, { useState } from 'react';
import useWorks from '../../hooks/use_works';
import {
  convertStringToTechs,
  convertTechsToString,
} from '../../util/tech_converter';
import { validateWork } from '../../util/validator';
import ImageFileInput from '../image_file_input/image_file_input';
import Action from '../action/action';
import styles from './add_work_form.module.css';

type WorkValidation = {
  title: boolean;
  projectUrl: boolean;
  repoUrl: boolean;
  repoBranch: boolean;
};

const initialWorkInput: WorkInputData = {
  title: '',
  projectURL: '',
  repo: { url: '', branch: '' },
  description: '',
  techs: [],
  thumbnail: { fileName: '', fileURL: '' },
};

function AddWorkForm() {
  const { addWork } = useWorks();

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [added, setAdded] = useState<WorkInputData>(initialWorkInput);
  const [validation, setValidation] = useState<WorkValidation>({
    title: false,
    projectUrl: true,
    repoUrl: false,
    repoBranch: true,
  });

  const handleOpen = () => {
    setIsOpenForm(true);
  };

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
      setAdded((changed) => ({
        ...changed,
        repo: {
          ...changed.repo,
          [name === 'repoUrl' ? 'url' : 'branch']: value,
        },
      }));
    } else {
      setAdded((changed) => ({
        ...changed,
        [name]: name === 'techs' ? convertStringToTechs(value) : value,
      }));
    }
  };

  const handleFileChange = (file: FileData) => {
    setAdded((changed) => ({ ...changed, thumbnail: file }));
  };

  const handleCancel = () => {
    setAdded(initialWorkInput);
    setIsOpenForm(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Object.values(validation).includes(false)) {
      addWork.mutate(added);
      handleCancel();
    }
  };

  return (
    <li
      className={`${styles.container}${isOpenForm ? ` ${styles.opened}` : ''}`}
    >
      {isOpenForm && (
        <form className={styles.content} onSubmit={handleSubmit}>
          <div className={styles.title}>
            <label className={styles.field}>Title</label>
            <input
              className={`${styles.input}${
                validation.title ? '' : ` ${styles.invalid}`
              }`}
              type='text'
              name='title'
              defaultValue={added.title ?? ''}
              placeholder='title'
              required
              onChange={handleChange}
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
              defaultValue={added.projectURL ?? ''}
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
                defaultValue={added.repo.url ?? ''}
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
                defaultValue={added.repo.branch ?? ''}
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
              defaultValue={added.description ?? ''}
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
              defaultValue={convertTechsToString(added.techs) ?? ''}
              placeholder='techs'
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>Thumbnail</label>
            <ImageFileInput
              name={added.thumbnail?.fileName ? added.thumbnail.fileName : null}
              onFileChange={handleFileChange}
            />
          </div>

          <ul className={styles.actions}>
            <li>
              <Action
                type='button'
                title='Cancel'
                isDisable={false}
                onClick={handleCancel}
              />
            </li>
            <li>
              <Action
                type='submit'
                title='Add'
                isDisable={Object.values(validation).includes(false)}
              />
            </li>
          </ul>
        </form>
      )}
      {!isOpenForm && (
        <div className={styles.addButton} onClick={handleOpen}>
          <i className='fa-solid fa-plus' />
        </div>
      )}
    </li>
  );
}

export default AddWorkForm;
