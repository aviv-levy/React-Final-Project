import { useState } from "react";
import Title from "../Components/Title";
import { Cards } from "../Services/Interfaces"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { validateCard } from "../Services/Validations";
import { addNewCard } from "../Services/ApiService";
import CardForm from "../Components/CardForm";

function AddCardPage() {

    const [card, setCard] = useState<Cards>();

    const [errors, setError] = useState<string[]>([]);

    const MySwal = withReactContent(Swal)

    function validate(): boolean {
        const errArray: Array<string> = [];
        validateCard(card, errArray)

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
        else if (!card) {
            MySwal.fire({
                title: <strong>Error accured!</strong>,
                html: <i>Please fill the inputs</i>,
                icon: 'error'
            })
            return;
        }
        //api request
        await addNewCard(card)
            .then(() =>
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <i>Your card has been added</i>,
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
            <Title title='Add new Card' />

            <CardForm type="Add" errors={errors} setCard={setCard} handleSubmit={handleAddButton} />

        </>
    );
}

export default AddCardPage;