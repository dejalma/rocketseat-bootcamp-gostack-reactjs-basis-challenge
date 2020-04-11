import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const newProject = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }

    const response = await api.post('/repositories', newProject)

    setProjects([...projects, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 200 || response.status === 204) {
      const newProjects = [...projects]
      const projectDeletedIndex = newProjects.findIndex(repository => repository.id === id)
      newProjects.splice(projectDeletedIndex, 1)

      setProjects(newProjects)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
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
