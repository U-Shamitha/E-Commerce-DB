import React, { useContext, useEffect, useState } from 'react';
import SearchBar from './Search/SearchBar'
import StarRating from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSideBarOpen } from '../redux/filterOptionsSlice';
import { primaryColor } from '../values/color';
import { setActiveTab } from '../redux/userSlice';

const ProductGrid = () => {

  const [products, setProducts] = useState([]);
  let filteredProducts = products;
  const { sortOption, productName, productCategory, productBrand, priceRange: selectedPrices, ratingRange: selectedRatingRange, quantity: selectedQuantity }= useSelector((state)=> state.filterOptions);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    //Open side bar
    dispatch(setActiveTab("product"));
    dispatch(setIsSideBarOpen(true));

    // Fetch products 
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {setProducts(data.products); setLoading(false)})
      .catch((error) => console.error('Error fetching products:', error));

  }, []);

  const handleSortAndFilters = () => {
    console.log("Product Name: ", productName)
    // console.log("Product Category: ", productCategory)
    // console.log("Product Brand: ", productBrand)
    
    let newFilteredProducts = products.filter((product)=> product.title.toLowerCase().includes(productName.toLowerCase()));

    newFilteredProducts = newFilteredProducts.filter((product)=> product.category.toLowerCase().includes(productCategory.toLowerCase()));

    newFilteredProducts = newFilteredProducts.filter((product)=> product.brand.toLowerCase().includes(productBrand.toLowerCase()));

    if(selectedPrices.length>0){
      newFilteredProducts = newFilteredProducts.filter((product) => {
        // console.log(selectedPrices.some((selectedPrice) => product.price >= selectedPrice.value.start && product.price <= selectedPrice.value.stop))
        return selectedPrices.some((selectedPrice) => 
        {
          const productDiscountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
          if(selectedPrice.value.start)
          {
            if(selectedPrice.value.stop){
             return productDiscountedPrice >= selectedPrice.value.start && productDiscountedPrice <= selectedPrice.value.stop
            }else{
              return productDiscountedPrice >= selectedPrice.value.start
            }
          }else{
            if(selectedPrice.value.stop){
              return productDiscountedPrice <= selectedPrice.value.stop
            }
          }
        });
      });
      newFilteredProducts = [...newFilteredProducts].sort((a, b) => 
        {
          const aDisPrice = a.price * (1 - a.discountPercentage / 100)
          const bDisPrice = b.price * (1 - b.discountPercentage / 100)
          return aDisPrice - bDisPrice
        }
      ); 
    }
    if(selectedRatingRange.value.start){
      newFilteredProducts = newFilteredProducts.filter((product) => 
          product.rating >= selectedRatingRange.value.start
      );
      newFilteredProducts = [...newFilteredProducts].sort((a, b) => a.rating - b.rating);
    }
    if(selectedQuantity){
      newFilteredProducts = newFilteredProducts.filter((product) => 
          product.stock >= selectedQuantity
      );
      newFilteredProducts = [...newFilteredProducts].sort((a, b) => a.stock - b.stock);
    }

    if(sortOption.value){
      newFilteredProducts = [...newFilteredProducts].sort((a, b) => 
        {
          if(typeof a[sortOption.value]  === 'string' &&  typeof b[sortOption.value]  === 'string') {
            return  a[sortOption.value].localeCompare(b[sortOption.value]);
          }
          else if(sortOption.value==="rating"){
            return b[sortOption.value] - a[sortOption.value]
          }
          return a[sortOption.value] - b[sortOption.value]
        }
      );
    }

    filteredProducts = newFilteredProducts;
  }
   
  handleSortAndFilters();

  return (
    <div style={{paddingBottom:'20px',marginTop:'0px'}}>
    {!loading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6 m-auto p-10">
      {filteredProducts && filteredProducts.map((product) => (
        <div key={product.id} className="flex flex-col gap-2 h-full bg-white p-8 rounded" style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', maxWidth:'350px'}}>
          <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-4" />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600 text-sm"><span style={{color:'black'}}>Category: </span>{ product.category}</p>
          <p className="text-gray-600 text-sm "><span style={{color:'black'}}>Brand: </span>{product.brand}</p>
          <p className="text-gray-600 text-sm "><span style={{color:'black'}}>Available Quantity: </span>{product.stock}</p>
          <p className="text-gray-600 text-sm ">{product.description}</p>
          <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
            <p className="mt-1" style={{color:primaryColor}}>${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
            <del className="mt-2 text-red-500">${(product.price).toFixed(2)}</del>
          </div>
          <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
            <p className="text-sm text-gray-500"><span style={{color:'black'}}>Rating: </span>{product.rating}</p>
            <div className='mt-1' style={{display:'block'}}><StarRating rating={product.rating}/></div>
          </div>
        </div>
      ))}
    </div>
    :<div>
      <p className='p-20 text-lg text-base'>Loading...</p>
    </div>}
    </div>
  );
};

export default ProductGrid;
