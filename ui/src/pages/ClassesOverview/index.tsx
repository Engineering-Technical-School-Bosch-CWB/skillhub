import ExplorerContainer from "../../components/ExplorerContainer"
import IIdentificationCardProps from "../../components/ExplorerContainer/Components/IdentificationCard/interfaces"
import Header from "../../components/Header"

const data: IIdentificationCardProps[] = [
    {
        color: "#312",
        goTo: '01',
        icon: 'group',
        iconDetails: "12",
        subtitle: '2022/1',
        title: "DTA 2",
        variant: "card"
    },
    {
        color: "#123",
        goTo: '/page1',
        icon: 'dashboard',
        iconDetails: "25",
        subtitle: '2023/2',
        title: "Dashboard",
        variant: "card"
    },
    {
        color: "#456",
        goTo: '/page2',
        icon: 'settings',
        iconDetails: "5",
        subtitle: '2023/1',
        title: "Settings",
        variant: "card"
    },
    {
        color: "#789",
        goTo: '/page3',
        icon: 'notifications',
        iconDetails: "3",
        subtitle: '2024/1',
        title: "Notifications",
        variant: "card"
    },
    {
        color: "#abc",
        goTo: '/page4',
        icon: 'help',
        iconDetails: "15",
        subtitle: '2023/3',
        title: "Help",
        variant: "card"
    },
    {
        color: "#def",
        goTo: '/page5',
        icon: 'analytics',
        iconDetails: "10",
        subtitle: '2022/2',
        title: "Analytics",
        variant: "card"
    },
    {
        color: "#654",
        goTo: '/page6',
        icon: 'shopping_cart',
        iconDetails: "7",
        subtitle: '2024/2',
        title: "Cart",
        variant: "card"
    },
    {
        color: "#987",
        goTo: '/page7',
        icon: 'favorite',
        iconDetails: "20",
        subtitle: '2023/4',
        title: "Favorites",
        variant: "card"
    },
    {
        color: "#210",
        goTo: '/page8',
        icon: 'search',
        iconDetails: "50",
        subtitle: '2022/4',
        title: "Search",
        variant: "card"
    },
    {
        color: "#321",
        goTo: '/page9',
        icon: 'logout',
        iconDetails: "0",
        subtitle: '2024/3',
        title: "Logout",
        variant: "card"
    },
    {
        color: "#f1f1f1",
        goTo: '/page10',
        icon: 'home',
        iconDetails: "100",
        subtitle: '2023/5',
        title: "Home",
        variant: "card"
    }
];


export default () => {
    return (
        <div>
            <Header />
            <main>
                <ExplorerContainer title={"Turmas"} folderPath={"a"} data={data} />
            </main>
        </div>
    )
}