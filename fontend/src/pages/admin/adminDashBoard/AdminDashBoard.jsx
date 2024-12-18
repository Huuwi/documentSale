import { useState } from "react"
import styles from "./AdminDashBoard.module.css"

function AdminDashBoard() {

    let [dataFile, setDataFile] = useState(null)

    console.log(dataFile);
    function handleOnChangeInputFile(e) {
        setDataFile(e.target.value)
    }

    return (
        <>
            <div class="container">
                <h1>File Upload</h1>
                <form id='form'>
                    <div class="input-group">
                        <label for='name'>Your name</label>
                        <input name='name' id='name' placeholder="Enter your name" />
                    </div>
                    <div class="input-group">
                        <label for='files'>Select files</label>
                        <input id='files' type="file" multiple onChange={handleOnChangeInputFile} />
                    </div>
                    <button class="submit-btn" type='submit'>Upload</button>
                </form>
            </div>
        </>
    )
}

export default AdminDashBoard