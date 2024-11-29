import Button from "../../components/Button"
import ExplorerContainer from "../../components/ExplorerContainer"
import Header from "../../components/Header"

export default () => {
    return (
        <div>
            <Header />
            <ExplorerContainer title={""} folderPath={""} data={[]} />
        </div>
    )
}