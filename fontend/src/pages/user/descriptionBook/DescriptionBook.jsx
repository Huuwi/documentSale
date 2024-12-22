import styles from "./DescriptionBook.module.css"
import HeaderNew from "../../../componets/HeaderNew/HeaderNew"
import Footer from "../../../componets/footer/Footer"

function DescriptionBook() {

    return (
        <div className={styles.desWrapper}>
            <HeaderNew />
            <div className={styles.content} >

                <div className={styles.bookOrder}>
                    <div className={styles.image} />
                </div>

                <div className={styles.bookInf}>

                </div>

            </div>
            <Footer />

        </div>
    )
}

export default DescriptionBook