import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { FormEvent, useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../App";
import { User } from "../Services/Interfaces";
import { userContext } from "../Pages/EditUserPage";

interface Props {
    type: 'Update' | 'Register'
    errors: Array<string>;
    setUser: Function;
    handleSubmit: Function;
}


function RegisterForm({ type, errors, setUser, handleSubmit }: Props) {

    const LoggedUser = useContext(LoggedInContext)?.userDetails;
    const user = useContext(userContext)?.user;
    const setUserContext = useContext(userContext);
    const userDetails = useContext(LoggedInContext)
    const [biz, setBiz] = useState(false);

    const navigate = useNavigate();


    function handleBiz() {
        userDetails?.setUserDetails((prevState: User) => ({ ...prevState, biz: !biz }))
        setUser((prevState: User) => ({ ...prevState, biz: !biz }))
        setBiz(!biz);
    }

    function handleButton(e: FormEvent) {
        e.preventDefault();

        handleSubmit();
    }

    useEffect(() => {
        setUserContext?.setUser(LoggedUser);

        if (userDetails?.userDetails?.biz === true)
            setBiz(userDetails?.userDetails?.biz);
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container mt-4">
            <form>
                <div className="row">
                    <FormInput objVal={user?.firstname} required={true} inputName="FirstName" type="text" inputState='firstname' setOnChange={setUser} error={errors[0]} />
                    <FormInput objVal={user?.middlename} inputName="Middlename" type="text" inputState='middlename' setOnChange={setUser} error={errors[1]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={user?.lastname} required={true} inputName="Lastname" type="text" inputState='lastname' setOnChange={setUser} error={errors[2]} />
                    <FormInput objVal={user?.phone} required={true} inputName="Phone" type="text" inputState='phone' setOnChange={setUser} error={errors[3]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={user?.email} required={true} inputName="Email" type="email" inputState='email' setOnChange={setUser} error={errors[4]} />
                    <FormInput objVal={user?.password} required={type !== 'Update' ? true : false} inputName="Password" type="password" inputState='password' setOnChange={setUser} error={errors[5]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={user?.img} inputName="Image Url" type="text" inputState='img' setOnChange={setUser} error={errors[6]} />
                    <FormInput objVal={user?.img_alt} inputName="Image alt" type="text" inputState='img_alt' setOnChange={setUser} error={errors[7]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={user?.state} inputName="State" type="text" inputState='state' setOnChange={setUser} error={errors[8]} />
                    <FormInput objVal={user?.country} required={true} inputName="Country" inputState='country' type="text" setOnChange={setUser} error={errors[9]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={user?.city} required={true} inputName="City" type="text" inputState='city' setOnChange={setUser} error={errors[10]} />
                    <FormInput objVal={user?.street} required={true} inputName="Street" type="text" inputState='street' setOnChange={setUser} error={errors[11]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={user?.housenum} required={true} inputName="House Number" type="number" inputState='housenum' setOnChange={setUser} error={errors[12]} />
                    <FormInput objVal={user?.zip} inputName="Zip" type="number" inputState='zip' setOnChange={setUser} error={errors[13]} />
                </div>
                <div className="col-6 mt-3">
                    <div className="form-group ">
                        <input
                            id="biz"
                            type='checkbox'
                            checked={biz}
                            onChange={() => handleBiz()} />
                        <label htmlFor="biz" className="mx-2">Signup as business </label>
                    </div>
                </div>
                <div className="my-4 text-center">
                    <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary mx-2">Cancel</button>
                    <button onClick={handleButton} type="submit" className="btn btn-primary mx-2">{type}</button>
                </div >

            </form >
        </div >
    );
}

export default RegisterForm;