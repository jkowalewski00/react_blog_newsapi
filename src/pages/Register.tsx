import React, { useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userInfo } from "os";
import validation from "../components/RegisterValidator";

// const Register = () => {
//     const [formValue, setFormValue] = useState<UserType>({
//         name: "",
//         username: "",
//         email: "",
//         password: "",
//         role: "user",
//     });

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const handleFormSubmit = (e: any) => {

//     }
//     const postUser = (user: UserType) => {
//         axios.post("http://localhost:5000/users", {
//             name: user.name,
//             username: user.username,
//             email: user.email,
//             password: user.password,
//             role: "user",
//         })
//             .then((res) => {
//                 setFormValue(res.data);
//             })
//             .catch(err => {
//                 console.error("Error fetching: ", err);
//                 setError(error);
//             })
//         // navigate("/");
//     }

//     const handleInput = (value: string, name: string) => {
//         setFormValue((formValue) => ({
//             ...formValue, [name]: value
//         }))
//     }

//     const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
//         handleInput(event.currentTarget.value, event.currentTarget.name)
//     }

//     return (
//         <>
//             <div className="container">
//                 <form method="POST">
//                     <label htmlFor="name" className="form-label">Name</label>
//                     <input type="text" name="name" className="form-control" placeholder="Put your name here..." onChange={handleOnChange} />
//                     <label htmlFor="username" className="form-label">Username</label>
//                     <input type="text" name="username" className="form-control" placeholder="Put your username here..." onChange={handleOnChange} />
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input type="email" name="email" className="form-control" placeholder="Put you email here..." onChange={handleOnChange} />
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" name="password" className="form-control" placeholder="Put your password here..." onChange={handleOnChange} />
//                     {/* <label htmlFor="confirm-password" className="form-label">Confirm password</label>
//                     <input type="password" name="confirm-password" className="form-control" placeholder="Confirm your password here..." onChange={handleOnChange} /> */}
//                     <input type="submit" value="Submit" className="btn btn-secondary" onClick={handleFormSubmit} />
//                 </form>
//             </div>
//             <div className="container">
//                 <p>You already have an account? Click <a href="/login">here </a>to log in!</p>
//             </div>
//         </>
//     )
// }


const Register = () => {
    const [formValue, setFormValue] = useState<UserType>({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "user",
    });

    const [errors, setErrors] = useState<UserType>({
        name: "",
        username: "",
        email: "",
        password: "",
        role: ""
    });


    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
            [e.target.username]: e.target.value,
            [e.target.email]: e.target.email,
            [e.target.password]: e.target.password,
            [e.target.role]: e.target.role,
        });
    }

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        setErrors(validation(formValue));
        const postData = { ...formValue };

        if (errors.name === '' && errors.username === '' && errors.email === '' && errors.password === '') {
            console.log("Brak bledow");

            const response = axios.post("http://localhost:5000/users", postData);

            setFormValue({
                name: "",
                username: "",
                email: "",
                password: "",
                role: "user",
            });
        }


        // if (response.status === 201)
        //     toast.success("Post created successfully!");
        // else
        //     toast.error("Something went wrong!");


        //navigate("/");
    }

    return (
        <>
            <div className="container">
                <form method="POST">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Put your name here..." value={formValue.name}
                        onChange={handleChange} />
                    {errors.name && <p>{errors.name}</p>}
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Put your username here..." value={formValue.username} onChange={handleChange} />
                    {errors.username && <p>{errors.username}</p>}
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Put you email here..." value={formValue.email} onChange={handleChange} />
                    {errors.email && <p>{errors.email}</p>}
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Put your password here..." value={formValue.password} onChange={handleChange} />
                    {errors.password && <p>{errors.password}</p>}
                    {/* <label htmlFor="confirm-password" className="form-label">Confirm password</label>
                    <input type="password" name="confirm-password" className="form-control" placeholder="Confirm your password here..." onChange={handleOnChange} /> */}
                    <input type="text" name="role" value="user" onChange={handleChange} hidden></input>
                    <button type="submit" className="btn btn-secondary" onClick={handleFormSubmit}>Register</button>
                </form>
            </div>
            <div className="container">
                <p>You already have an account? Click <a href="/login">here </a>to log in!</p>
            </div>
        </>
    )
}

export default Register;
