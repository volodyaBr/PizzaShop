import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3999"
})

export const getPizzaFromServer = (sortValue, filterValue, filterName, page) => {
    if (filterValue === "*" && filterName) return api.get(`pizzas?_sort=${sortValue}&name_like=${filterName}&_page=${page}&_limit=8`)
    else if (filterValue === "*") return api.get(`pizzas?_sort=${sortValue}&_page=${page}&_limit=8`)
    else if (filterName) return api.get(`pizzas?type=${filterValue}&_sort=${sortValue}&name_like=${filterName}&_page=${page}&_limit=8`)
    else return api.get(`pizzas?type=${filterValue}&_sort=${sortValue}&_page=${page}&_limit=8`)
}
