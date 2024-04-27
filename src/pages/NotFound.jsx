import { useRouteError ,NavLink} from "react-router-dom";

const NotFound = () => {
    const error = useRouteError();

    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <p>{error.statusText || error.message}</p>
            <NavLink to='/'><h2>Volver</h2></NavLink>
        </div>
    );
};
export default NotFound;