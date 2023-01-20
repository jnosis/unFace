import React, { useRef, useState } from 'react';
import imageUploader from '../../api/image_uploader';
import { addHttpsOnURL } from '../../util/url_converter';
import styles from './image_file_input.module.css';

type ImageFileInputProps = {
  name: string | null;
  onFileChange(file: FileData): void;
};

function ImageFileInput({ name, onFileChange }: ImageFileInputProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (e.target.files !== null) {
      const uploaded = await imageUploader.upload(e.target.files[0]);
      onFileChange({
        fileName: uploaded.original_filename,
        fileUrl: addHttpsOnURL(uploaded.url),
      });
    }
    setIsLoading(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <input
        ref={fileRef}
        className={styles.input}
        type='file'
        accept='image/*'
        name='file'
        onChange={handleChange}
      />
      <button className={styles.button} onClick={handleClick}>
        {isLoading ? <div className={styles.loading}></div> : name || 'No file'}
      </button>
    </div>
  );
}

export default ImageFileInput;
