import React, { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/Products/GenderCollectionSection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturesSection from '../components/Products/FeaturesSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        // Fetch products for a specific collection
        dispatch(
            fetchProductsByFilters({
                gender: "Women",
                category: "Top Wear",  // Change from "Bottom Wear" to "Top Wear"
                limited: 8,
            })
        );
        // Fetch best seller product
        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBestSeller();
    }, [dispatch]);

    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />

            <h2 className='text-3xl text-center font-bold mt-10 mb-4'>Best Seller</h2>
            {bestSellerProduct ? (
                <ProductDetails productId={bestSellerProduct._id} />
            ) : (
                <p className='text-center'>Loading best seller products...</p>
            )}
            <div className='container mx-auto'>
                {/* <h2 className='text-3xl text-center font-bold mb-4'>Top Wears For Women</h2> */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
            <FeaturedCollection />
            <FeaturesSection />
        </div>
    );
};

export default Home;
