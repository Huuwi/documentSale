import { CiStar } from "react-icons/ci";
import styles from "./Book.module.css"
import { useNavigate } from "react-router-dom";

function Book(props) {
    let navigate = useNavigate()
    let dataBook = props.dataBook
    let { author, description, documentId, filePath, image, name, price, quantitySold } = dataBook


    function handleClickDes() {
        localStorage.setItem("descriptionBook", JSON.stringify({ author, description, documentId, filePath, image, name, price, quantitySold }))
        navigate("/desBook")
    }


    return (
        <div className={styles.bookWrapper} onClick={handleClickDes} >
            <div className={styles.imageBook} style={{ backgroundImage: `url(${image})` }} />
            <h3 className={styles.name} style={{ textAlign: "center", margin: "3px 0px 3px 0px" }}>{name}</h3>
            <span className={styles.spanText} >Tác giả : {author}</span>
            <div className={styles.votes} style={{ margin: "3px 0px 3px 0px" }}>
                <CiStar style={{}} />
                <CiStar style={{}} />
                <CiStar style={{}} />
                <CiStar style={{}} />
                <CiStar style={{}} />
            </div>
            <span className={styles.spanText} style={{ margin: "3px 0px 3px 0px" }}>Giá sản phẩm : {price}KVND</span>
            <span className={styles.spanText} style={{ margin: "3px 0px 3px 0px" }}>Số lượng đã bán : {quantitySold}</span>
        </div>
    )

}


export default Book

