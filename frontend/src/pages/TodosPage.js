import SideBar from "../components/SideBar"



export function TodosPage({ userData, loggedIn }) {
    
    const MainContent = () => (
        <div>
            <h1>Todos</h1>
        </div>
    )
    
    return (
        <SideBar mainContent={<MainContent />} userData={userData} />
    )
    


}