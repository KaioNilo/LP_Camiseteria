import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <a href="#">Produtos</a>
                <a href="#">Frete</a>
                <a href="#">Sobre Nós</a>
            </nav>

            <img className={styles.logo} src="./src/assets/LogoRoxa.png" alt="Logo Oliveira Camiseteria" />

            <div className={styles.redes}>
                <span>
                    Fale com a gente →
                </span>
                <a href="#">
                    <img src="./src/assets/LogoInstagram.png" alt="Logo Instagram" />
                </a>
                <a href="#">
                    <img src="./src/assets/LogoWhatsapp.png" alt="Logo Whatsapp" />
                </a>
            </div>


        </header>
    )
}

export default Header;