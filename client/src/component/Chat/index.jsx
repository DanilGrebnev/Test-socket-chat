import s from './s.module.css'
import { useNavigate } from 'react-router'
import { socket } from '../../socket/socket'
import { useEffect, useMemo, useState } from 'react'
import { MessageItem } from './components/MessageItem'
import { v4 as uuid } from 'uuid'

export const ChatPage = () => {
    const navigate = useNavigate()
    const [messageData, setMessageData] = useState([])

    const userName = useMemo(() => localStorage.getItem('username'), [])
    const roomId = useMemo(() => localStorage.getItem('roomId'), [])

    useEffect(() => {
        if (!userName || !roomId) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        socket.on('response', (data) => {
            setMessageData((prev) => [...prev, data])
        })
    }, [])

    console.log(messageData)

    const handleLeave = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('roomId')

        navigate('/')
    }

    const sendMessage = (e) => {
        e.preventDefault()
        const form = e.target

        const message = new FormData(form).get('message')

        if (message.trim() && userName) {
            socket.emit('message', {
                id: socket.id,
                message,
                userName,
            })
        }
    }

    return (
        <section
            id='Chat'
            className={s.chat}
        >
            <div className={s.sidebar}>
                <h3>Участники</h3>
                <div className={s.members}></div>
                <button onClick={handleLeave}>Покинуть чат</button>
            </div>
            <ul className={s.chatBody}>
                {messageData.map((item) => {
                    return (
                        <MessageItem
                            {...item}
                            key={uuid()}
                        />
                    )
                })}
            </ul>

            <form
                className={s.form}
                onSubmit={sendMessage}
            >
                <input
                    name='message'
                    placeholder='Введите сообщение'
                />
                <button>отправить</button>
            </form>
        </section>
    )
}
