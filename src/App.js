import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repo ${Date.now()}`,
      url: `http://github.com/repo-${Date.now()}`,
      techs: [
        'ReactJS',
        'Javascript',
      ]
    });

    const newRepo = response.data;

    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const filteredRepos = repositories.filter(repo => repo.id !== id)

    setRepositories(filteredRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repo => {
            return(
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
          })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
