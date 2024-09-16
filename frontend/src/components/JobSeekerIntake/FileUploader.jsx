import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
  border: 2px dashed #4a4a4a;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
  background-color: #2a2a2a;

  &:hover {
    border-color: #6a6a6a;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #e0e0e0;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 5px;

  &:hover {
    color: #ff4757;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-top: 10px;
  font-size: 0.9rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #e0e0e0;
  font-size: 0.9rem;
`;

const FileUploader = ({ label, name, accept, onChange, file, required, maxSize }) => {
    const validateFileType = useCallback((file) => {
      if (name === 'resume' && file.type !== 'application/pdf') {
        return {
          code: 'wrong-file-type',
          message: 'Error: Please upload a PDF file for your resume.'
        };
      }
      if ((name === 'profile_picture' || name === 'cover_photo') && !file.type.startsWith('image/')) {
        return {
          code: 'wrong-file-type',
          message: 'Error: Please upload an image file for your photo.'
        };
      }
      return null;
    }, [name]);

    const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onChange({ target: { name, files: acceptedFiles } });
      }
    }, [name, onChange]);

    const removeFile = () => {
      onChange({ target: { name, files: [] } });
    };

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false,
      validator: validateFileType
    });

    const fileTypeError = fileRejections.length > 0 && fileRejections[0].errors.some(e => e.code === 'wrong-file-type' || e.code === 'file-invalid-type');
    const fileSizeError = fileRejections.length > 0 && fileRejections[0].errors.some(e => e.code === 'file-too-large');

    return (
      <div>
        <Label htmlFor={name}>{label}</Label>
        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps({ required })} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag 'n' drop a file here, or click to select a file</p>
          )}
          {file && (
            <FileInfo>
              <span>Selected file: {file.name}</span>
              <RemoveButton onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}>×</RemoveButton>
            </FileInfo>
          )}
          {fileTypeError && (
            <ErrorMessage>
              {fileRejections[0].errors.find(e => e.code === 'wrong-file-type' || e.code === 'file-invalid-type').message}
            </ErrorMessage>
          )}
          {fileSizeError && (
            <ErrorMessage>Error: File is too large. Please upload a file smaller than {maxSize / (1024 * 1024)}MB.</ErrorMessage>
          )}
        </DropzoneContainer>
      </div>
    );
  };

  export default FileUploader;
