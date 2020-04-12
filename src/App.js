import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }

    const response = await api.post('/repositories', newRepository)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 200 || response.status === 204) {
      const newRepositories = [...repositories]
      const repositoryDeletedIndex = newRepositories.findIndex(repository => repository.id === id)
      newRepositories.splice(repositoryDeletedIndex, 1)

      setRepositories(newRepositories)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
