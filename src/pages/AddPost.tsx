import React, { useState } from 'react';
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    title: "",
    author: "",
    category: "",
    date: "",
    imageUrl: "",
    content: "",
}

const authors = ["Jakub", "Marysia", "Mateusz"];
const categories = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5", "Cat6"];

const AddPost = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState<any | null>(null);
    const { title, author, category, date, imageUrl, content } = formValue;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!category)
            setCategoryErrMsg("Select a category!");
    };

    const onInputChange = (e: any) => {
        setFormValue({ ...formValue, title: e.target.value });
    };

    const onAuthorChange = (e: any) => {
        setFormValue({ ...formValue, author: e.target.value });
    };
    const onCategoryChange = (e: any) => {
        setCategoryErrMsg(null);
        setFormValue({ ...formValue, category: e.target.value });
    };
    const onDateChange = (e: any) => {
        setFormValue({ ...formValue, date: e.target.value });
    };

    const onImageUrlChange = (e: any) => {
        setFormValue({ ...formValue, imageUrl: e.target.value });
    }

    const onContentChange = (e: any) => {
        setFormValue({ ...formValue, content: e.target.value });
    };

    const clearValues = (e: any) => { };

    return (
        <MDBValidation className="row g-3" style={{ marginTop: "100px" }} noValidate onSubmit={handleSubmit}>
            <h2 className="fs-2 fw-bold">Add new post</h2>
            <div style={{ margin: "auto", display: "flex", width: "400px", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: " 10px" }}>
                <MDBInput style={{ width: "400px" }} value={title} name="title" type="text" onChange={onInputChange} required label="Title" />
                <select style={{ width: "400px" }} className="authors-dropdown" value={author} name="author" onChange={onAuthorChange} required>
                    <option>Select author</option>
                    {authors.map((author, index) => (
                        <option value={author} key={index}>
                            {author}
                        </option>
                    ))}
                </select>
                <select style={{ width: "400px" }} className="categories-dropdown" name="category" onChange={onCategoryChange} value={category} required>
                    <option>Select category</option>
                    {categories.map((category, index) => (
                        <option value={category} key={index}>
                            {category}
                        </option>
                    ))}
                </select>
                {categoryErrMsg && (
                    <div className="categoryErrorMsg">{categoryErrMsg}</div>
                )}
                <MDBInput style={{ width: "400px" }} value={date} name="date" type="date" onChange={onDateChange} required label="Date of publication" />
                <MDBInput style={{ width: "400px" }} value={imageUrl} name="image-url" type="text" onChange={onImageUrlChange} required label="Image url" />
                <MDBTextArea style={{ width: "400px", minHeight: "150px" }} value={content} name="content" onChange={onContentChange} required label="Content" />
                <span>
                    <MDBBtn style={{ margin: "10px", width: "120px" }} type="submit" color="primary">Add post</MDBBtn>
                    <MDBBtn style={{ margin: "10px", width: "120px" }} type="submit" color="danger" onClick={clearValues}>Cancel</MDBBtn>
                </span>

            </div>

        </MDBValidation >
    )
}

export default AddPost