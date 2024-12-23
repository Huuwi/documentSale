import styles from "./DescriptionBook.module.css"
import HeaderNew from "../../../componets/HeaderNew/HeaderNew"
import Footer from "../../../componets/footer/Footer"
import { FaCartPlus } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { FaRegStar } from "react-icons/fa";


function DescriptionBook() {

    let descriptionBook = localStorage.getItem("descriptionBook")
    descriptionBook = JSON.parse(descriptionBook)

    let age = useRef("")
    useEffect(() => {
        age.current = Math.floor(Math.random() * 20)
    }, [])


    function generateRandomString(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }



    return (
        <div className={styles.desWrapper}>
            <HeaderNew />
            <div className={styles.content} >

                <div className={styles.bookOrder}>
                    <div className={styles.image} style={{ backgroundImage: `url(${descriptionBook.image})` }} />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "40px" }}>
                        <button className={styles.btnAddCart}><FaCartPlus style={{ fontSize: "25px", margin: "5px" }} /> Thêm vào giỏ hàng</button>
                        <button className={styles.btnBuy}>Mua trực tiếp hàng</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "20px", flexDirection: "column", gap: "10px" }}>
                        <h3 style={{ color: "green" }} >Chính sách ưu đãi của TaoWork</h3>
                        <div style={{ display: "flex", alignItems: "center", color: "green" }}>
                            <FaTruck style={{ fontSize: "25px", margin: "5px" }} />
                            <span> Giao hàng miễn phí cho đơn hàng từ 50.000đ</span>
                        </div>
                        <div style={{ display: "flex", color: "green" }}>
                            <RiRefund2Fill style={{ fontSize: "25px", margin: "5px" }} />
                            <span> Chính sách đổi trả hợp lý , tiết kiệm</span>
                        </div>
                        <div style={{ display: "flex", color: "green" }}>
                            <FaMoneyBillAlt style={{ fontSize: "25px", margin: "5px" }} />
                            <span>Ưu đãi khi mua số lượng lớn</span>
                        </div>

                    </div>
                </div>

                <div className={styles.bookInf}>

                    <div className={styles.bookInfChild}>
                        <h1>
                            Tên sách :  {descriptionBook.name}
                        </h1>

                        <div style={{ display: "flex", gap: "200px" }} className={styles.mySpan} >
                            <span className={styles.mySpan} >
                                Nhà cung cấp : <span style={{ color: "red", fontWeight: "bold" }} className={styles.mySpan}>TaoWork</span>
                            </span>
                            <span>
                                Tác giả : <span style={{ color: "blue", fontWeight: "bold" }} className={styles.mySpan}>{descriptionBook.author}</span>
                            </span>
                        </div>

                        <div style={{ display: "flex", gap: "200px" }} >
                            <span className={styles.mySpan}>
                                Nhà Xuất Bản : <span style={{ color: "green", fontWeight: "bold" }} className={styles.mySpan} >King Đồng</span>
                            </span>
                            <span className={styles.mySpan}>
                                Độ tuổi : <span style={{ color: "orange", fontWeight: "bold" }} className={styles.mySpan} >{age.current}+</span>
                            </span>
                        </div>

                        <div style={{ display: "flex", gap: "2px", margin: "10px", alignItems: "center" }} >
                            <h3>Đánh giá : </h3>
                            <FaRegStar style={{ color: "red", fontSize: "20px", backgroundColor: "yellow" }} />
                            <FaRegStar style={{ color: "red", fontSize: "20px", backgroundColor: "yellow" }} />
                            <FaRegStar style={{ color: "red", fontSize: "20px", backgroundColor: "yellow" }} />
                            <FaRegStar style={{ color: "red", fontSize: "20px", backgroundColor: "yellow" }} />
                            <FaRegStar style={{ color: "red", fontSize: "20px", backgroundColor: "yellow" }} />
                        </div>
                        <h3 style={{ color: "red", fontWeight: "bold", margin: "9px" }} >Số lượng sách đã bán : {descriptionBook.quantitySold}</h3>


                        <div style={{ display: "flex", gap: "20px", margin: "5px", alignItems: "center" }} >
                            <h1 style={{ color: "rgb(51, 214, 206)", fontWeight: "bold", }} >
                                {descriptionBook.price}K VND
                            </h1>
                            <h3 style={{ color: "red", textDecoration: "line-through" }}>{descriptionBook.price * 2 + Math.floor(Math.random() * 300)}K VND</h3>
                            <h3 style={{ color: "white", backgroundColor: "red", padding: "5px", borderRadius: "5px" }} >
                                -50%
                            </h3>

                        </div>
                        <div style={{ height: "30px", backgroundColor: "#E8F3FE", color: "#2489F6", display: "flex", alignItems: "center", gap: "10px", margin: "10px", borderRadius: "5px" }} >
                            Ngày NXB dự kiến phát hành 03/01/2025
                        </div>
                    </div>


                    <div className={styles.bookInfChild2}>
                        <h2>Thông tin chi tiết</h2>
                        <ul>
                            <li>
                                <strong>Mã hàng:</strong> {generateRandomString(10)}
                            </li>
                            <li>
                                <strong>Dự Kiến Có Hàng:</strong> 03/01/2025
                            </li>
                            <li>
                                <strong>Ngày Dự Kiến Phát Hành:</strong> 03/01/2025
                            </li>
                            <li>
                                <strong>Độ Tuổi:</strong> {age.current}+
                            </li>
                            <li>
                                <strong>Tên Nhà Cung Cấp:</strong> CÔNG TY TNHH 1 THÀNH VIÊN TAO WORK
                            </li>
                            <li>
                                <strong>Tác giả:</strong> {descriptionBook.author}
                            </li>
                            <li>
                                <strong>NXB:</strong> King Đồng
                            </li>
                            <li>
                                <strong>Năm XB:</strong> 2024
                            </li>
                            <li>
                                <strong>Ngôn Ngữ:</strong> Tiếng Việt
                            </li>
                            <li>
                                <strong>Trọng lượng (gr):</strong> {Math.floor(Math.random() * 1000)}
                            </li>
                            <li>
                                <strong>Số trang:</strong>  {Math.floor(Math.random() * 200)}
                            </li>
                            <li>
                                <strong>Hình thức:</strong> Bìa Mềm
                            </li>
                        </ul>
                        <p>
                            <strong>Sản phẩm bán chạy nhất:</strong>{" "}
                            <a href="#">
                                Top 100 sản phẩm Truyện Tranh Việt Nam bán chạy của tháng
                            </a>
                        </p>
                        <p>
                            Giá sản phẩm trên TaoWork.com đã bao gồm thuế theo luật hiện hành. Bên
                            cạnh đó, tùy vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể
                            phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ
                            phí hàng cồng kềnh...
                        </p>
                        <p>
                            <strong>
                                Chính sách khuyến mãi trên TaoWork.com không áp dụng cho Hệ thống Nhà
                                sách TaoWork trên toàn quốc
                            </strong>
                        </p>
                    </div>







                </div>

            </div>
            <Footer />

        </div >
    )
}

export default DescriptionBook