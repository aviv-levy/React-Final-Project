import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Title from "../Components/Title";
import { getMyCards } from "../Services/ApiService";
import { Cards } from "../Services/Interfaces";

function MyCardsPage() {

    const [userCards, setUserCards] = useState<Array<Cards>>();

    useEffect(() => {
        const getUserCards = async () => {
            const cards = await getMyCards();
            setUserCards(cards);
            
        }

        getUserCards().catch((err) => {
            if (err) {
                return;
            }
        });
    }, [])


    return (
        <>
            <Title title='My Cards' />

            <div className='d-flex justify-content-center mb-4'>
                <div className="row row-cols-1 row-cols-md-4 container-fluid g-4">

                    {
                        userCards?.map(card =>
                            <Card
                                key={card._id}
                                title={card.title}
                                subtitle={card.subtitle}
                                phone={card.phone}
                                address={`${card.street} ${card.houseNumber} ${card.city}`}
                                cardId={card._id}
                                img={card.imageUrl}
                            />
                        )
                    }
                    

                    <Card addCard={true} />
                </div>
            </div>
        </>
    );
}

export default MyCardsPage;