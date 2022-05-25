import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiLinkedin } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import api from "./services/api";
import "./style.css"

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState<any>({})

  async function handleSearch() {
    if(input === '') {
      alert("O campo de busca não pode estar vazio.")
      return;
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert("CEP inexistente. Por favor, tente novamente.")
      setInput('')  
      
  }
}

async function handleClearCEP() {
    await setCep('')  
}

  return (
    <div className="container">
      <header className="header">      
        <a href="#"><FiGithub className="stroke" size={25}/></a>
        <a href="#"><FiLinkedin className="stroke" size={25}/></a>
      </header>


      <h1 className="title">Buscador de CEP</h1>

      <div className="ctn-input">
        <input 
          id="submit"
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />  
        <button className="btn-search" onClick={handleSearch}>
          <BiSearchAlt/>
        </button>
      </div> 
          
    {Object.keys(cep).length > 1 && (
       <>
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
                
          <span>{cep.logradouro}</span>
          <span>Bairro {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

        <button className="btn-clear" onClick={handleClearCEP}>
              Limpar Pesquisa
        </button>
      </>
    )}

      <footer>
        
        <span>Desenvolvido por Christian Leonardo</span>
      </footer>

    </div>
  )
}

export default App;
