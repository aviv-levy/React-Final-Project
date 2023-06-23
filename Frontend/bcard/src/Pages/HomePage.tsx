import { useEffect, useState } from 'react';
import Card from '../Components/Card';
import Title from '../Components/Title';
import { Cards } from '../Services/Interfaces';
import { getAllCards } from '../Services/ApiService';


function HomePage() {
    const [cards, setUserCards] = useState<Array<Cards>>();

    useEffect(() => {
        const getCards = async () => {
            const cards = await getAllCards();
            setUserCards(cards);
        }

        getCards().catch((err) => {
            if (err) {
                return;
            }
        });
    }, [])
    return (
        <>
            <Title title='Cards Page' description='Here you can find business cards from all categories' />

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

export default HomePage;