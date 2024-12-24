import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./DisplayBook.module.css"
import Book from './Book/Book';
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
            {
                !books?.length ? <h1>Không có sách nào</h1>
                    : books.map((book, index) => {
                        return <Book key={index} dataBook={book} />
                    })

            }

        </div>
    );
};

export default DisplayBook;