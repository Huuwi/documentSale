import { CiStar } from "react-icons/ci";
import styles from "./Book.module.css"

function Book(props) {
    let dataBook = props.dataBook
    let { author, description, documentId, filePath, image, name, price, quantitySold } = dataBook

    return (
        <div className={styles.bookWrapper}>
            <div className={styles.imageBook} style={{ backgroundImage: `url(${image})` }} />
            <h3 className={styles.name} style={{ textAlign: "center", margin: "3px 0px 3px 0px" }}>{name}</h3>
            <span className={styles.spanText} >Tác giả : {author}</span>
            <div className={styles.votes} style={{ margin: "3px 0px 3px 0px" }}>
                <CiStar style={{ backgroundColor: "yellow" }} />
            </div>
            <span className={styles.spanText} style={{ margin: "3px 0px 3px 0px" }}>Giá sản phẩm : {price}KVND</span>
            <span className={styles.spanText} style={{ margin: "3px 0px 3px 0px" }}>Số lượng đã bán : {quantitySold}</span>
        </div>
    )

}


export default Book

