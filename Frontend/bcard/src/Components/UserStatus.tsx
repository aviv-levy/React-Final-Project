import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBusinessTime, faCancel, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { deleteUser, updateUserBiz, updateUserStatus } from "../Services/ApiService";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export interface user {
    id?: string;
    name: string;
    status: 'Active' | 'Expired' | 'Blocked';
    email: string;
    biz?: boolean;
    renderUsers: Function;
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'Active':
            return 'text-bg-success';
        case 'Expired':
            return 'text-bg-warning';
        case 'Blocked':
            return 'text-bg-danger';

        default:
            return '';
    }
}

function UserStatus({ id, name, status, email, renderUsers, biz }: user) {

    const MySwal = withReactContent(Swal)

    async function handleStatus() {
        await updateUserStatus(id)
            .then((users) => {
                renderUsers(users)
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <i>User status has changed</i>,
                    icon: 'success'
                })
            })
            .catch((err) => {
            });
    }

    async function handleDelete() {
        await deleteUser(id)
            .then((users) => {
                console.log(users);

                renderUsers(users)
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <i>User has been deleted</i>,
                    icon: 'success'
                })
            }
            )
            .catch((err) => {
            });
    }

    async function handleBiz() {
        await updateUserBiz(id)
            .then((users) => renderUsers(users))
            .catch((err) => {
            });
    }

    return (
        <tr className="table-light">
            <td>{name}</td>
            <td><span className={`badge ${getStatusColor(status)}`}>{status}</span></td>
            <td>{email}</td>
            <td>{biz ? 'Yes' : 'No'}</td>
            <td>
                <div className="d-flex justify-content-end">
                    <button onClick={handleBiz} className="btn p-1"><FontAwesomeIcon icon={faBusinessTime} className={biz ? 'biz-color' : ''} /></button>
                    {
                        status === 'Active' ?
                            <button onClick={handleStatus} className="mx-3 btn p-1"><FontAwesomeIcon icon={faCancel} className="text-danger" /></button>
                            :
                            <button onClick={handleStatus} className="mx-3 btn p-1"><FontAwesomeIcon icon={faCheckCircle} className="text-success" /></button>
                    }
                    <button onClick={handleDelete} className="me-3 btn p-1"> <FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </td>
        </tr>
    );
}

export default UserStatus;