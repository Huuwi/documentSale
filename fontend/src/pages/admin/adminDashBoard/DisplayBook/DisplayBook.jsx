import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./DisplayBook.module.css"

const DisplayBook = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const result = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getAllDocument", {}, { withCredentials: true });
                setBooks(result.data.dataDocument);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBooks()

    }, []);

    return (
        <div>

        </div>
    );
};

export default DisplayBook;