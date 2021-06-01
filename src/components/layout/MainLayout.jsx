import React from 'react'
import classes from './layout.module.css';

export default function MainLayout(props) {
    return (
        <div className={classes.MainLayout}>
            {props.children}
        </div>
    )
}
