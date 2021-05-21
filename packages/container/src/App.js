import React, {lazy, Suspense} from "react";
import { StylesProvider, createGenerateClassName} from '@material-ui/styles'

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingAppLazy = lazy(()=>import('./components/MarketingApp'))
const AuthAppLazy = lazy(()=>import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: "ma",
})

export default ()=>{
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <Header />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/auth" component={AuthAppLazy}/>
                        <Route path="/" component={MarketingAppLazy} />
                    </Switch>
                </Suspense>
            </StylesProvider>
        </BrowserRouter>
    )
}