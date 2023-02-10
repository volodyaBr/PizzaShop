import BasketPizzaItem from "../BasketPizzaItem/BasketPizzaItem";
import EmptyBasket from "../EmptyBasket/EmptyBasket";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {clearBasket} from "../../redux/pizzaSlice";

const Basket = () => {
    const dispatch = useDispatch()
    const orderPizzas = useSelector(state => state.pizza.orderPizzas)
    const totalCountPizzas = useSelector(state => state.pizza.totalCountOrderPizzas)
    const totalPrice = useSelector(state => state.pizza.currentPrice)

    const clearPizzas = () => {
        dispatch(clearBasket())
    }

    return (
        <div className="basket">
            <div className="basket__container container">
                {
                    orderPizzas.length > 0 ?
                        <>
                            <div className="basket__top">
                                <p className="basket__title icon-basket">Кошик</p>
                                <button onClick={clearPizzas} type="button" className="basket__clear-basket icon-rubbish">Очистити корзину</button>
                            </div>
                            <div className="basket__body">
                                {
                                    orderPizzas.map((pizza, id) => {
                                        return <BasketPizzaItem key={id} id={pizza.pizzaId} size={pizza.size} dough={pizza.dough} name={pizza.name} img={pizza.img} count={pizza.count} price={pizza.totalPrice}/>
                                    })
                                }
                            </div>
                            <div className="basket__bottom">
                                <div className="basket__action">
                                    <p className="basket__total-count">Усього піц: <span>{totalCountPizzas} шт.</span></p>
                                    <p className="basket__total-price">Сумма замовлення: <span>{totalPrice} ₴</span></p>
                                </div>
                                <div className="basket__buttons">
                                    <Link to="/" className="basket__back-button icon-arrow">Повернутися назад</Link>
                                    <button className="basket__confirm">Оплатити зараз</button>
                                </div>
                            </div>
                        </>
                        : <EmptyBasket/>
                }
            </div>
        </div>
    )
}


export default Basket
