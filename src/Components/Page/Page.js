import Header from "../Header/Header";
import {Outlet, useLocation} from "react-router-dom"
import {useEffect, useState} from "react";
import Main from "../Main/Main.js";

const Page = () => {
    const location = useLocation()
    const [isMain, setIsMain] = useState(false)

    useEffect(() => {
        if (location.pathname === "/") {
            setIsMain(true)
        } else {
            setIsMain(false)
        }
    }, [location])

    return (
        <>
            <Header isMain={isMain}/>
            <div className="page">
                {
                    isMain ? <Main/> : <Outlet/>
                }
            </div>
        </>
    )
}


export default Page
