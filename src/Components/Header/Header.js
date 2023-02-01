import Logo from "../../assets/icons/logo.svg"
import {Link} from "react-router-dom"
import card from "../../assets/icons/card.svg"

const Header = ({isBasket}) => {
    return (
        <div className="header">
            <Link to="/" className="header__logo">
                <img className="header__logo-img" src={Logo} alt="Logo"/>
                <div className="header__content">
                    <h1 className="header__title">REACT PIZZA</h1>
                    <p className="header__text">Нууууу дуже смачно</p>
                </div>
            </Link>
            {
                !isBasket && <Link to="/card" className="header__card">
                    <p className="header__price">10 000 ₴</p>
                    <div className="header__card-item">
                        <img className="header__card-img" src={card} alt="card"/>
                        <p className="header__count">1</p>
                    </div>
                </Link>
            }
        </div>
    )
}


export default Header
