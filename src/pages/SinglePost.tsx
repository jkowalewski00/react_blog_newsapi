import React, {useState, useEffect} from 'react';
import {MDBIcon, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardText, MDBCardTitle, MDBCardBody, MDBCardImage, MDBTypography} from "mdb-react-ui-kit";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';


const SinglePost = () => {
    const [post, setPost] = useState<any | null>(null);
    const {id} = useParams();

    useEffect(() =>  {
        if(id){
            getSinglePost();
        }
    }, [id]);

const getSinglePost = async () => {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    if(response.status === 200){
        setPost(response.data);
    }
    else{
        toast.error("Something went wrong!");
    }
    
};

const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px" 
}

    return (
        <MDBContainer style={{border: "1px solid #d1ebe8"  }}>
            <Link to="/">
                <strong style={{float: "left", color: "black" }} className="mt-3">
                    Go back
                </strong>
            </Link>
            <MDBTypography tag="h2" className="text-muted mt-2" style={{display: "inline-block"}}>
                {post && post.title}
            </MDBTypography>
            <img src={post && post.imageUrl} className="img-fluid rounded" alt={post && post.title} style={{width:"90%", maxHeight: "600px", }}/>
            <div style={{marginTop: "20px"}}>
                <div style={{height: "43px", background: "#f6f6f6"}}>
                    <MDBIcon
                    style={{float: "left"}}
                    className="mt-3"
                    far 
                    icon="calendar-alt"
                    size="lg"
                    />
                    <strong style={{float: "left", marginTop: "12px", marginLeft: "2px"}}>
                        {post && post.date}
                    </strong>
                    <p style={{display: "inline", marginLeft: "5px", float: "right",marginTop: "7px" }}>Author: {post && post.author}</p>
                    <p style={{display: "inline", marginLeft: "5px", float: "right",marginTop: "7px" }}>Category: {post && post.category}</p>
                </div>
                <MDBTypography classNAme="lead md-0">
                    {post && post.content}
                </MDBTypography>
            </div>
        </MDBContainer>
    )
}

export default SinglePost;