import { Route, Routes } from 'react-router-dom'
import { Main } from './component/Main'
import { ChatPage } from './component/Chat'

export const App = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<Main />}
            />
            <Route
                path='/chat'
                element={<ChatPage />}
            />
        </Routes>
    )
}
