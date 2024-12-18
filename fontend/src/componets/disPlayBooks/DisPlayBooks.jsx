import Book from "./Book/Book"
import styles from "./DisPlayBooks.module.css"


function DisPlayBooks({ dataDisPlay }) {

    let htmlDiv = dataDisPlay.map((e) => {
        return <Book dataBook={e} />
    })


    return (
        <div className={styles.disPlayWrapper}>
            {htmlDiv}
        </div>
    )
}


export default DisPlayBooks