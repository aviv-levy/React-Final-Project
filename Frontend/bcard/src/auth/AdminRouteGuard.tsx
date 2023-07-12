import { ReactNode, useContext } from "react";
import { verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from "../App";

interface Props {
    children: ReactNode
}

function AdminRouteGuard({ children }: Props) {

    const isAdmin = useContext(LoggedInContext)?.userDetails?.isAdmin;

    return verifyToken() && isAdmin ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}

export default AdminRouteGuard;