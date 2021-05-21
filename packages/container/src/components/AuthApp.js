import { mount } from "auth/AuthApp";
import React,{ useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ()=>{
    const ref = useRef(null)
    const history = useHistory()

    useEffect(()=>{
        const {onParentNavigate} = mount(
            ref.current,
            { 
                initialPath: history.location.pathname,
                onNavigate: ( location )=>{

                    const nextPathname = location.pathname
                    const currentPathname = history.location.pathname

                    if (nextPathname!==currentPathname) {
                        history.push(nextPathname)
                    }
                },
            },
        )

        history.listen(onParentNavigate)
    },[ref])

    return (
        <div ref={ref}/>
    )
}