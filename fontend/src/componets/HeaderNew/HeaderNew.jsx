import styles from "./HeaderNew.module.css"
import Header from "../header/Header"
import { FaSearch } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderNew() {
    let navigate = useNavigate()

    let dataDocument = localStorage.getItem("dataDocument")
    dataDocument = JSON.parse(dataDocument)

    let [dataFound, setDataFound] = useState([])

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
        setDataFound(findModuleByName(e.target.value, dataDocument))
    }

    function handleClickItem(e) {
        localStorage.setItem("descriptionBook", JSON.stringify(e))
        navigate("/desBook")
    }

    let htmlSpans = <div style={{ display: "flex", flexDirection: "column" }} className={styles.searchResults} >
        {dataFound.map((e, i) => {
            return <div className={styles.searchResultItem} key={i} onClick={() => { handleClickItem(e) }}>
                <span >{e.name}</span>
                <div style={{ backgroundImage: `url(${e.image})`, height: "50px", width: "30px", backgroundSize: "contain", backgroundRepeat: "no-repeat", marginLeft: "10px" }} />
            </div>
        })}
    </div >

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.nav} >
                <div className={styles.logo} />
                <input type="text" className={styles.searchInput} placeholder="Nhập tên sản phẩm muốn tìm..." onChange={handleChange} />
                {htmlSpans}
                <FaSearch className={styles.searchIcon} />
                <FaPhone className={styles.hotlineIcon} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "red", fontSize: "20px" }}>Hotline</span>
                    <span>199828129</span>
                </div>
                <FaCartArrowDown className={styles.cartIcon} />
                <span>Giỏ Hàng</span>
            </div>
            <div style={{ height: "1px", backgroundColor: "black", width: "100%" }} />
        </div>

    )
}


export default HeaderNew
