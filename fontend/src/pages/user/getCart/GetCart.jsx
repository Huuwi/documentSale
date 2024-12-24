import styles from './GetCart.module.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div className={styles.cartContainer}>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <span>{item.name}</span> - <span>{item.price}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GetCart;
