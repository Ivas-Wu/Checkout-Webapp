import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import './ImageHandler.css';

export interface IImageHandlerProps {
  scanAndEdit: () => void;
}

const ImageHandler: React.FC<IImageHandlerProps> = ({ scanAndEdit }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const sendToScanner = () => {
    console.log('TODO send to scanner!'); //Currently just using hardcoded recipts
    scanAndEdit();
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
                <button onClick={() => sendToScanner()}>Upload</button>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageHandler;
