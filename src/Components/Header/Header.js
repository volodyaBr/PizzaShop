import Logo from "../../assets/icons/logo.svg"
import {Link} from "react-router-dom"
import card from "../../assets/icons/card.svg"
import {useDispatch, useSelector} from "react-redux";
import {getPizzas, setCurrentPage, setNameValue} from "../../redux/pizzaSlice";


const Header = ({isMain}) => {
    const dispatch = useDispatch()
    const totalCountOrderPizzas = useSelector(state => state.pizza.totalCountOrderPizzas)
    const currentPrice = useSelector(state => state.pizza.currentPrice)

    const submitChange = (e) => {
        dispatch(setCurrentPage(1))
        dispatch(setNameValue(e.target.value))
        dispatch(getPizzas())
    }

    const debounce = (fn, ms) => {
        let interval;

        return function () {
            const fnCall = () => fn.apply(this, arguments)

            clearInterval(interval)

            interval = setTimeout(fnCall, ms)
        }
    }

    const debounceChange = debounce(submitChange, 200)


    return (
        <div className="header">
            <div className="header__container container">
                <Link to="/" className="header__logo">
                    <img className="header__logo-img" src={Logo} alt="Logo"/>
                    <div className="header__content">
                        <h1 className="header__title">REACT PIZZA</h1>
                        <p className="header__text">Нууууу дуже смачно</p>
                    </div>
                </Link>
                {
                    isMain && <>
                        <div className="icon-search header__input">
                            <input type="text" onChange={debounceChange} />
                        </div>
                        <Link to="/basket" className="header__card">
                            <p className="header__price">{currentPrice} ₴</p>
                            <div className="header__card-item">
                                <img className="header__card-img" src={card} alt="card"/>
                                <p className="header__count">{totalCountOrderPizzas}</p>
                            </div>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}


export default Header
