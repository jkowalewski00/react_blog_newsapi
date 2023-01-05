import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {MDBRow, MDBCol, MDBContainer, MDBTypography} from "mdb-react-ui-kit"
import { toast } from 'react-toastify';
import Posts from "../components/Posts";
import { title } from 'process';
import Search from '../components/Search';
import Category from '../components/Category';
import LatestPosts from '../components/LatestPosts';
import Pagination from '../components/Pagination';

const Home = () => {
    const [data, setData] = useState([]);
    const [latestPost, setLatestPost] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPost, setTotalPost] = useState(null);
    const [pageLimit] = useState(5);

    const categories = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5", "Cat6"];

    useEffect(() =>{
        loadPostsData();
        fetchLatestBlog();
    }, []
        )

    const loadPostsData = async () => {
        const response = await axios.get(`http://localhost:5000/posts`);
        if(response.status === 200){
            setData(response.data);
            // setCurrentPage(currentPage + increase);
        }
        else(
            toast.error("Something went wrong!")
        )
    };

    const fetchLatestBlog = async () => {
        const totalPost = await axios.get("http://localhost:5000/posts");
        setTotalPost(totalPost.data.length);
        const start = totalPost.data.length - 4;
        const end = totalPost.data.length;
        const response = await axios.get(`http://localhost:5000/posts?_start=${start}&_end=${end}`);
        if(response.status === 200){
            setLatestPost(response.data);
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
                    <h4 className="text-start">Latest posts</h4>
                    {latestPost && latestPost.map((item:any, index:any) => (
                        <LatestPosts key={index} {...item}/>
                    ))}
                    <Category options={categories} handleCategory={handleCategory}/>
                </MDBCol>
            </MDBRow>
            {/* <div className="mt-3">
                <Pagination currentPage={currentPage} loadPostData={loadPostsData} pageLimit={pageLimit} data={data} totalPost={totalPost}/>
            </div> */}
        </>
    )
}

export default Home