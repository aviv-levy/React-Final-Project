import { useEffect, useState } from "react";
import { Cards } from "../Services/Interfaces";
import { useParams } from "react-router-dom";
import { getCardById } from "../Services/ApiService";

function EditCardPage() {

    const [card, setCard] = useState<Cards>();
    const { cardId } = useParams();

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
    }, [])

    return (
        <div>


        </div>
    );
}

export default EditCardPage;