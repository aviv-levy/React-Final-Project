import { useEffect, useState } from "react";
import Title from "../Components/Title";
import UserStatus from "../Components/UserStatus";
import { getAllUsers } from "../Services/ApiService";
import { User } from "../Services/Interfaces";

function SandboxPage() {


    const [users, setUsers] = useState<Array<User>>()

    //Get all users from server when initalize page.
    useEffect(() => {
        const getUsers = async () => {
            const users = await getAllUsers();
            setUsers(users);
        }
        getUsers().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Title title='Sandbox Page' description='Admin privelges to control users' />

            <div className="container-fluid w-50 mt-4">
                <table className="table table-secondary p-3">
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Business</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        {users?.map(user =>
                            <UserStatus
                                key={user._id}
                                id={user._id}
                                name={user.firstname + ' ' + user.lastname}
                                status={user.status}
                                email={user.email}
                                biz={user.biz}
                                renderUsers={setUsers}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SandboxPage;