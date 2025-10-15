import ProductCard from "../ProductCard"; 
import styles from './ProductSection.module.css';


function ProductSection({ products }) {
    return (
        <section className={styles.productSection}>
            {products}
        </section>
    );
}

export default ProductSection;