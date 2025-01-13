import App from "./App";
import ListSessionTasks from "./components/listSessionTasks";
import ErrorPage from "./erropage";
import Login from "./components/login ";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ListSessionTasks />
            },
            {
                path: "/login",
                element: <Login />
            },
        ]
    }
]   

export default routes