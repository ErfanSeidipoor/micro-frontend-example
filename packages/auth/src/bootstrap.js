import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, {onNavigate, defaultHistory, initialPath, onSignIn}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    })

    if (onNavigate) {
        history.listen( onNavigate )
    }
    
    ReactDOM.render(<App history={history} onSignIn={onSignIn}/>, el)

    return {
        onParentNavigate(location) {
            
            const nextPathname = location.pathname
            const currentPathname = history.location.pathname

            console.log(nextPathname);
            if (nextPathname!==currentPathname) {
                history.push(nextPathname)
            }

        }
    }
}

// If we are in development and in isolation
// call mount immediately 
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById("_auth-dev-root")

    if(devRoot) {
        mount(devRoot, {defaultHistory:createBrowserHistory()})
    }
}

// We are running through container
// and we should export then mount
export { mount, App as AuthApp}
