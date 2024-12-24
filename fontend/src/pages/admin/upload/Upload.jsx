// UploadDocument.js
import React, { useState } from 'react';
import styles from './Upload.module.css';
import AdminHeader from '../../../componets/adminHeader/AdminHeader';

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [author, setAuthor] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('document', file);
        formData.append('fileName', fileName);
        formData.append('author', author);
        formData.append('type', type);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('price', price);

        fetch('http://localhost:8000/api/admin/addNewDocument', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => alert('Document uploaded successfully'))
            .catch(error => alert('Error uploading document'));
    };

    return (
        <div className={styles.container}>
            <AdminHeader />

            <div className={styles.content} >
                <h1 className={styles.h1}>Upload Document</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className={styles.formGroup}>
                        <label htmlFor="document" className={styles.label}>Upload your document:</label>
                        <input
                            type="file"
                            className={styles.input}
                            name="document"
                            id="document"
                            required
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="fileName" className={styles.label}>Enter file name:</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="fileName"
                            id="fileName"
                            placeholder="Enter file name"
                            required
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="author" className={styles.label}>Author:</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="author"
                            id="author"
                            placeholder="Enter author's name"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="type" className={styles.label}>Type:</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="type"
                            id="type"
                            placeholder="Enter type's name"
                            required
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="image" className={styles.label}>Image Link:</label>
                        <input
                            type="url"
                            className={styles.input}
                            name="image"
                            id="image"
                            placeholder="Enter image link (URL)"
                            required
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Description:</label>
                        <textarea
                            name="description"
                            id="description"
                            className={styles.textarea}
                            placeholder="Enter document description"
                            rows="4"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.label}>Price:</label>
                        <input
                            type="number"
                            className={styles.input}
                            name="price"
                            id="price"
                            placeholder="Enter price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="submit"
                            value="Submit Document"
                            className={styles.btnSubmit}
                        />
                    </div>
                </form>
            </div>



        </div>
    );
};

export default UploadDocument;
