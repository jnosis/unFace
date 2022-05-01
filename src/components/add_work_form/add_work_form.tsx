import React, { memo, useRef, useState } from 'react';
import { IFileInput } from '../..';

type AddWorkFormProps = {
  FileInput: typeof IFileInput;
  onAdd(work: WorkData): void;
};

const AddWorkForm = memo(({ FileInput, onAdd }: AddWorkFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<FileData | null>(null);

  const onFileChange = (file: FileData) => {
    setFile(file);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const work: WorkData = {
      id: Date.now(),
      title: titleRef.current?.value || '',
      url: urlRef.current?.value || '',
      description: descriptionRef.current?.value || '',
      thumbnail: file || null,
    };
    formRef.current?.reset();
    setFile(null);
    onAdd(work);
  };

  return (
    <form ref={formRef}>
      <input ref={titleRef} type='text' name='title' placeholder='title' />
      <input ref={urlRef} type='text' name='url' placeholder='url' />
      <textarea
        ref={descriptionRef}
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
