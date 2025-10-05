import './App.css'

function App() {

  return (
    <>
      <div className='container'>

        <div className='header'>
          HEADER
        </div>
        
        <div className='banner'>
          BANNER
        </div>

        <div className='produtos'>
          PRODUTOS
        </div>

        <div className='frete'>

          <div className='imgFrete'>
            IMG CHAMATIVA
          </div>

          <div className='conteudoFrete'>
            <h1>Simular frete</h1>
          
            <div className='cep'>
              <input type='text' placeholder='CEP'/>
              <button type='submit'>Calcular</button>
            </div>

            <div className='retorno'>
              <div className='resultado'>
                <p>Endereço Completo</p>
                <h2>R$ 39,90</h2>
              </div>

              <button className='botaoWpp' type='submit'>Encaminhar para whatsapp da loja</button>
            </div>


          </div>
          

        
        </div>

        <div className='sobre'>
          SOBRE
        </div>

        <div className='detalhes'>
          DETALHES
        </div>

        <div className='footer'>
          FOOTER
        </div>
        
      </div>
    </>
  )
}

export default App
