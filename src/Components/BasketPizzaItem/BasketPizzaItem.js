import {useDispatch, useSelector} from "react-redux";
import {deletePizza, updateOrderPizzas} from "../../redux/pizzaSlice";

const BasketPizzaItem = ({img, name, dough, size, price, count, id}) => {
    const dispatch = useDispatch()
    const orderPizzas = useSelector(state => state.pizza.orderPizzas)
    const currentPrice = useSelector(state => state.pizza.currentPrice)
    const totalCountOrderPizzas = useSelector(state => state.pizza.totalCountOrderPizzas)

    const plusCount = () => {
        dispatch(updateOrderPizzas({
            orderPizzas,
            pizzaId: id,
            dough: dough,
            size: size,
            currentPrice,
            totalCountOrderPizzas
        }))
    }

    const minusCount = () => {
        dispatch(updateOrderPizzas({
            orderPizzas,
            pizzaId: id,
            dough: dough,
            size: size,
            currentPrice,
            totalCountOrderPizzas,
            decrease: true
        }))
    }

    const removePizza = () => {
        dispatch(deletePizza({
            orderPizzas,
            pizzaId: id,
            dough: dough,
            size: size,
            currentPrice,
            totalCountOrderPizzas
        }))
    }

    return (
        <div className="basket__pizza pizza-basket">
            <div className="pizza-basket__left-side">
                <div className="pizza-basket__img"><img src={img} alt="pizzaImg"/></div>
                <div className="pizza-basket__action">
                    <p className="pizza-basket__name">{name}</p>
                    <p className="pizza-basket__description">{dough} тісто, {size} см.</p>
                </div>
            </div>
            <div className="pizza-basket__right-side">
                <div className="pizza-basket__count">
                    <button onClick={minusCount} disabled={count == 1} className="pizza-basket__button-count pizza-basket__button-count_minus"></button>
                    <span>{count}</span>
                    <button onClick={plusCount} className="pizza-basket__button-count"></button>
                </div>
                <p className="pizza-basket__price">{price} ₴</p>
                <button onClick={removePizza} type="button" className="pizza-basket__delete"></button>
            </div>
        </div>
    )
}


export default BasketPizzaItem
