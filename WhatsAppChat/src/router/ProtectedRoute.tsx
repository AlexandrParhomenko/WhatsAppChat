import {useSelector} from "react-redux";
import {selectAuthData} from "../store/reducers/authSlice.ts";
import {Navigate} from "react-router-dom";
import routes from "./routes.ts";

const ProtectedRoute = ({ children }: any) => {
    const auth = useSelector(selectAuthData)

    if (!auth.user_id) {
        return <Navigate to={routes.main} />;
    }

    return children;
};

export default ProtectedRoute;