import sadSmile from "../../assets/icons/sadSmile.svg";
import emptyBasket from "../../assets/emptyBasket.png";
import {Link} from "react-router-dom";

const EmptyBasket = (props) => {
    return (
                <div className="basket__empty empty-basket">
                    <p className="empty-basket__title">Корзина пуста <img src={sadSmile} alt=""/></p>
                    <p className="empty-basket__text">Ймовірно, ви не замовляли ще піцу.
                        <span>Щоб замовити піцу, перейди на головну сторінку.</span></p>
                    <div className="empty-basket__img"><img src={emptyBasket} alt="emptyBasketImg"/></div>
                    <Link to="/" className="empty-basket__back-button">Повернутись назад</Link>
                </div>
    )
}


export default EmptyBasket
