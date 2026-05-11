import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import Header from './Header'

const LoginPage = () => {
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData(prev=>({...prev, [name]:value}))

    }
    const handleSubmit = async(e)=>{ 
        e.preventDefault()
        setErrors('')
        try{
            const response = await fetch('http://127.0.0.1:8000/login/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username: formData.email,
                    password: formData.password
                })
            })
            if(!response.ok){
                const data = await response.json()
                throw new Error(data.error)
            }
            const data = await response.json()
            localStorage.setItem('token', data.token)
            navigate('/profile',{replace:true})
        }catch(error){
            setErrors(error.message)
            localStorage.removeItem('token')
        }
    }
  return (
    <div>
        <Header></Header>
        <div className='text-[50px] font-black text-center py-10'>
            <h2>Вход</h2>
        </div>

        <form action="form" className='p-20 bg-blue-300 flex flex-col items-center
        gap-5 rounded-[20px] mx-[30em]' onSubmit={handleSubmit}>
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
            
            <button className="bg-white w-[300px] h-[30px] hover:bg-blue-100 active:bg-blue-200
            rounded-[10px]">Submit</button>
        </form>
    </div>
  )
}

export default LoginPage