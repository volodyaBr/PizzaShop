import Select from "../Select/Select";
import ClickChildrenElements from "../ClickChildrenElements/ClickChildrenElements";
import {getPizzas, setCurrentPage, setFilterValue, setSortValue} from "../../redux/pizzaSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

const SortBar = (props) => {
    const dispatch = useDispatch()
    const sortValue = useSelector(state => state.pizza.sortValue)
    const filterValue = useSelector(state => state.pizza.filterValue)

    const handleChangeSort = (value) => {
        dispatch(setSortValue(value))
    };

    const handleChangeFilter = (value) => {
        dispatch(setFilterValue(value))
    }

    useEffect(() => {
        if (sortValue && filterValue) {
            dispatch(setCurrentPage(1))
            dispatch(getPizzas())
        }
    }, [sortValue, filterValue, dispatch])

    return (
        <div className="main__sort-bar sort-bar">
            <div className="sort-bar__container container">
                <ul className="sort-bar__menu">
                    <ClickChildrenElements initialValue="*" handleChange={handleChangeFilter}>
                        <li data-filter-value="*" className="sort-bar__item">Всі</li>
                        <li data-filter-value="meat" className="sort-bar__item">М'ясні</li>
                        <li data-filter-value="vegetable" className="sort-bar__item">Вегетаріанські</li>
                        <li data-filter-value="grill" className="sort-bar__item">Гриль</li>
                        <li data-filter-value="spicy" className="sort-bar__item">Гострі</li>
                        <li data-filter-value="close" className="sort-bar__item">Закриті</li>
                    </ClickChildrenElements>
                </ul>
                <Select handleChange={handleChangeSort}/>
            </div>
        </div>
    )
}


export default SortBar
