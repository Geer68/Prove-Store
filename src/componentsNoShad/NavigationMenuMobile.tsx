import cart from "../imgs/cart.svg"
import { Link } from "./Link";
import proveLogo from "../imgs/PROVElogoN.png";
export function NavigationMenuMobile() {
    return (
        <nav className="flex justify-between sm:flex items-center p-2 border-b border-gray mb-2 mt-1">
            <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ml-7 mr-7">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 6l16 0"></path>
                <path d="M4 12l16 0"></path>
                <path d="M4 18l16 0"></path>
            </svg></button>
            <img src={proveLogo} alt="" className="w-10 h-7 ml-7 mr-7" />
            <Link to="/cart">
                <img src={cart} className="w-7 ml-7 mr-7" alt="" />
            </Link>
        </nav>
    )
}