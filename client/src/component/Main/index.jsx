import React, { useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { Input } from '../Input'
import { socket } from '../../socket/socket'

export const Main = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('myId', socket.id)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const username = formData.get('username')
        const roomId = formData.get('roomId')

        localStorage.setItem('username', username)
        localStorage.setItem('roomId', roomId)

        navigate('/chat')
    }

    return (
        <section id='MainPage'>
            <form onSubmit={onSubmit}>
                <h2>Зайти в комнату</h2>
                <Input
                    required
                    name='username'
                    placeholder='Никнейм'
                />

                <Input
                    required
                    name='roomId'
                    placeholder='Id комнаты'
                />

                <button>Войти</button>
            </form>
        </section>
    )
}
