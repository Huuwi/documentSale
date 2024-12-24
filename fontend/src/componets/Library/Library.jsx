import { useEffect, useState } from "react"
import styles from "./Library.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoCloudDownloadSharp } from "react-icons/io5";

function Library() {
    const [itemList, setItemList] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/getBoughtDocument`,
                    {},
                    { withCredentials: true }
                );
                console.log(response.data.dataBoughtDocument);
                setItemList(response.data.dataBoughtDocument);
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || "Có lỗi xảy ra");
            }
        };

        fetchData();
    }, []);

    function back() {
        navigate('/dashBoard')
    }


    return (
        <div className={styles.libraryContainer}>
            <div className={styles.cartContent}>
                <p>Danh sách sản phẩm đã mua</p>
                <div className={styles.title}>
                    <p className={styles.desc}>Thông tin</p>
                    <p className={styles.count}>Số lượng</p>
                    <p className={styles.money}>Thành tiền</p>
                </div>
                <div className={styles.allItem}>
                    {itemList.map((item, i) => {
                        return (
                            <div className={styles.item} key={i}>
                                <div className={styles.itemPic} style={{
                                    backgroundImage: `url(${item.image})`
                                }}></div>
                                <div className={styles.itemName}><p>{item.name}</p></div>
                                <div className={styles.itemCount}><p>1</p></div>
                                <div className={styles.itemMoney}><p>{item.price}.000VNĐ</p></div>
                                <IoCloudDownloadSharp style={{ height: '100%', cursor: 'pointer', marginLeft: '20px', marginTop: '5px' }} />
                            </div>
                        )
                    })}
                    <div className={styles.purchase}>
                        <button className={styles.button24} role="button" onClick={back}>Trở về</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Library;