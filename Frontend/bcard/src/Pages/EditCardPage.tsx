import { createContext, useEffect, useState } from "react";
import { Cards } from "../Services/Interfaces";
import { useParams } from "react-router-dom";
import { getCardById, updateCard } from "../Services/ApiService";
import Title from "../Components/Title";
import CardForm from "../Components/CardForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateCard } from "../Services/Validations";


interface cardContext {
    card?: Cards
}

export const CardContext = createContext<cardContext | null>(null);

function EditCardPage() {

    const [card, setCard] = useState<Cards>();
    const [errors, setError] = useState<string[]>([]);
    const { cardId } = useParams();

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
    async function handleUpdateButton() {
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
        await updateCard(card)
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

    useEffect(() => {
        const getUserCard = async () => {
            const card = await getCardById(cardId);
            setCard(card);
        }
        getUserCard().catch((err) => {
            if (err) {
                return;
            }
        });
    // eslint-disable-next-line
    }, [])

    return (
        <>
            <Title title='Update Card' />
            <CardContext.Provider value={{ card }}>
                <CardForm type="Update" errors={errors} setCard={setCard} handleSubmit={handleUpdateButton} />
            </CardContext.Provider>
        </>
    );
}

export default EditCardPage;