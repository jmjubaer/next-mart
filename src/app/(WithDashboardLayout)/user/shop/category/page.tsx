import ManageCategories from "@/components/modules/shop/category";
import { getAllCategory } from "@/services/category";

const ManageCategoryPage = async () => {
    const categories = await getAllCategory();
    console.log(categories);

    return (
        <div>
            <ManageCategories categories={categories?.data} />
        </div>
    );
};

export default ManageCategoryPage;
