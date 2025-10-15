import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
    // Formatar Preço
    const formatPrice = (price) => {
        return `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
    };

    return (
        <div className={styles.card}>
            <img 
                src={product.image} 
                alt={product.name} 
                className={styles.image} 
            />
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                
                <p className={styles.price}>{formatPrice(product.price)}</p>
                
                <div className={styles.sizes}>
                    <strong>Tamanhos: </strong>
                    {product.size.map(s => (
                        <span key={s} className={styles.sizeTag}>{s}</span>
                    ))}
                </div>
                
                <button className={styles.ctaButton}>Ver Detalhes</button>
            </div>
        </div>
    );
}

export default ProductCard;