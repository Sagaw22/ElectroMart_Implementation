import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const DOMAIN = process.env.REACT_APP_DOMAIN;
const GET_PRODUCT_RECOMMENDATIONS = process.env.REACT_APP_GET_PRODUCT_RECOMMENDATIONS;

const DEFAULT_RECOMMENDATIONS = [
  { title: "Default Product 1", imageUrl: "/images/default1.jpg", basePrice: 20, discountRate: 0, taxRate: 1 },
  { title: "Default Product 2", imageUrl: "/images/default2.jpg", basePrice: 25, discountRate: 0.1, taxRate: 1 },
  { title: "Default Product 3", imageUrl: "/images/default3.jpg", basePrice: 15, discountRate: 0.05, taxRate: 1 }
];

const Carousel = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async (retryCount = 3) => {
      try {
        const response = await axios.get(`${DOMAIN}${GET_PRODUCT_RECOMMENDATIONS}`);
        setProducts(response.data);

        // Cache the latest successful data
        localStorage.setItem("cachedRecommendations", JSON.stringify(response.data));
      } catch (error) {
        console.error(`Error fetching products. Retries left: ${retryCount}`, error);

        if (retryCount > 0) {
          setTimeout(() => fetchProducts(retryCount - 1), 1000); // Wait 1 sec, then retry
        } else {
          console.log("All retries failed, using cache or default recommendations.");

          // Check cache
          const cachedData = localStorage.getItem("cachedRecommendations");
          setProducts(cachedData ? JSON.parse(cachedData) : DEFAULT_RECOMMENDATIONS);
        }
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
        <Swiper modules={[Navigation]} navigation spaceBetween={50} slidesPerView={3}>
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
