import React, { memo, useRef, useState } from 'react';
import ImageUploader from '../../service/image_uploader';
import styles from './image_file_input.module.css';

type ImageFileInputProps = {
  imageUploader: ImageUploader;
  name: string | null;
  onFileChange(file: FileData): void;
};

const ImageFileInput = memo(
  ({ imageUploader, name, onFileChange }: ImageFileInputProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      inputRef?.current?.click();
    };

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      if (event.target.files !== null) {
        const uploaded = await imageUploader.upload(event.target.files[0]);
        onFileChange({
          fileName: uploaded.original_filename,
          fileURL: uploaded.url,
        });
      }
      setLoading(false);
    };

    return (
      <div className={styles.container}>
        <input
          ref={inputRef}
          className={styles.input}
          type='file'
          accept='image/*'
          name='file'
          onChange={onChange}
        />
        {!loading && (
          <button className={styles.button} onClick={onButtonClick}>
            {name || 'No file'}
          </button>
        )}
        {loading && <div className={styles.loading}></div>}
      </div>
    );
  }
);

export default ImageFileInput;
