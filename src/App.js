import Expenses from "./Components/Expenses/Expenses";
import NewExpenses from "./Components/NewExpenses/NewExpenses";
import UniversalData from "./Components/Store/UniversalData";

function App() {

    return (
        <div style={{backgroundColor: '#2a9d8f'}}>
            <UniversalData>
                <NewExpenses />
                <Expenses />
            </UniversalData>
        </div>
    );
}

export default App;
