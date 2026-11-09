import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({ balanceData, totalBalance, COLORS }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;