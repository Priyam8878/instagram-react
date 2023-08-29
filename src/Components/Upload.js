
import axios from "axios";


import React, { useState } from 'react';
import AWS from "aws-sdk";

const Upload = ()=>{

    const [file, setFile] = useState("");
    const [imgLink, setImgLink] = useState("")
     

    console.log(process.env.REACT_APP_AWS_ACCESS_KEY_ID)

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY_ID,
        region: process.env.REACT_APP_AWS_REGION
    }) 

    async function uploadFile() {
        const s3 = new AWS.S3()
        let filename = `${Date.now()}-${file.name}`
        try{
            const response  =  await s3.putObject({
                Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
                Key: filename,
                Body: file,
                ContentType: file.type,
            }).promise()
            setImgLink(`https://accio-unstopable.s3.ap-south-1.amazonaws.com/${filename}`)
            console.log(response)
        }
        catch(error){
                console.log(error.message)
        }
    }


    return(
        <div>
              <input type="file" 
                 onChange={e => setFile(e.target.files[0])}
              />
             <button onClick={uploadFile}>Upload Image</button>

             {
                    imgLink && <img src={imgLink} alt="uploaded" />
             }

        </div>
    )
}
export default Upload