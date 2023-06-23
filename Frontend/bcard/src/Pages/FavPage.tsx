import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Title from "../Components/Title";
import { Cards } from "../Services/Interfaces";
import { getFavoriteCards } from "../Services/ApiService";

function FavPage() {

    const [cards, setUserFavCards] = useState<Array<Cards>>();

    useEffect(() => {
        const getCards = async () => {
            const cards = await getFavoriteCards();
            setUserFavCards(cards);
        }

        getCards().catch((err) => {
            if (err) {
                return;
            }
        });
    }, [])

    return ( 
        <>
        <Title title='Favorite Cards Page' description='Here you can find your favorite business cards' />

        <div className='d-flex justify-content-center mb-4'>
            <div className="row row-cols-1 row-cols-md-4 container-fluid g-4">

                {
                    cards?.map(card =>
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

            </div>
        </div>
    </>
     );
}

export default FavPage;