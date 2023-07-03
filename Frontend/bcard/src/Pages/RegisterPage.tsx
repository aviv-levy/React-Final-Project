import { useState } from "react";
import RegisterForm from "../Components/RegisterForm";
import Title from "../Components/Title";
import { User } from "../Services/Interfaces";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { addNewUser } from "../Services/ApiService";
import { validateUser } from "../Services/Validations";

function RegisterPage() {

    const [user, setUser] = useState<User>();
    const [errors, setError] = useState<string[]>([]);

    const MySwal = withReactContent(Swal)

    function validate(): boolean {
        const errArray: Array<string> = [];
        validateUser(user, errArray)

        setError(errArray)

        let flag: boolean = true;
        errArray.forEach((err) => {
            if (err !== '') {
                flag = false;
                return;
            }
        })
        return flag;
    }

    //Handle Add card button
    async function handleAddButton() {
        if (!validate())
            return;
        else if (!user) {
            MySwal.fire({
                title: <strong>Error accured!</strong>,
                html: <i>Please fill the inputs</i>,
                icon: 'error'
            })
            return;
        }
        //api request
        await addNewUser(user)
            .then(() =>
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <i>Your have been registered</i>,
                    icon: 'success'
                })
            ).catch(err => {
                if (err) {
                    MySwal.fire({
                        title: <strong>Error accured!</strong>,
                        html: <i>Please try again</i>,
                        icon: 'error'
                    })
                    return;
                }
            })
    }

    return (
        <>
            <Title title='Register' />

            <RegisterForm type="Add" errors={errors} setUser={setUser} handleSubmit={handleAddButton} />
        </>
    );
}

export default RegisterPage;