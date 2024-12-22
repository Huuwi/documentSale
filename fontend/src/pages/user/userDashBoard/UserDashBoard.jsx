import styles from "./UserDashBoard.module.css"
import HeaderNew from "../../../componets/HeaderNew/HeaderNew";
import { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import axios from "axios"
import Book from "../../../componets/disPlayBooks/Book/Book";
import { use } from "react";
import DisPlayBooks from "../../../componets/disPlayBooks/disPlayBooks";
import Footer from "../../../componets/footer/Footer";


function UserDashBoard() {

    let folderBanner = "../src/assets/banner/"
    let bannerPaths = [folderBanner + "banner1.png", folderBanner + "banner2.png", folderBanner + "banner3.png", folderBanner + "banner4.png", folderBanner + "banner5.png", folderBanner + "banner6.png"]
    let [dataDisPlay, setDataDisPlay] = useState([])
    let dataDocument = localStorage.getItem("dataDocument")

    try {
        dataDocument = JSON.parse(dataDocument)
    } catch (error) {
        console.log("Không có dữ liệu sách : ", error);
    }

    const [type, setType] = useState(0)

    const [displayType, setDisPlayType] = useState(false)

    let [bannerUse, setBannerUse] = useState(0)

    let types = ["Tất cả", "Sách lý thuyết", "Sách thực hành", "Báo cáo thực nghiệm", "Giáo trình các trường đại học"]

    function changeType(i) {
        setType(i)
    }

    let typeComponets = <div style={{ display: "flex", flexDirection: "column" }}>
        {types.map((e, i) => {
            return <span onClick={() => { changeType(i) }} onMouseEnter={handleHoverType} onMouseLeave={handleOutHoverType} key={i} className={styles.type} style={{ padding: "10px", fontSize: "20px", borderBottom: "1px black solid", borderRadius: "3px", marginBottom: "1px" }} >{e}</span>
        })}
    </div>

    function handleHoverType() {
        setDisPlayType(true)
    }

    function handleOutHoverType() {
        setDisPlayType(false)
    }

    useEffect(() => {

        setTimeout(() => {
            setBannerUse(bannerUse + 1)
        }, 1000)

    }, [bannerUse])

    useEffect(() => {

        if (!dataDocument?.length) {
            return
        }

        switch (type) {
            case 0:
                setDataDisPlay(dataDocument)
                break;
            case 1:
                setDataDisPlay(dataDocument.filter((e) => { return e.type == 1 }))
                break;
            case 2:
                setDataDisPlay(dataDocument.filter((e) => { return e.type == 2 }))
                break;
            case 3:
                setDataDisPlay(dataDocument.filter((e) => { return e.type == 3 }))
                break;
            case 4:
                setDataDisPlay(dataDocument.filter((e) => { return e.type == 4 }))
                break;
            default:
                setDataDisPlay(dataDocument)
                break;
        }

    }, [type])



    useEffect(() => {

        const fetchData = async () => {
            try {
                let res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getAllDocument", {}, { withCredentials: true })
                let dataDocument = res.data.dataDocument
                localStorage.setItem("dataDocument", JSON.stringify(dataDocument))
            } catch (error) {
                alert(error.response?.data?.message || "An error occurred.");
            }
        }
        fetchData()

    }, [])

    return (
        <div className={styles.wrapper}>
            <HeaderNew />
            <div className={styles.content}>
                <div className={styles.bannerContainer}>
                    <div className={styles.typeContainer} >
                        <div className={styles.moreIconContainer} onMouseEnter={handleHoverType} onMouseLeave={handleOutHoverType}>
                            <CgDetailsMore className={styles.moreIcon} />
                            <span className={styles.spanType}>Danh Mục Sách</span>
                        </div>
                        {!displayType ? <></> : typeComponets}
                    </div>
                    <div className={styles.banner} style={{ backgroundImage: `url(${bannerPaths[bannerUse % bannerPaths.length]})`, backgroundRepeat: "no-repeat", backgroundSize: "contain" }} />
                    <div className={styles.banner} style={{ backgroundImage: `url(${bannerPaths[(bannerUse + Math.floor(Math.random() * 3)) % bannerPaths.length]})`, backgroundRepeat: "no-repeat", backgroundSize: "contain" }} />

                </div>
                <DisPlayBooks dataDisPlay={dataDisPlay} />
            </div>
            <Footer />

        </div>

    )

}


export default UserDashBoard