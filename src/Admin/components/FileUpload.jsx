import React, { useState } from 'react';
import './FileUpload.css'; // Import the CSS file for styles

const FileUpload = ({ name, id, label, setFormState, picture}) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(picture ? `${picture}`  : '/assets/images/default.jpg');


  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          canvas.width = img.width / 2; // Reduce to 50% of original size
          canvas.height = img.height / 2;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob(
            (blob) => {
              const newFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(newFile);
            },
            "image/jpeg",
            0.6 // Reduce quality to 60%
          );
        };
      };
    });
  };

  const convertFileToBase64 = async (file) => {
    if (!file) return null;
    const compressedFile = await compressImage(file);
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      // const reader = new FileReader();
      const base64 = await convertFileToBase64(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);

        setFormState((prevState) => ({
          ...prevState,
          [name]: base64,
        }));
      };
      reader.readAsDataURL(file);

    }

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImage(file);
    //     setImagePreview(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }

    
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('/assets/images/default.jpg');
  };

  return (
    <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4 text-center">
      <div className="mb-4">
        <label className="form-label">{label}</label>
        <div className="fileupload" data-provides="fileupload">
          <div className="image-container rounded">
            <img
              src={imagePreview}
              alt="default"
              className="img-fluid rounded"
              height="150px"
              width="120px"
              onClick={() => document.getElementById(`${id}`).click()}
            />
            {image && (
              <div className="overlay">
                <i className="fa fa-times remove-icon" onClick={handleRemoveImage}></i>
              </div>
            )}
          </div>
          <input
            id={id}
            className="form-control"
            name={name}
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
