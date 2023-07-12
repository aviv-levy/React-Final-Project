import { useContext, useEffect } from "react";
import Card from "../Components/Card";
import Title from "../Components/Title";
import { getFavoriteCards } from "../Services/ApiService";
import { CopiedCardsContext, LoggedInContext } from "../App";

function FavPage() {

    const filteredCards = useContext(LoggedInContext);
    const copiedCardsContext = useContext(CopiedCardsContext);

    //Remove from the page liked card
    function handleRemove(cardId: string) {
        filteredCards?.filteredCards?.forEach((card, index) => {
            if (card._id === cardId) {
                filteredCards.filteredCards?.splice(index, 1)
                return;
            }
        })
    }
    //Get cards from server when initalize page.
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
        // eslint-disable-next-line
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
                                cardNumber={card.cardNumber}
                                createdBy={card.userId}
                                img={card.imageUrl}
                                alt_img={card.imageAlt}
                                removeLike={handleRemove}
                            />
                        )
                    }

                </div>
            </div>
        </>
    );
}

export default FavPage;