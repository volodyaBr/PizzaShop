import PizzaItem from "../PizzaItem/PizzaItem";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import {useEffect, useRef} from "react";
import {getPizzas} from "../../redux/pizzaSlice";

const Pizza = () => {
    const dispatch = useDispatch()
    const pizzas = useSelector(state => state.pizza.pizzas)
    const isLoading = useSelector(state => state.pizza.isLoading)
    const pizzaBlock = useRef()

    const handleScroll = (e) => {
        const blockHeight = e.target.documentElement.scrollHeight
        const scroll = e.target.documentElement.scrollTop
        const windowScroll = window.innerHeight

        if (windowScroll + scroll === blockHeight) {
            dispatch(getPizzas(true))
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll)

        return () => document.body.removeEventListener("scroll", handleScroll)
    }, [document])

    return (
        <div className="pizza">
            <div className="pizza__container container">
                <p className="pizza__title">Всі піцци</p>
                <div ref={pizzaBlock} className="pizza__row">
                    {
                        pizzas.length > 0 && pizzas.map((item, id) => {
                            let pizza = {...item}

                            return <PizzaItem key={id} pizzas={pizzas} img={pizza.img} name={pizza.name} id={pizza.id}
                                              dough={pizza.dough} size={pizza.size} price={pizza.price} initialSize="26"
                                              initialDough="thin"/>
                        })
                    }
                </div>
                {
                    isLoading && <Loader/>
                }
            </div>
        </div>
    )
}


export default Pizza
