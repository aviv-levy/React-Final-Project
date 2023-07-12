import { createContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Title from "../Components/Title";
import RegisterForm from "../Components/RegisterForm";
import { User } from "../Services/Interfaces";
import { validateUser } from "../Services/Validations";
import { updateUserDetails } from "../Services/ApiService";


interface userContext {
    user?: User
    setUser: Function
}
// eslint-disable-next-line
export const userContext = createContext<userContext | null>(null);

function EditUserPage() {

    const [user, setUser] = useState<User>();
    const [errors, setError] = useState<string[]>([]);

    const MySwal = withReactContent(Swal)

    function validate(): boolean {
        const errArray: Array<string> = [];
        validateUser(user, errArray)

        if (!user?.password)
            errArray[5] = "";

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
    async function handleUpdateButton() {
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
        await updateUserDetails(user)
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
            <Title title='Update Your Account' />
            <userContext.Provider value={{ user, setUser }}>
                <RegisterForm type="Update" errors={errors} setUser={setUser} handleSubmit={handleUpdateButton} />
            </userContext.Provider>
        </>
    );
}

export default EditUserPage;