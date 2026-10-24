import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {useUser} from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import Dashboard from "../components/Dashboard.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";

const Expense = () => {
    useUser();
    const navigate = useNavigate();
    const [exenseData, setExpenseData] = useState([]);
    //New state for expense categories
    const [categories, setCategories] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    //Get all the Expense details
    const fetchExpenseDetails = async () => {
        // Prevents multiple fetches if already loading
        if(loading) return; 

        try {
            const response = axiosConfig.get(
                `${API_ENDPOINTS.GET_ALL_EXPENSE}`
            );

            if(response.date) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense data. Please try again in some time.", error);
            toast.error("Failed to fetch expense details.");
        } finally {
            setLoading(false);
        }
};


    // Fetch expense categories
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(
                // Fetch categories of type expense
                API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
            );

            if(response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense categories. Please try again in some time.", error);
            toast.error("Failed to fetch expense categories. Please try again in some time.");
        }
    };

    // Handle add expense
    const handleAddExpense = async (expense) => {

        // changed category to categoryId
        const {name, categoryId, amount, date, icon } = expense;

        if(!name.trim()){
            toast.error("Name is a required field.");
            return;
        }

        // Validation checks
        if(!categoryId){
            toast.error("Category is a required field.");
            return;
        }

        if(!categoryId){
            toast.error("Category is a required field.");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if(!date){
            toast.error("Date is a required field.");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if(date > today){
            toast.error("Date cannot be in the future.");
            return;
        }

        try {
            
        } catch (error) {
            console.error("Error adding expense: ", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to add expense. Please try again in some time.");
        }
    };

    // Delete expense
    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));

            setOpenDeleteAlert({show: false, data: null});
            toast.success("Expense details deleted successfully! 🎉");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error deleting the expense. Please try again in some time.",
                error.response?.data?.message || error.message
            );
            toast.error(error.response?.data?.message || "Failed to delete expense. Please try again in some time.");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = axiosConfig.get(
                // Ensure this path is correct ("/download/income")
                API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
                {
                    // !IMP : tells axios to expect binary data
                    responseType: "blob",
                }
            );

            // Extract filename from content-disposition header, or use a default
            let fileName = "expense_details.xlsx"; // default file name

            // create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            // use the extracted or default file name
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            // programmatically click the link to trigger download
            link.click();
            // cleanup the link element
            link.parentNode.removeChild(link);
            // release the object URL
            window.URL.revokeObjectURL(url);

            toast.success("Expense Details downloaded successfully! 🎉");

        } catch (error) {
            console.error("Error downloading the expense details: ", error);
            toast.error("Failed to download expense details. Please try again in some time.");
        }
    }

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if(response.status === 200) {
                toast.success("Email sent successfully! 🎉");
            }
        } catch (error) {
            console.error("Error emailing the expense details: ", error);
            toast.error("Failed to email expense details. Please try again in some time.");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        // Fetch the categories when the component mounts
        fetchExpenseCategories();
    }, []);


    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview 
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenExpenseModal(true)}
                        />
                    </div>

                    <ExpenseList 
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({show: true, data: id});
                        }}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                    >

                        {/* Pass the fetched expense categories to the AddExpense Form */}
                        <AddExpenseForm 
                            onAddExpense={handleAddExpense}
                            // pass the categories here
                            categories={categories}
                        />
                        
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense detail?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>

                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}    

export default Expense;