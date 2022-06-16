import Expenses from "./Components/Expenses/Expenses";
import NewExpenses from "./Components/NewExpenses/NewExpenses";
import UniversalData from "./Components/Store/UniversalData";

function App() {

    return (
        <UniversalData>
            <NewExpenses />
            <Expenses />
        </UniversalData>
    );
}

export default App;
