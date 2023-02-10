import arrow from "../../assets/icons/arrow.svg"
import {useEffect, useState} from "react";


const options = [
    {
        value: 'popular',
        label: 'популярністю',
    },
    {
        value: 'price',
        label: 'ціною',
    },
    {
        value: 'name',
        label: 'алфавітом',
    },
]

const Select = ({handleChange}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentOption, setCurrentOption] = useState(null)
    const [currentOptionId, setCurrentOptionId] = useState(0)

    useEffect(() => {
        if (options.length) setCurrentOption(options[0])

        document.body.addEventListener("click", handleClose)
        return () => document.body.removeEventListener("click", handleClose)
    }, [])

    useEffect(() => {
        if (currentOption) {
            handleChange(currentOption.value)
        }
    }, [currentOption])

    const handleClose = (e) => {
        if (!e.target.closest("select") && !e.target.closest(".select__text")) {
            setIsOpen(false)
        }

    }

    const handleClickOption = (e) => {
        const optionId = Number(e.target.getAttribute("data-option-id"))

        options.map((option, id) => {
            if (optionId === id) {
                setCurrentOptionId(id)
                setCurrentOption(option)
            }
        })
    }

    const handleClickSelect = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div onClick={handleClickSelect}  className={`sort-bar__select select ${isOpen ? "active" : ""}`}>
            <div className="select__text"><img src={arrow} alt=""/>Сортуровати за: <span>{currentOption && currentOption.label}</span></div>
            <ul className={"select__options"}>
                {
                    options.map((option, id) => {
                        return <li onClick={handleClickOption} data-option-id={id} key={id} className={`select__option ${currentOptionId === id && "active"}`}>{option.label}</li>
                    })
                }
            </ul>
        </div>
    )
}


export default Select
