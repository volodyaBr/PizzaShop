import {useEffect, useState} from "react";

const ClickChildrenElements = ({children, initialValue, handleChange, currentValue}) => {
    const [currentSelectedValue, setCurrentSelectedValue] = useState(initialValue)

    const handleClick = (e) => {
        const filterValue = e.target.getAttribute("data-filter-value")
        if (currentValue) {
            handleChange(filterValue)
        } else {
            setCurrentSelectedValue(filterValue)
        }
    }

    useEffect(() => {
        if (currentSelectedValue && !currentValue) {
            handleChange(currentSelectedValue)
        }
    }, [currentSelectedValue])

    return (
        children.map(item => {
            let elem = {...item}
            elem.props = {...item.props}

            elem.props.onClick = handleClick

            if (elem.props.className.includes("active")) {
                elem.props.className = elem.props.className.split(' ').filter(item => (item !== 'active')).join(' ');
            }

            const filterValue = elem.props["data-filter-value"]
            if (currentValue) {
                if (filterValue === currentValue) {
                    elem.props.className = elem.props.className + ` active`
                }
            } else {
                if (filterValue === currentSelectedValue) {
                    elem.props.className = elem.props.className + ` active`
                }
            }

            return elem
        })
    )
}


export default ClickChildrenElements
