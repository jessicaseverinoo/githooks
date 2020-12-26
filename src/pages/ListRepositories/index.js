import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { GoHeart, GoRepo } from "react-icons/go";

import github from '../../assets/images/github.svg'

const Container = styled.div`
  width: 90vw;
  max-width: 1400px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`

const WrapperCard = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: stretch;
  justify-content: center;
`

const Card = styled.div`
  width: auto;
  max-width: 320px;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid palevioletred;
  border-radius: 10px;
  margin-bottom: 1rem;
`

const FavoriteRepository = styled.div`
  position: relative;
`

const Span = styled.span`
  position: absolute;
  right: 1rem;
  font-size: 2rem;
  color: brown;
`

const Img = styled.img`
  display: block;
  width: 100%;
  height: 120px;
  position: relative;
`

const NameRepository = styled.h3`
  text-align: center;
  font-size: 1.4rem;
  color: palevioletred;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: palevioletred;
  border-radius: 10px;
  border: 2px solid palevioletred;
  font-size: 1.3rem;
  color: #fff;
  padding: 1em;

  > svg {
    margin-right: 10px;
  }
`

function ListRepositories() {
  const [repositories, setRepositories] = useState([])

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/jessicaseverinoo/repos')
    const data = await response.json()

    setRepositories(data)
  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `${filtered.length} favoritos`
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })

    setRepositories(newRepositories)
  }

  return (
    <Container>
      <Title>Lista de repositórios</Title>
      <WrapperCard>
        { repositories.map(repo => (
          <Card key={repo.id}>
            <FavoriteRepository>
              <Span>
                {repo.favorite && <span><GoHeart /></span>}
              </Span>
              <Img src={github} />
            </FavoriteRepository>
            <NameRepository>{repo.name}</NameRepository>
            <Button onClick={() => handleFavorite(repo.id)}><GoRepo />Favoritar</Button>          
          </Card>
        ))}
      </WrapperCard>
    </Container>
  )
}

export default ListRepositories;
