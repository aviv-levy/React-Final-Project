import '../CSS/cards.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEdit, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoggedInContext } from '../App';

interface Props {
    title: string;
    date: string;
    img: string;
    phone: string;
    address: string;
    cardId: number;
}

function Card({ title, date, img, phone, address, cardId }: Props) {

    const [like, setLike] = useState(false);

    const isLoggedIn = useContext(LoggedInContext);

    function handleLike() {
        setLike(!like)
    }

    function handleDelete() {

    }

    return (
        <div className="col">
            <div className="card h-100 ">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body text-md-start">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{date}</p>
                    <hr />
                    <div className='d-flex flex-column'>
                        <span><strong>Phone: </strong>{phone}</span>
                        <span><strong>Address: </strong>{address}</span>
                        <span><strong>Card Number: </strong>{cardId}</span>
                    </div>

                </div>
                <div className='d-flex justify-content-between my-3 mx-3 card-icons'>

                    <div>
                        {
                            isLoggedIn?.isLoggedIn &&
                            <>
                                <button onClick={handleDelete} className='border border-0 bg-white'>
                                    <FontAwesomeIcon icon={faTrash} className='me-2' />
                                </button>
                                <button className='border border-0 bg-white'>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </>
                        }
                    </div>
                    <div>
                        <Link to={'tel:' + phone} className='text-black me-3'><FontAwesomeIcon icon={faPhone} /></Link>
                        {
                            isLoggedIn?.isLoggedIn &&
                            <button onClick={handleLike} className='border border-0 bg-white'>
                                <FontAwesomeIcon icon={faHeart} className={like ? 'text-danger' : 'text-black'} />
                            </button>}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Card;