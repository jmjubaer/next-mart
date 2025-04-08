import ManageProducts from '@/components/modules/shop/product';
import { getAllProducts } from '@/services/products';
import React from 'react';

const MangeProductPage = async() => {
    const { data } = await getAllProducts();
    return (
        <div>
            <ManageProducts products={data}/>
        </div>
    );
};

export default MangeProductPage;