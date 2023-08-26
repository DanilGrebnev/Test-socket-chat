import s from './s.module.css'
import cn from 'classnames'
import { useState } from 'react'

export const Input = ({ placeholder, className, ...props }) => {
    const [state, setState] = useState(false)

    const onBlur = (e) => {
        const value = e.target.value
        !value ? setState(false) : setState(true)
    }

    return (
        <label className={s.InputContainer}>
            <input
                className={cn(className, { [s.active]: state })}
                onBlur={onBlur}
                {...props}
            />
            {placeholder && <span>{placeholder}</span>}
        </label>
    )
}
