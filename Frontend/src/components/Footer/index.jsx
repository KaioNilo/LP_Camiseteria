import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>

            <img src="./src/assets/LogoBranca.png" alt="" />

            <span>
                    ® Oliverira Camiseteria
            </span>

            <div className={styles.redes}>
                <a href="#">
                    <img src="./src/assets/LogoInstagram.png" alt="Logo Instagram" />
                </a>
                <a href="#">
                    <img src="./src/assets/LogoWhatsapp.png" alt="Logo Whatsapp" />
                </a>
            </div>        
        </footer>
    )
}

export default Footer;