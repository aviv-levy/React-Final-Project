import { FormEvent, useContext, useState } from "react";
import { isEmailValid, isPasswordValid } from "../Services/Validations";
import { setToken } from "../auth/TokenManager";
import { useNavigate } from "react-router-dom";
import Error from "../Components/Error";
import { login } from "../Services/ApiService";
import { LoggedInContext } from "../App";


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState<string[]>([]);
    const [serverError, setServerError] = useState('');

    const isLoggedIn = useContext(LoggedInContext);

    const navigate = useNavigate();

    function validate(): boolean {
        const errArray: Array<string> = [];
        isEmailValid(email) ?
            errArray[0] = 'Email is not valid' :
            errArray[0] = ''

        isPasswordValid(password) ?
            errArray[1] = 'סיסמא חייבת להכיל לפחות 8 תווים, ולפחות אות אחת!' :
            errArray[1] = ''

        setError(errArray)
        errArray.forEach((err) => {
            if (err !== '')
                return false;
        })
        return true;
    }

    async function handleClick(e: FormEvent) {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        await login({ email, password }).then((user) => {
            setToken(user.token)
            isLoggedIn?.setIsLoggedIn(true);
            navigate('/');

        }).catch((err) => {

            if (err) {
                setServerError('Email or password invalid please try again');
                return;
            }
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center mt-3">
                    <div className="col-sm-6 col-md-4 mt-5">
                        <div className="text-center mt-5">

                            <h1>Login</h1>
                        </div>
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Error errorText={errors[0]} />

                            <div className="form-group mb-3">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Error errorText={errors[1]} />
                            <div className="d-grid gap-2 mt-4">
                                <button onClick={handleClick} className="btn btn-primary">Login</button>
                            </div>
                            <div className="text-center">
                                <Error errorText={serverError} />
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}

export default LoginPage;