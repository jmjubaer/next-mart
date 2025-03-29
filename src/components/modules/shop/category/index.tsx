import React from "react";
import CreateCategoryModal from "./CreateCategoryModal";

const ManageCategories = () => {
    return (
        <div>
            <div className='flex items-center justify-between '>
                <h2>Manage Category</h2>
                <CreateCategoryModal />
            </div>
        </div>
    );
};

export default ManageCategories;
