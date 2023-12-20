import { getStorage, ref, uploadBytes } from "firebase/storage"
import { useState } from 'react'
import PropTypes from 'prop-types'
import ShortUniqueId from 'short-unique-id';

export const storageReference = (directory) => {
    return (filename) => {
        const storage = getStorage()
        const storageRef = ref(storage, `${directory}/${filename}`)
        return (file) => {
            uploadBytes(storageRef, file).then((snapshot) => {
                const resultObject = {
                    ref: snapshot.ref,
                }
                console.log(resultObject)
                return resultObject;
            })
        }
    }
}
const imgRef = storageReference("images")


const FileUpload = (props) => {
    const [fileStatus, setFileStatus] = useState("")
    const [uploadedFile, setUploadedFile] = useState()
    const [buttonStatus, setButtonStatus] = useState(false)
    const uid = new ShortUniqueId({ length: 10 })

    const fileTypes = {
        image: ".jpg,.jpeg,.gif,.png,.bmp"
    }

    const fileRegex = {
        image: /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i
    }

    const fileMIMEtypes = {
        image: ["image/png", "image/jpeg", "image/gif", "image/bmp"]
    }

    const fileError = (errorString) => {
        setFileStatus(errorString)
        setButtonStatus(false)
        setUploadedFile()
    }

    const handleFileUpload = (e) => {
        e.preventDefault()
        setButtonStatus(true)
        if (!uploadedFile) {
            fileError(`Please select a valid ${props.fileTypes} file before uploading`)
        } else if (uploadedFile.size > (props.maxMB * 1048576)) {
            fileError(`Please choose a file less than ${props.maxMB} MB`)
        } else if (!fileMIMEtypes[props.fileTypes].includes(uploadedFile.type) && !uploadedFile.name.match(fileRegex[props.fileTypes])) {
            fileError(`Your chosen file is not a valid ${props.fileTypes}`)
        } else if (fileMIMEtypes[props.fileTypes].includes(uploadedFile.type) && uploadedFile.name.match(fileRegex[props.fileTypes])) {
            const rnd = uid.rnd()
            const extension = uploadedFile.name.match(fileRegex[props.fileTypes])[0]
            const name = rnd.concat(extension)
            console.log(name)
            const newFile = new File([uploadedFile], name, { type: uploadedFile.type })
            imgRef(name)(newFile)
        }
    }



    return (
        <>
            <label htmlFor="fileUpload">{props.labelText}</label>
            <input
                name="fileInput"
                id="fileInput"
                type="file"
                accept={fileTypes[props.fileTypes]}
                onChange={(e) => {
                    const file = e.target.files[0]
                    setUploadedFile(file)
                }}></input>
            <button id="uploadButton" type="submit"
                onClick={(e) => handleFileUpload(e)}
                disabled={buttonStatus}>Upload File</button>
            <p>{fileStatus}</p>
        </>
    )
}

FileUpload.propTypes = {
    labelText: PropTypes.string,
    fileTypes: PropTypes.string,
    maxMB: PropTypes.number,
}

export default FileUpload