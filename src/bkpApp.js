import React, { useState, useEffect } from 'react'

function BkpApp() {
  const [repositories, setRepositories] = useState([
    { id: 1, name: 'repo-teste-1' },
    { id: 2, name: 'repo-teste-2' },
    { id: 3, name: 'repo-teste-3' },
    { id: 4, name: 'repo-teste-4' }
  ])

  function handleAddRepository() {
    setRepositories([
      ...repositories,
      { id: Math.random(), name: 'Novo Repositório' }])
  }

  return (
    <>
      <ul>
        { repositories.map(repo => <li key={repo.id}>{repo.id} - {repo.name}</li>) }
      </ul>
      <button onClick={handleAddRepository}>
        Adicionar Repositório
      </button>
    </>
  )
}

export default BkpApp;
