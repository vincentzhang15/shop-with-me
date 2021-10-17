import React from 'react';
import axios from 'axios';

class TestUpload extends React.Component {

    constructor(props) {    
            super(props);    
            this.state = {    
                    file: '',    
        };    
    }

    async submit(e) {    
        e.preventDefault();    
        //const url = `http://localhost:8123/api/apiupload.php`;   
        const url = "https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/upload?authuser=0";

        const formData = new FormData();    
        formData.append('body', this.state.file);    
        const config = {    
            headers: {    
                'content-type': 'multipart/form-data',
                'token': 'xxx'                
            },
        };
        /*
        const HTTP = axios.create({
            withCredentials: true
        });
        */
        const HTTP = axios.create();

        //return post(url, formData, config);
        return HTTP.post(url, formData, config);
    }
    setFile(e) {    
        this.setState({ file: e.target.files[0] });    
    }

    render() {    
        return (    
                <div className="container-fluid">    
                        <form onSubmit={e => this.submit(e)}>    
                                <div className="col-sm-12 btn btn-primary">    
                                        File Upload    
                        </div>    
                                <h1>File Upload</h1>    
                                <input type="file" onChange={e => this.setFile(e)} />    
                                <button className="btn btn-primary" type="submit">Upload</button>    
                        </form>    
                </div>    
        )    
    }
}
export default TestUpload