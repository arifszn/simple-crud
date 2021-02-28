import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Routes from "../helpers/Routes";

const PrivateRoute = ({ children, ...rest }) => {
    const token = useSelector(state => state.token.value);

    return (
        <Route
        {...rest}
        render={({ location }) =>
            token !== null ? (
            children
            ) : (
                <Redirect
                    to={{
                        pathname: Routes.web.login,
                        state: { from: location }
                    }}
                />
            )
        }
        />
    );
}

export default PrivateRoute;