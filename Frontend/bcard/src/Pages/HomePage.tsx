import { useContext, useEffect } from 'react';
import Card from '../Components/Card';
import Title from '../Components/Title';
import { getAllCards } from '../Services/ApiService';
import { CopiedCardsContext, LoggedInContext } from '../App';


function HomePage() {
    const filteredCards = useContext(LoggedInContext);
    const copiedCardsContext = useContext(CopiedCardsContext);

    useEffect(() => {
        const getCards = async () => {
            const cards = await getAllCards();
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
            <Title title='Cards Page' description='Here you can find business cards from all categories' />

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
                            />
                        )
                    }

                </div>
            </div>
        </>
    );
}

export default HomePage;