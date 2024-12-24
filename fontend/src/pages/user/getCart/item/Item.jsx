import React from 'react';
import styles from './Item.module.css';

const Item = ({ item }) => {
    return (
        <div className="item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
        </div>
    );
};

export default Item;