import React, { useState } from 'react';
import './FileUpload.css'; // Import the CSS file for styles

const FileUpload = ({ name, id, label, setFormState, picture}) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(picture ? `${picture}`  : '/assets/images/default.jpg');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);

        setFormState((prevState) => ({
          ...prevState,
          [name]: file
        }));
      };
      reader.readAsDataURL(file);
    }

    
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
