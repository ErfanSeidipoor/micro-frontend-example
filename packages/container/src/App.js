import React, {lazy, Suspense, useEffect, useState} from "react";
import { StylesProvider, createGenerateClassName} from '@material-ui/styles'

import { Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";

import { createBrowserHistory } from "history";

const MarketingAppLazy = lazy(()=>import('./components/MarketingApp'))
const AuthAppLazy = lazy(()=>import('./components/AuthApp'))
const DashboardAppLazy = lazy(()=>import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: "ma",
})

const history = createBrowserHistory()

export default ()=>{

    const [isSignIn, setIsSignIn] = useState(false)

    useEffect(()=>{
        if(isSignIn) {
            history.push("/dashboard")
        }
    },[isSignIn])

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Header isSignIn={isSignIn} onSignOut={()=>setIsSignIn(false)}/>
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/auth">
                            <AuthAppLazy onSignIn={()=>setIsSignIn(true)}/>
                        </Route>
                        <Route path="/dashboard">
                            <DashboardAppLazy />
                        </Route>
                        <Route path="/" component={MarketingAppLazy} />
                    </Switch>
                </Suspense>
            </StylesProvider>
        </Router>
    )
}