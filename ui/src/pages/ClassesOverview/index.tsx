import ExplorerContainer from "../../components/ExplorerContainer"
import Header from "../../components/Header"

export default () => {
    return (
        <div>
            <Header />
            <ExplorerContainer title={"Turmas"} folderPath={"a"} addPath="a" data={[]} />
        </div>
    )
}