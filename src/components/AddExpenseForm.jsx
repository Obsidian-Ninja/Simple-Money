import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";

const AddExpenseForm = ({onAddExpense, categories}) => {
    
    const [expense, setExpense] = useState({
        name,
        categoryId: "",
        amount: "",
        date: "",
        icon: ""
    });

    useEffect(() => {
        if(categories && categories.length > 0 && !expense.categoryId){
            setExpense((prev) => ({...prev, categoryId: categories[0].id}));
        }
    }, [categories, expense.categoryId]);

    const handleChange = categories.map((cat) => ({
        value: cat.id,
        label: `${cat.name}`,
    }));
    
    return (
        <div>
            <EmojiPickerPopup 
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={({target}) => handleChange("name", target.value)}
                label="Income Source"
                placeholder="e.g., Electricity, Wifi"
                type="text"
            />

             <Input
                value={expense.categoryId}
                onChange={({target}) => handleChange("categoryId", target.value)}
                label="Category"
                isSelect={true}
                options={categoryOptions}
            />

             <Input
                value={expense.amount}
                onChange={({target}) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="e.g., 150.00"
                type="number"
            />

             <Input
                value={expense.date}
                onChange={({target}) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(expense)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm;