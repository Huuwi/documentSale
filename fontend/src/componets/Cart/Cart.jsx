import styles from "./Cart.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderNew from "../HeaderNew/HeaderNew";
import Footer from "../footer/Footer";
import { BsTrash3 } from "react-icons/bs";

function Cart() {
    const [itemList, setItemList] = useState([])
    useEffect(async () => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/auth/getCart",
                {},
                { withCredentials: true }
            );
            console.log(response.data.dataCart)
            setItemList(response.data.dataCart)
        }
        catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }, [])

    return (
        <div className={styles.cartContainer}>
            <HeaderNew />
            <div className={styles.cartContent}>
                <p>Giỏ Hàng (27 sản phẩm)</p>
                <div className={styles.title}>
                    <p className={styles.desc}>Thông tin</p>
                    <p className={styles.count}>Số lượng</p>
                    <p className={styles.money}>Thành tiền</p>
                </div>
                <div className={styles.allItem}>
                    {itemList.map((item, i) => {
                        return (
                            <div className={styles.item}>
                                <div className={styles.itemPic} style={{
                                    backgroundImage: `url(${item.image})`
                                }}></div>
                                <div className={styles.itemName}><p>{item.name}</p></div>
                                <div className={styles.itemCount}><p>1</p></div>
                                <div className={styles.itemMoney}><p>30.000VNĐ</p></div>
                                <BsTrash3 style={{ height: '100%', cursor: 'pointer', marginLeft: '20px', marginTop: '5px' }} />
                            </div>
                        )
                    })}
                    <button class={styles.button24} role="button">Mua Hàng</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart;