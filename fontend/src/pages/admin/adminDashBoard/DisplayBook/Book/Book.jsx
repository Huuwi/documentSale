import React from 'react';
import styles from './Book.module.css';

const Book = ({ dataBook }) => {

    let { name, price, image } = dataBook || {}

    return (
        <div className={styles.bookWrapper}>



        </div>
    );
};

export default Book;