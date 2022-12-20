import { useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [formValue, setFormValue] = useState<UserType[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios("http://localhost:5000/users")
            .then((response) => {
                setFormValue(response.data);
            })
            .catch(error => {
                console.error("Error fething: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const handleLogin = (login: string, password: string) => {
        formValue?.forEach((item) => {
            if (item.username === login && item.password === password) {
                navigate("/");
                //toast.success("Logged in successfully!", {});
            }
            else {
                //toast.error("Something went wrong!", {});
            }
        })
    }

    return (
        <>
            <div className="container">
                <form method="POST" onSubmit={(event: React.SyntheticEvent) => {
                    // event.preventDefault();
                    const target = event.target as typeof event.target & {
                        login: { value: string };
                        password: { value: string };
                    };
                    handleLogin(target.login.value, target.password.value);
                }}>
                    <label htmlFor="login" className="form-label">Username</label>
                    <input type="text" name="login" className="form-control" placeholder="Put your username here..." />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Put your password here..." />
                    <input type="submit" className="btn btn-info" value="Submit" />
                </form>
            </div>
            <div className="container">
                <p>You don't have an account? Click <a href="/register">here</a> to register!</p>
            </div>
        </>
    )
}

export default Login;

