import '../CSS/cards.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEdit, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LoggedInContext } from '../App';
import { likeCard } from '../Services/ApiService';

interface Props {
    title?: string;
    subtitle?: string;
    img?: string;
    phone?: string;
    address?: string;
    cardId?: string;
    addCard?: boolean;
}

function Card({ title, subtitle, img, phone, address, cardId, addCard }: Props) {

    const [like, setLike] = useState(false);

    const isLoggedIn = useContext(LoggedInContext);
    const userDetails = useContext(LoggedInContext);

    const navigate = useNavigate();

    //Like or dislike handle button
    async function handleLike() {
        setLike(!like)
        await likeCard(cardId)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
    }

    //Delete card handle button
    function handleDelete() {

    }
    //Edit card handle button
    function handleEdit() {
        navigate(`/editCard/${cardId}`)
    }

    useEffect(() => {
        userDetails?.userDetails?.likedCards?.forEach((card) => {
            if (card === cardId)
                setLike(true);
        })
    }, [])

    return (
        <div className="col">
            <div className="card h-100 ">
                {
                    !addCard ?
                        <>
                            <img src={img} className="card-img-top" alt="..." />
                            <div className="card-body text-md-start">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{subtitle}</p>
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
                                            <button onClick={handleEdit} className='border border-0 bg-white'>
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
                        </>
                        :
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <Link to='/addCard' className='btn fs-1 p-5'>+</Link>
                        </div>
                }

            </div>
        </div>
    );
}

export default Card;