import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Plus} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModel] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if(loading) return;

        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            
        } catch (error) {
            console.error('Something went wrong. Please try again in some time', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchCategoryDetails();
    }, [])

    const handleAddCategory = async (category) => {
        const {name, type, icon} = category;

        if(!name.trim()){
            toast.error("Category Name is a required field");
            return ;
        }

        //checking if the category already exists
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowercase() === name.trim().toLowerCase();
        })

        if(isDuplicate) {
            toast.error("Category Name already exists! Please try again.");
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            if(response.status === 201) {
                toast.success("Category added successfully!🎉 ");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error){
            console.error("Error adding Category. Please try again in some time :", error);
            toast.error(error.response?.data?.message || "Failed to add Category.");
        }
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if(!name.trim()){
            toast.error("Category Name is a required field");
        }

        if(!id){
            toast.error("Category ID is missing");
        }

        try {
            await axiosConfig.post(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModel(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully! 🎉");
            fetchCategoryDetails();
        } catch (error) {
            console.error('Error updating the category. Please try again in some time', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category. Please try again in some time.");
        }
    }

    return (
        
        <>
            <Dashboard activeMenu="Category">
                <div className="my-5 mx-auto">
                    {/* ADD BUTTON TO ADD CATEGORY */}
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold">All Catefgories</h2>
                        <button 
                            className="add-btn flex items-center gap-1"
                            onClick={()=> setOpenAddCategoryModal(true)}
                            >
                             <Plus size={15} />
                            Add Category
                        </button>
                    </div>

                    {/* CATEGORY LIST */}
                    <CategoryList categories= {categoryData} openEditCategory={handleEditCategory} />

                        {/* ADDING CATEGORY MODALS */}
                        <Modal
                        isOpen={openAddCategoryModal}
                        onClose={() => 
                            setOpenAddCategoryModal(false)
                        }
                        title="Add Category"
                        >
                            <AddCategoryForm openAddCategory={handleAddCategory} />   
                        </Modal>

                        {/* UPDATING CATEGORY MODEL */}
                        <Modal
                        onClose={()=>{
                            setOpenEditCategoryModel(false);
                            setSelectedCategory(null);
                        }}
                        isOpen={openEditCategoryModal}
                        title="Update Category"
                        >
                            <AddCategoryForm 
                            initialCategoryData={selectedCategory}
                            openAddCategory={handleUpdateCategory}
                            isEditing={true}
                            />
                        </Modal>
                </div>
            </Dashboard>
        </>
    )
}

export default Category;