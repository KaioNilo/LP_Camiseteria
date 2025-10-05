import styles from './Simulation.module.css'

function Simulation() {
    return (
        <div className={styles.simulation}>

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
    )
}

export default Simulation;