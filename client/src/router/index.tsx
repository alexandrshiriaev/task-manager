import {createBrowserRouter} from "react-router-dom";
import {privateRoutes} from "./routes/privateRoutes";

export const router = createBrowserRouter([
    ...privateRoutes
]);