import React, { useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userInfo } from "os";

const Register = () => {
    const [formValue, setFormValue] = useState<UserType>({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "user",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const postUser = (user: UserType) => {
        axios.post("http://localhost:5000/users", {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            role: "user",
        })
            .then((res) => {
                setFormValue(res.data);
            })
            .catch(err => {
                console.error("Error fetching: ", err);
                setError(error);
            })
        // navigate("/");
    }

    const handleInput = (value: string, name: string) => {
        setFormValue((formValue) => ({
            ...formValue, [name]: value
        }))
    }

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        handleInput(event.currentTarget.value, event.currentTarget.name)
    }

    return (
        <>
            <div className="container">
                <form method="POST">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Put your name here..." onChange={handleOnChange} />
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Put your username here..." onChange={handleOnChange} />
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Put you email here..." onChange={handleOnChange} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Put your password here..." onChange={handleOnChange} />
                    {/* <label htmlFor="confirm-password" className="form-label">Confirm password</label>
                    <input type="password" name="confirm-password" className="form-control" placeholder="Confirm your password here..." onChange={handleOnChange} /> */}
                    <input type="submit" value="Submit" className="btn btn-secondary" />
                </form>
            </div>
            <div className="container">
                <p>You already have an account? Click <a href="/login">here </a>to log in!</p>
            </div>
        </>
    )
}
export default Register;
