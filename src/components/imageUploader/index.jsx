import React from 'react';
import './index.module.css';

export let uploadedImageSrc = '';

export default function ImageUpload() {
    console.log("hello");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update the module-level variable with the image src.
        uploadedImageSrc = e.target.result;
        console.log("Image src stored in variable:", uploadedImageSrc);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  return (
    <div className="container">
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}
