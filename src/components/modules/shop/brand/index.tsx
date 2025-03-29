import React from "react";
import CreateBrandModal from "./CreateBrandModal";

const ManageBrands = () => {
    return (
        <div>
            <div className='flex items-center justify-between '>
                <h2>Manage Brand</h2>
                <CreateBrandModal />
            </div>
        </div>
    );
};

export default ManageBrands;
