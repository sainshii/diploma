import React, { useEffect, useState } from 'react'
import { replace, useNavigate } from 'react-router-dom'
import Header from './Header'

const Profile = () => {
    // загрузка страницы профиля
    const [loading, setloading] = useState(true)
    // юзер, null - данные еще не загружены
    const [user, setUser] = useState(null)
    // ошибки, выдаются в виде строки
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                // берем токен из локального хранилища
                const token = localStorage.getItem('token')
                // если нет токена перекидывает на страницу логина
                if (!token){
                    navigate('/login')
                    return
                }
                // ждем ответа с сервера
                const response = await fetch('http://127.0.0.1:8000/profile/',{
                    headers:{
                    // тип токена: авторизация
                    'Authorization':`Token ${token}`,
                    // тип контента
                    'Content-Type': 'application/json',
                    }
                })
                // если ответа нет выдается ошибка
                if(!response.ok){
                    throw new Error('Запрос не дошел')
                }
                // ждем ответа с данными и засовываем в юзера
                const data = await response.json()
                setUser(data)
            // ловим ошибку
            }catch(error){
                // в случае ошибки удаляется токен и перебрасывает на страницу с логином
                setError(error.message)
                localStorage.removeItem('token')
                navigate('/login')
            // завершаем загрузку страницы
            }finally{
                setloading(false)
            }
        }
        // фетч дата начинает работать
        fetchData()
        // чтоб если из профиля переходили на другую страницу профиль не сбрасывался
    }, [navigate])

    // выйти
    const Logout=()=>{
        // удаляется токен
        localStorage.removeItem('token')
        // replace нужен для того чтоб при нажатии на стрелочку назад после выхода из профиля не перебрасывало обратно в профиль
        navigate('/', {replace:true})
    }

  return (
    <div>
        {<Header></Header>}
        {/* безопасный доступ к юзернейму */}
        <h2>{user?.username}</h2>
        <button onClick={Logout}>Exit</button>
    </div>
  )
}

export default Profile