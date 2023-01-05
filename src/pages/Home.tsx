import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {MDBRow, MDBCol, MDBContainer, MDBTypography} from "mdb-react-ui-kit"
import { toast } from 'react-toastify';
import Posts from "../components/Posts";
import { title } from 'process';
import Search from '../components/Search';
import Category from '../components/Category';

const Home = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const categories = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5", "Cat6"];

    useEffect(() =>{
        loadPostsData();
    }, []
        )

    const loadPostsData = async () => {
        const response = await axios.get("http://localhost:5000/posts");
        if(response.status === 200){
            setData(response.data);
        }
        else(
            toast.error("Something went wrong!")
        )
    };

    console.log("data", data)

    const handleDelete = async (id:number) => {
        if(window.confirm("Are you sure that you want to delete that post?")){
            const response = await axios.delete(`http://localhost:5000/posts/${id}`);
            if(response.status === 200){
                window.confirm("Post deleted successfully!")
                loadPostsData();
            }
            else(
                toast.error("Something went wrong!")
            )
        }
    };

    const excerpt = (str:string) => {
        let len:number = str.length;
        if(len > 50){
            str = str.substring(0, 50) + " ... "
        }

        return str;
    };

    const onInputChange = (e:any) => {
        if(!e.target.value){
            loadPostsData();
        }
        setSearchValue(e.target.value); 
    };

    const handleSearch = async (e:any) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:5000/posts?q=${searchValue}`);
        if(response.status === 200){
            setData(response.data);
        }else {
            toast.error("Something went wrong!");
        }
    };

    const handleCategory = async (category:any) => {
        const response = await axios.get(`http://localhost:5000/posts?category=${category}`);
        if(response.status === 200){
            setData(response.data);
        } else {
            toast.error("Something went wrong!");
        }
    };
    
    return (
        <>
            <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No posts found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow>
                            {data && data.map((item:any, index) => (
                                <Posts 
                                key={index}
                                {...item}
                                excerpt={excerpt}
                                handleDelete={handleDelete}
                                />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
                <MDBCol size="3">
                    <Category options={categories} handleCategory={handleCategory}/>
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default Home