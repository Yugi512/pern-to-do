import { useRouteError } from "react-router-dom"

function ErrorPage(){
    const error = useRouteError();
    console.log(error) 

    return (
        <>
            <main>
                <h1>{error.status} Error, something wrong</h1>
                <p>obviously</p>
            </main>
        </>
    )
}

export default ErrorPage;