import { useContext, useEffect } from "react";
import Card from "../Components/Card";
import Title from "../Components/Title";
import { getFavoriteCards } from "../Services/ApiService";
import { CopiedCardsContext, LoggedInContext } from "../App";

function FavPage() {

    const filteredCards = useContext(LoggedInContext);
    const copiedCardsContext = useContext(CopiedCardsContext);

    useEffect(() => {
        const getCards = async () => {
            const cards = await getFavoriteCards();
            filteredCards?.setFilteredCards(cards)
            copiedCardsContext?.setCopyCards(cards);
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
                        filteredCards?.filteredCards?.map(card =>
                            <Card
                                key={card._id}
                                title={card.title}
                                subtitle={card.subtitle}
                                phone={card.phone}
                                address={`${card.street} ${card.houseNumber} ${card.city}`}
                                cardId={card._id}
                                createdBy={card.userId}
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