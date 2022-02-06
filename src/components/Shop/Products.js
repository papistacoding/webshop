import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My First Book',
    description: 'The first book I ever wrote',
  },
  {
    id: 'p2',
    price: 5,
    title: 'My Second Book',
    description: 'The second book I ever wrote',
  },
];



const Products = (props) => {
  const [data, setData] = useState(DUMMY_PRODUCTS)
 
  useEffect(() => {
   
    const func = ()=>{
     
      
      fetch("https://back-37189-default-rtdb.europe-west1.firebasedatabase.app/data.json")
        .then(response => response.text())
        .then(result => setData(JSON.parse(result)))
        .catch(error => console.log('error', error));
    }
    func();

}, []);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {data.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={+product.price}
            promotion={product.promotion}
            
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
