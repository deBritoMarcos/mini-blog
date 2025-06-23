import styles from './Login.module.css'

import { useEffect, useState } from 'react';
import { useAuthentication } from '../../hook/useAuthentication';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login, error: authError, loading} = useAuthentication();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    const user = {
      email,
      password
    }

    const resp = await login(user);

    console.log(resp);
  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }

  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>

      <form onSubmit={handleSubmit}>
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

        {!loading && <button className='btn'>Acessar</button>}
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

export default Login