import { useEffect, useState } from "react"
import styles from "./Library.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoCloudDownloadSharp } from "react-icons/io5";
import HeaderNew from "../HeaderNew/HeaderNew";

function Library() {
    const [itemList, setItemList] = useState([])
    let navigate = useNavigate()

    console.log(itemList);


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

    async function handleDownload(documentId) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/downloadDocument`,
                { documentId },
                {
                    responseType: 'blob',
                    withCredentials: true,
                }
            );

            // Lấy Content-Type từ header
            const contentType = response.headers['content-type'];

            // Xác định phần mở rộng của file từ Content-Type
            let fileExtension = '';
            let fileName = 'TaoWork_download_file' + Date.now(); // Tên mặc định của file 

            // Kiểm tra loại file và gán phần mở rộng tương ứng
            if (contentType === 'application/pdf') {
                fileExtension = '.pdf';
            } else if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                fileExtension = '.docx';
            } else if (contentType === 'image/jpeg') {
                fileExtension = '.jpg';
            } else if (contentType === 'image/png') {
                fileExtension = '.png';
            } else {
                fileExtension = '.bin';  // Nếu không nhận diện được định dạng, đặt là .bin
            }


            fileName += fileExtension;

            // Tạo Blob URL và tải file về
            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            console.log(url);

            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', fileName);  // Đặt tên file cho việc tải xuống
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);  // Xóa link sau khi tải xuống
        } catch (error) {
            console.error('Download error:', error);
            alert('Có lỗi xảy ra khi tải file: ' + error.message);
        }
    }


    return (
        <div className={styles.libraryContainer}>
            <HeaderNew />
            <div className={styles.cartContent}>
                <p>Danh sách sản phẩm đã mua</p>
                <div className={styles.title}>
                    <p className={styles.desc}>Ảnh Sách</p>
                    <p className={styles.count}>Số Lượng</p>
                    <p className={styles.money}>Giá Đã Mua</p>
                </div>
                <div className={styles.allItem}>
                    {itemList.map((item, i) => {
                        return (
                            <div className={styles.item} key={i}>
                                <div className={styles.itemPic} style={{
                                    backgroundImage: `url(${item.image})`
                                }}></div>
                                <div className={styles.itemName}><h2> Tên sách : {item.name}</h2></div>
                                <div className={styles.itemCount}><p>1</p></div>
                                <div className={styles.itemMoney}><p>{item.price}.000VNĐ</p></div>
                                <IoCloudDownloadSharp onClick={() => { handleDownload(item.documentId) }} style={{ height: '100%', cursor: 'pointer', marginLeft: '20px', marginTop: '5px', fontSize: "30px", color: "red" }} />
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