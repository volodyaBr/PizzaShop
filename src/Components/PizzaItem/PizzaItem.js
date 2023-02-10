import ClickChildrenElements from "../ClickChildrenElements/ClickChildrenElements";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addOrderPizzas, updateOrderPizzas} from "../../redux/pizzaSlice";
import {useEffect} from "react";

const PizzaItem = ({id, dough, pizzas, img, price, size, name, initialSize, initialDough}) => {
    const dispatch = useDispatch()
    const [currentDough, setCurrentDough] = useState(initialDough)
    const [currentSize, setCurrentSize] = useState(initialSize)
    const [countOrders, setCountOrders] = useState(null)
    const orderPizzas = useSelector(state => state.pizza.orderPizzas)
    const currentPrice = useSelector(state => state.pizza.currentPrice)
    const totalCountOrderPizzas = useSelector(state => state.pizza.totalCountOrderPizzas)

    useEffect(() => {
        setCurrentSize(initialSize)
        setCurrentDough(initialDough)
    }, [id])

    const handleChangeSize = (value) => {
        setCurrentSize(value)
    }

    const handleChangeDough = (value) => {
        setCurrentDough(value)
    }

    const addPizza = () => {
        let pizza = null;
        orderPizzas.forEach(item => {
            if (item && item.pizzaId === id && item.dough === currentDough && item.size === currentSize) {
                pizza = {...item}
            }
        })

        if (!pizza) {
            const dough = currentDough
            const size = currentSize

            pizza = {
                name,
                pizzaId: id,
                img,
                price,
                size,
                dough,
                count: 1,
                totalPrice: price
            }
            dispatch(addOrderPizzas({orderPizzas, pizza, currentPrice, totalCountOrderPizzas}))
        } else {
            dispatch(updateOrderPizzas({
                orderPizzas,
                pizzaId: id,
                dough: currentDough,
                size: currentSize,
                currentPrice,
                totalCountOrderPizzas
            }))
        }
    }

    useEffect(() => {
        if (orderPizzas.length) {
            let countPizza = null
            orderPizzas.forEach(pizza => {
                if (pizza.pizzaId === id && pizza.size === currentSize && pizza.dough === currentDough) {
                    countPizza = pizza.count
                }
            })
            setCountOrders(countPizza)
        }
    }, [orderPizzas, pizzas, currentSize, currentDough])


    return (
        <div className="pizza-item">
            <div className="pizza-item__img"><img src={img} alt="pizzaImage"/></div>
            <p className="pizza-item__title">{name}</p>
            <div className="pizza-item__filter filter-pizza">
                <div className="filter-pizza__top">
                    <ClickChildrenElements currentValue={currentDough} handleChange={handleChangeDough}>
                        <button data-filter-value="thin" disabled={!dough.thin}
                                className="filter-pizza__item">тонке
                        </button>
                        <button data-filter-value="tradition" disabled={!dough.tradition}
                                className="filter-pizza__item">традиційне
                        </button>
                    </ClickChildrenElements>
                </div>
                <div className="filter-pizza__bottom">
                    {
                        <ClickChildrenElements handleChange={handleChangeSize} currentValue={currentSize}>
                            <button data-filter-value="26" disabled={!size["26"]}
                                    className="filter-pizza__item">26
                                см.
                            </button>
                            <button data-filter-value="30" disabled={!size["30"]}
                                    className="filter-pizza__item">30
                                см.
                            </button>
                            <button data-filter-value="40" disabled={!size["40"]}
                                    className="filter-pizza__item">40
                                см.
                            </button>
                        </ClickChildrenElements>
                    }
                </div>
            </div>
            <div className="pizza-item__action">
                <p className="pizza-item__price">від {price} ₴</p>
                <button onClick={addPizza} className="pizza-item__add-item icon-plus">Добавити {countOrders &&
                    <span>{countOrders}</span>}</button>
            </div>
        </div>
    )
}


export default PizzaItem
