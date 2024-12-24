import { useEffect, useState } from "react"
import styles from "./AdminHeader.module.css"
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Book from "../../pages/admin/adminDashBoard/DisplayBook/Book/Book";

function AdminHeader() {
    let navigate = useNavigate()

    let categoryAdminSelected = 0
    categoryAdminSelected = localStorage.getItem("categoryAdminSelected") || 0



    let styleSelected = {
        backgroundColor: "greenyellow"
    }

    function clickFirstCate() {
        localStorage.setItem("categoryAdminSelected", 0)
        navigate("/admin/DashBoard")
    }

    function clickSecondCate() {
        localStorage.setItem("categoryAdminSelected", 1)
        navigate("/admin/upload")
    }



    return (
        <div className={styles.headerWrapper}>

            <div className={styles.childElement} style={categoryAdminSelected == 0 ? styleSelected : {}} onClick={clickFirstCate}>
                <span className={styles.spanBookHaving}>Các sách hiện có</span>
            </div>

            <div className={styles.childElement} style={categoryAdminSelected == 1 ? styleSelected : {}} onClick={clickSecondCate}  >
                <span className={styles.spanYourLib}>Thêm sách</span>
            </div>

        </div>
    )

}

export default AdminHeader