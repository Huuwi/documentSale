import styles from "./Footer.module.css"
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";



function Footer() {

    return (
        <div className={styles.wrapperFooter}>
            <div className={styles.description}>
                <div className={styles.logo} />
                <p>
                    Lầu 500 góc, 39987-39989 Trần Duy Hưng New York America Công Ty TNHH Anh mất em thật rồi TWORK <br /> TP HCM - TWORK - 62 Lê Lợi, Quận New York, Bang texas, Việt Nam <br />Taowork.com nhận đặt hàng trực tuyến và giao hàng tận nơi.<br /> Hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả <br /> Hệ Thống TaoWork trên toàn quốc.
                </p>

                <h2 style={{ color: "red", padding: "10px" }} >Liên hệ với chúng tôi</h2>
                <div className={styles.listIcon}>
                    <FaFacebook className={styles.icon} />
                    <FaYoutube className={styles.icon} />
                    <FaGithub className={styles.icon} />
                </div>

            </div>
            <div className={styles.services}>
                <h1 style={{ marginBottom: "20px", color: "red" }} >Dịch vụ liên kết</h1>

                <div className={styles.rowImg} >
                    <div className={styles.logoImage} style={{ backgroundImage: `url(https://cdn.dribbble.com/users/2209674/screenshots/12286672/media/250aa4be7dfb0acd9703e4be5fe3f7a5.png?compress=1&resize=800x600&vertical=top)` }} />
                    <div className={styles.logoImage} style={{ backgroundImage: `url(https://logos-world.net/wp-content/uploads/2020/10/Tesla-Emblem.png)` }} />
                    <div className={styles.logoImage} style={{ backgroundImage: `url(https://rentapartment.vn/wp-content/uploads/2021/05/Vietcombank-open-account.jpg)` }} />
                </div>

                <div className={styles.rowImg} >
                    <div className={styles.logoImage} style={{ backgroundImage: `url(https://th.bing.com/th/id/OIP.haNKV4OX4KXSGZiqws2WCAHaEo?rs=1&pid=ImgDetMain)` }} />
                    <div className={styles.logoImage} style={{ backgroundImage: `url(https://logos-download.com/wp-content/uploads/2022/01/Viettel_Logo_white.png)` }} />
                    <div className={styles.logoImage} style={{ backgroundImage: `url(https://th.bing.com/th/id/R.2baa6d5a6d2ea58f84773f3b9ce58ea4?rik=B%2b03Mlc5hh%2bUdg&riu=http%3a%2f%2fwww.carlogos.org%2flogo%2fFerrari-logo-2560x1440.png&ehk=YJ5%2bCl2uZiOjCuw94EfGmBVENVaC77fr7tBYTft3IOM%3d&risl=&pid=ImgRaw&r=0)` }} />
                </div>

            </div>

        </div>
    )
}

export default Footer