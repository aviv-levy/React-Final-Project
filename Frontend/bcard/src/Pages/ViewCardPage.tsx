import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import AboutCard from "../Components/AboutCard";
import Title from "../Components/Title";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cards } from "../Services/Interfaces";
import { getCardById } from "../Services/ApiService";


function ViewCardPage() {

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
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Title title='Moshe tiful bam' />
            <div className='d-flex justify-content-center mb-4'>
                <div className="row row-cols-1 row-cols-md-3 container-fluid g-3">
                    <AboutCard
                        image={card?.imageUrl}
                        title={card?.title}
                        text={card?.subtitle}
                        noSpace={true} />

                    <div className="d-flex flex-column border border-top-0 border-bottom-0">
                        <h1 className="text-center"><FontAwesomeIcon icon={faEnvelope} /></h1>
                        <h5 className="text-center mb-2">contact details</h5>
                        <div className="d-flex flex-column ms-3">

                            <span>Email: {card?.email}</span>
                            {card?.web && <span>Website: {card?.web}</span>}
                            <span>Location: {card?.country},{card?.city},{card?.street} {card?.houseNumber}</span>
                        </div>

                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <Link to={'tel:' + card?.phone} className="btn btn-lg btn-primary"><FontAwesomeIcon icon={faPhone} className="me-2" />{card?.phone}</Link>
                    </div>
                </div>
            </div>
            <hr className="my-0" />

            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-5">

                        <h2>More Information about {card?.title}</h2>
                        <hr />
                        <p className="fs-5">{card?.description}</p>

                    </div>

                    <div className="col-7 text-center">
                        <iframe
                            title="google maps"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDSsGTBJ-PCnNxm-49P_bIwqyX5wiUDoAs
    &q=${card?.city}+${card?.street}${card?.houseNumber}`}>
                        </iframe>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ViewCardPage;