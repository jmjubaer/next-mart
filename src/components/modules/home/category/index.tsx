import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { getAllCategory } from "@/services/category";
import { TCategory } from "@/types";
import Link from "next/link";

const Category = async () => {
    const { data: categories } = await getAllCategory();
    console.log(categories);
    return (
        <div className='container mx-auto my-20'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Category</h2>
                <Link href='/products'>
                    <Button variant='outline' className='rounded-full'>
                        View All
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-6 gap-8 my-5">
        {Array(12)
          .fill(categories?.[0])
          .map((category: TCategory, idx: number) => (
            <CategoryCard key={idx} category={category} />
          ))}
      </div>
        </div>
    );
};

export default Category;
