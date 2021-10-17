import React, { useState } from "react";
import axios from 'axios';

//const API_BASE = "http://localhost:8123/api"
const API_URL = "https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/upload"



function submitForm(contentType, data, setResponse) {

  axios({
    //url: `${API_BASE}/apiupload.php`,
    url: `${API_URL}`,
    method: 'POST',
    mode: 'no-cors', 
    data: data,
    headers: {
    'Content-Type': contentType
    }
  }).then((response) => {
    setResponse(response.data);
  }).catch((error) => {
    setResponse("error");
  })
}

const TestUpload = ({ handleSubmit, history }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
 
  function postDataNew()
  {
  }
  
  function uploadWithFormData(){
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("desc", desc);
    submitForm("multipart/form-data", formData, (msg) => console.log(msg));    
  }
 
    async function uploadWithJSON(){
        const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
        const data = {
          title: title,
          file: await toBase64(file),
          desc: desc
          }
        submitForm("application/json", data, (msg) => console.log(msg));
      }

  return (
    <div className="App">
      <h2>Upload Form</h2>
      <form>
        <label>
          File Title
          <input type="text" vaue={title} 
          onChange={(e) => { setTitle(e.target.value )}} 
          placeholder="Give a title to your upload" />
        </label>

        <label>
          File
          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>

        <label>
          Description
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
        </label>

        <input type="button" value="Upload as Form" onClick={uploadWithFormData} />
        <input type="button" value="Upload as JSON" onClick={uploadWithJSON}/>
        <input type="button" value="Post New" onClick={postDataNew}/>
        
      </form>
    </div>
  );
};

export default TestUpload;
