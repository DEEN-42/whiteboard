import { useState } from 'react';
export default function ImageUpload({uploadedSrc, setUploadedSrc}) {

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedSrc(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Upload an Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
            {/* {uploadedSrc && <img src={uploadedSrc} alt="Preview" className="max-w-full mt-4 rounded-lg shadow" />} */}
        </div>
    );
}
