import { useState } from "react"
import styles from "./AdminDashBoard.module.css"
import AdminHeader from "../../../componets/adminHeader/AdminHeader";
import DisplayBook from "./DisplayBook/DisplayBook";
import Book from "./DisplayBook/Book/Book";

function AdminDashBoard() {

    let [dataFile, setDataFile] = useState(null)

    function handleOnChangeInputFile(e) {
        setDataFile(e.target.value)
    }

    return (
        <>
            <div class="container">
                <AdminHeader />
                <DisplayBook />
            </div>
        </>
    )
}

export default AdminDashBoard