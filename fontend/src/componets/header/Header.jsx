import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate()
    let userData = localStorage.getItem("userData")
    let [nickName, setNickName] = useState("")
    let [balance, setBalance] = useState(0)

    useEffect(() => {
        if (!userData) {
            navigate("/login")
        }
        else {
            userData = JSON.parse(userData)
            setBalance(userData.balance)
            setNickName(userData.nickName)
        }
    }, [nickName, balance])

    let categorySelected = localStorage.getItem("categorySelected") || 0


    let [hoverAccountInfor, setHoverAccountInfor] = useState(false)

    let styleSelected = {
        backgroundColor: "greenyellow"
    }

    function handleHover() {
        setHoverAccountInfor(true)
    }

    function clickFirstCate() {
        localStorage.setItem("categorySelected", 0)
        navigate("/dashBoard")
    }

    function clickSecondCate() {
        localStorage.setItem("categorySelected", 1)
        navigate("/getBoughtDocument")
    }


    function clickThirdCate() {
        localStorage.setItem("categorySelected", 2)
        navigate("/payment")
    }

    function clickFourCate() {
        localStorage.setItem("categorySelected", 3)
        navigate("/dashBoard")
    }

    function clickFiveCate() {
        localStorage.setItem("categorySelected", 3)
        navigate("/login")
    }


    return (
        <div className={styles.headerWrapper}>

            <div className={styles.childElement} style={categorySelected == 0 ? styleSelected : {}} onClick={clickFirstCate}>
                <span className={styles.spanBookHaving}>Các sách hiện có</span>
            </div>

            <div className={styles.childElement} style={categorySelected == 1 ? styleSelected : {}} onClick={clickSecondCate}  >
                <span className={styles.spanYourLib}>Thư viện sách của bạn</span>
            </div>

            <div className={styles.childElement} style={categorySelected == 2 ? styleSelected : {}} onClick={clickThirdCate}>
                <span className={styles.spanPayMent}>Nạp tiền</span>
            </div>

            <div>
                <div className={styles.childElement} style={categorySelected == 3 ? styleSelected : {}} onMouseEnter={handleHover} onMouseLeave={() => { setHoverAccountInfor(false) }} onClick={clickFourCate} >
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }} >
                        <FaUserCircle className={styles.iconUser} />
                        <span style={{ padding: "5px", minWidth: "200px" }}>Xin chào : {nickName} | Số dư : {balance}</span>
                    </div>
                </div>
                {
                    !hoverAccountInfor ? <div />
                        : <div style={{ display: "flex", flexDirection: "column" }}>
                            <span className={styles.spanPayMent} onMouseEnter={handleHover} onMouseLeave={() => { setHoverAccountInfor(false) }} onClick={clickFiveCate}>Đăng xuất</span>
                            <span className={styles.spanPayMent} onMouseEnter={handleHover} onMouseLeave={() => { setHoverAccountInfor(false) }} onClick={clickFourCate}>Tài khoản của tôi</span>
                        </div>
                }
            </div>

        </div>
    )

}

export default Header