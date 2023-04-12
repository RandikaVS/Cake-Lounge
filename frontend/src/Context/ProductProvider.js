
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ProductContext = createContext();

const ProductProvider = ({children}) => {

    const[selectedProduct,setSelectedProduct]=useState();

    const history = useHistory();


  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
};
export const ProductState = () => {
  return useContext(ProductContext);
};


export default ProductProvider
