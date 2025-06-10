import { useAuthentication } from '../../hook/useAuthentication';
import styles from './Register.module.css'

import { useState, useEffect } from 'react'

function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError("As senhas informadas não são iguais!");

      return;
    }

    const user = {
      displayName,
      email,
      password
    }

    const resp = await createUser(user);

    console.log(resp);
  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }

  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastra-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input 
            type="text" 
            name='displayName' 
            required
            placeholder='Informe seu nome e um sobrenome'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>

        <label>
          <span>E-mail:</span>
          <input 
            type="email" 
            name='email' 
            required
            placeholder='Informe o seu e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name='password' 
            required
            placeholder='Informe a sua senha de acesso'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          <span>Confirmação de senha:</span>
          <input 
            type="password" 
            name='confirmPassword' 
            required
            placeholder='Informe novamente a senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && (
          <button className='btn' disabled>
            Aguarde...
          </button>
        )}

        {error && (
          <p className='error'>{error}</p>
        )}
        
      </form>
    </div>
  )
}

export default Register