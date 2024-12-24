import styles from "./HeaderNew.module.css"
import Header from "../header/Header"
import { FaSearch } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HeaderNew() {
    const [isShow, setIsShow] = useState(false)
    const [itemList, setItemList] = useState([])
    let navigate = useNavigate()

    let userData = localStorage.getItem("userData")

    let dataDocument = localStorage.getItem("dataDocument")
    dataDocument = JSON.parse(dataDocument)

    let [dataFound, setDataFound] = useState([])
    let [searchValue, setSearchValue] = useState("");


    function findModuleByName(bookName, dataDocument) {
        if (!bookName) {
            return []
        }
        let res = [];

        bookName = bookName.normalize("NFKD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(" ", '')

        if (bookName.length < 1) {
            return
        }

        for (let e of dataDocument) {
            if (e.name.normalize("NFKD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(" ", '').includes(bookName)) {
                res.push(e)
            }
        }
        return res
    }

    function handleChange(e) {
        setSearchValue(e.target.value);
        setDataFound(findModuleByName(e.target.value, dataDocument))
    }

    function handleClickItem(e) {
        localStorage.setItem("descriptionBook", JSON.stringify(e))
        navigate("/desBook")
        setSearchValue("");
        setDataFound([]);
    }

    let htmlSpans = <div style={{ display: "flex", flexDirection: "column" }} className={styles.searchResults} >
        {dataFound.map((e, i) => {
            return <div className={styles.searchResultItem} key={i} onClick={() => { handleClickItem(e) }}>
                <span >{e.name}</span>
                <div style={{ backgroundImage: `url(${e.image})`, height: "50px", width: "30px", backgroundSize: "contain", backgroundRepeat: "no-repeat", marginLeft: "10px" }} />
            </div>
        })}
    </div >

    async function showItemList() {
        setIsShow(true)
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
    }

    function hideItemList() {
        setIsShow(false)
    }
    function viewCart() {
        window.open("/cart");
    }

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.nav} >
                <div className={styles.logo} />
                <input type="text" className={styles.searchInput} placeholder="Nhập tên sản phẩm muốn tìm..." onChange={handleChange} value={searchValue} />
                {htmlSpans}
                <FaSearch className={styles.searchIcon} />
                <FaPhone className={styles.hotlineIcon} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "red", fontSize: "20px" }}>Hotline</span>
                    <span>199828129</span>
                </div>
                <div className={styles.cartIcon} onMouseEnter={showItemList} onMouseLeave={hideItemList}>
                    <FaCartArrowDown style={{ fontSize: '30px' }} />
                    <div className={styles.itemListContainer}
                        style={{
                            display: isShow ? "block" : "none"
                        }}
                    >
                        <div className={styles.items}>
                            <table border={0}>
                                <tr>
                                    <th>Tên sách</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                                {itemList.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>1</td>
                                            <td>{item.price}.000VNĐ</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        <button className={styles.cartViewBtn} onClick={viewCart}>Xem giỏ hàng</button>
                    </div>
                </div>
                <span>Giỏ Hàng</span>
            </div>
            <div style={{ height: "1px", backgroundColor: "black", width: "100%" }} />

        </div>

    )
}


export default HeaderNew
