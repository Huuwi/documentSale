import React from 'react';
import styles from './Book.module.css';
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';

const Book = ({ dataBook }) => {

    let { name, price, image, documentId } = dataBook || {}


    async function handleDeleteBook() {

        if (!confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
            return;
        }

        try {
            const result = await axios.post(import.meta.env.VITE_BACKEND_URL + "/admin/deleteDocument", { documentId }, { withCredentials: true });
            alert("Xóa sách thành công!");
            window.location.reload();
        } catch (error) {
            alert("Có lỗi xảy ra khi xóa sách!");
            console.log(error);
            // window.location.reload();
        }
    }

    return (
        <div className={styles.bookWrapper}>


            <div className={styles.imageBook} style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "contain" }} />


            <div className={styles.inforBook} >
                <div className={styles.nameBook}>
                    <h1>{name}</h1>
                </div>
                <div className={styles.priceBook}>
                    <h2 style={{ color: "red" }}>
                        {price} KVND
                    </h2>
                </div>
                <button className={styles.deleteBtn} onClick={handleDeleteBook}  > <FaRegTrashAlt style={{ color: "red" }} /> Xóa sách</button>
            </div>




        </div>
    );
};

export default Book;