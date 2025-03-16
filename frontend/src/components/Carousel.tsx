import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation'; // navigation module
const DOMAIN = process.env.REACT_APP_DOMAIN;
const GET_PRODUCT_RECOMMENDATIONS = process.env.REACT_APP_GET_PRODUCT_RECOMMENDATIONS;




const Carousel = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${DOMAIN}${GET_PRODUCT_RECOMMENDATIONS}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="content-container">
      <h2>Recommended Products!</h2>

      {products.length === 0 ? (
        <p>Unable to get recommended products...</p>
      ) : (
        <Swiper modules={[Navigation]}
          navigation spaceBetween={50} slidesPerView={3}>
          {products.map((product) => (
            <SwiperSlide key={product.title}>
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <h3>{product.title}</h3>
              <p>Price: ${Math.round(product.basePrice * (1 - product.discountRate) * product.taxRate)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

    </div>
  );
};

export default Carousel;
