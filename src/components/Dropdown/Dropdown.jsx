import React from 'react'
import classes from './Dropdown.module.css'

export default function Dropdown({elements, value, onClick, id}) {
    return (
        <ul className={classes.Dropdown}>
            {elements?.map((elem, i) => <li key={`${elem}_${i}`} onClick={() => onClick(id[i])}>{elem[value]}</li>)}
        </ul>
    )
}
