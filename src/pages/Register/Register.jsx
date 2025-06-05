import styles from './Register.module.css'

import { useState, useEffect } from 'react'

function Register() {
  return (
    <div>
      <h1>Cadastra-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>

      <form>
        <label>
          <span>Nome:</span>
          <input 
            type="text" 
            name='displayName' 
            required
            placeholder='Informe seu nome e um sobrenome'
          />
        </label>

        <label>
          <span>E-mail:</span>
          <input 
            type="email" 
            name='email' 
            required
            placeholder='Informe o seu e-mail'
          />
        </label>

        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name='password' 
            required
            placeholder='Informe a sua senha de acesso'
          />
        </label>

        <label>
          <span>Confirmação de senha:</span>
          <input 
            type="password" 
            name='confirmPassword' 
            required
            placeholder='Informe novamente a senha'
          />
        </label>

        <button className='btn'>Cadastrar</button>
      </form>
    </div>
  )
}

export default Register