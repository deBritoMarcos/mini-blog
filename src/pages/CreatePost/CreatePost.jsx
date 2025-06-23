import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext';
import { useInsertPost } from '../../hook/useInsertPost';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const { insertPost, response } = useInsertPost("posts");

  const { navigate } = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (formError) {
      return;
    }

    insertPost({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate('/');
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Postagem</h2>
      <p>Escreva sobre o que tem vontade e compartilhe com o mundo!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Pense num bom titulo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input 
            type="text" 
            name="image" 
            required 
            placeholder="Insira uma imagem que representa a sua postagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea 
            name="body" 
            required 
            placeholder="Insira o conteúdo da postagem"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            name="tags" 
            required 
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {!response.loading && <button className='btn'>Postar</button>}
        {response.loading && (
          <button className='btn' disabled>
            Aguarde...
          </button>
        )}

        {response.error && (
          <p className='error'>{response.error}</p>
        )}

        {formError && (
          <p className='error'>{formError}</p>
        )}
      </form>
    </div>
  )
}

export default CreatePost