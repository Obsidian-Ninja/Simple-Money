import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";

const Dashboard = ({activeMenu, user, children}) => {
    return (
        <div>
            <Menubar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <Sidebar activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>

            )}
        </div>
    )
}

export default Dashboard;