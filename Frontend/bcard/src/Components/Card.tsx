import '../CSS/cards.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEdit, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LoggedInContext } from '../App';
import { deleteCard, likeCard } from '../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Props {
    title?: string;
    subtitle?: string;
    img?: string;
    phone?: string;
    address?: string;
    cardId?: string;
    cardNumber?: number;
    createdBy?: string;
    addCard?: boolean;
}

function Card({ title, subtitle, img, phone, address, cardId, createdBy, addCard, cardNumber }: Props) {

    const [like, setLike] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const isLoggedIn = useContext(LoggedInContext);
    const userDetails = useContext(LoggedInContext);

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

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
    async function handleDelete() {
        await deleteCard(cardId)
            .then(() => {
                setIsDeleted(true)
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <i>Your card has been Deleted</i>,
                    icon: 'success'
                })
            })
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
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                !isDeleted &&
                <div className="col">
                    <div className="card h-100 ">
                        {
                            !addCard ?
                                <>
                                    <Link to={`/viewCard/${cardId}`}>
                                        <img src={img} className="card-img-top" alt="..." />
                                    </Link>

                                    <div className="card-body text-md-start">
                                        <h5 className="card-title">{title}</h5>
                                        <p className="card-text">{subtitle}</p>
                                        <hr />
                                        <div className='d-flex flex-column'>
                                            <span><strong>Phone: </strong>{phone}</span>
                                            <span><strong>Address: </strong>{address}</span>
                                            <span><strong>Card Number: </strong>{cardNumber}</span>
                                        </div>

                                    </div>

                                    <div className='d-flex justify-content-between my-3 mx-3 card-icons'>

                                        <div>
                                            {
                                                isLoggedIn?.isLoggedIn && userDetails?.userDetails?.biz && userDetails.userDetails._id === createdBy &&
                                                <>

                                                    <button onClick={handleDelete} className='card-icon border border-0'>
                                                        <FontAwesomeIcon icon={faTrash} className='me-2' />
                                                    </button>
                                                    {
                                                        <button onClick={handleEdit} className='card-icon border border-0'>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                    }
                                                </>
                                            }
                                        </div>
                                        <div>
                                            <Link to={'tel:' + phone} className='text-black me-3'><FontAwesomeIcon icon={faPhone} className='card-icon' /></Link>
                                            {
                                                isLoggedIn?.isLoggedIn &&
                                                <button onClick={handleLike} className='card-icon border border-0'>
                                                    <FontAwesomeIcon icon={faHeart} className={like ? 'text-danger' : ''} />
                                                </button>}
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <Link to='/addCard' className='btn fs-1 p-5 h-100 w-100 d-flex flex-column justify-content-center new-card '>+ <h3>Add New</h3></Link>
                                </div>
                        }

                    </div>
                </div >
            }
        </>
    );
}

export default Card;