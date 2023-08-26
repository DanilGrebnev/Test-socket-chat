import s from './s.module.css'
import { memo, useMemo } from 'react'
import cn from 'classnames'

export const MessageItem = memo(({ message, userName, id }) => {
    const myId = useMemo(() => localStorage.getItem('myId'), [])

    return (
        <li className={cn(s.messageItem, { [s.you]: myId === id })}>
            <p>{message}</p>
            <span>{myId === id ? 'вы' : userName}</span>
        </li>
    )
})
