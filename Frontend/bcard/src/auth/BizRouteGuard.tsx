import { ReactNode, useContext } from "react";
import { verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from "../App";

interface Props {
    children: ReactNode
}

function BizRouteGuard({ children }: Props) {

    const BizUser = useContext(LoggedInContext)?.userDetails?.biz;

    return verifyToken() && BizUser ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}

export default BizRouteGuard;