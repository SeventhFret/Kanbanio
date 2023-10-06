import SideBar from "../components/SideBar"


export function NotesPage({ userData, loggedIn }) {
    const MainContent = () => (
        <div>
            <h1>Notes</h1>
        </div>
    )

    return (
        <SideBar mainContent={<MainContent />} userData={userData} />
    )
}