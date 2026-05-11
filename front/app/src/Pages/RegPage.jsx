import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const RegPage = () => {
    // ошибка выдается в ввиде строки
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()
    // создание полей формы
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    })

    const handleChange = (e)=>{
        // 
        const {name, value} = e.target 
        // ... это как props (наследование), привязка value к name 
        setFormData({...formData, [name]:value})
    }
    // константа асинхронной функции отправки данных
    const handleSubmit = async(e)=>{
        // обрабатывается отключая стандартные пути отступления
        e.preventDefault()
        try{
            // ожидает ответа сервера
            const response = await fetch('http://127.0.0.1:8000/register/', {
                // метод отправка
                method: 'POST',
                headers:{
                    // тип контента джсон
                    'Content-Type':'application/json'
                },

                // метод стрингфай превращает в текстовый формат
                body:JSON.stringify({
                    // конкретные поля
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                })
            })
            // если нет ответа то ожидаем ответа в формате джсон и отправляем ошибку
            if(!response.ok){
                    const data = await response.json()
                    throw new Error(data.error)

                // иначе переносит на логин
                }else{ 
                    const data = await response.json()
                    localStorage.setItem('token', data.token)
                    navigate('/login')
                }
        // отправляет ошибку
        }catch(error){
            setErrors(error.message)
        }
    }
  return (
    <div>
        {<Header></Header>}
        <div className='text-[50px] font-black text-center py-10'>
            <h2>Регистрация</h2>
        </div>

        <form action="form" className='p-20 bg-blue-300 flex flex-col items-center
        gap-5 rounded-[20px] mx-[30em]' onSubmit={handleSubmit}>
            <input type="text" 
            name='username'
            placeholder='ФИО'
            onChange={handleChange}
            value={formData.username}
            required
            className='text-black w-[300px] h-[50px] rounded-[10px]
            p-4' />

            <input type="email" 
            name='email'
            placeholder='Email'
            onChange={handleChange}
            value={formData.email}
            required
            className='text-black w-[300px] h-[50px] rounded-[10px]
            p-4' />

            <input type="password" 
            name='password'
            placeholder='Пароль'
            onChange={handleChange}
            value={formData.password}
            required
            className='text-black w-[300px] h-[50px] rounded-[10px]
            p-4' />

            <input type="text" 
            name='phone'
            placeholder='Телефон'
            onChange={handleChange}
            value={formData.phone}
            required
            className='text-black w-[300px] h-[50px] rounded-[10px]
            p-4' />
            
            <button className="bg-white w-[300px] h-[30px] hover:bg-blue-100 active:bg-blue-200
            rounded-[10px]">Submit</button>
        </form>

    </div>
  )
}

export default RegPage