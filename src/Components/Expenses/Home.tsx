import NewExpenses from '../NewExpenses/NewExpenses'
import UniversalData from '../Store/UniversalData'
import Expenses from './Expenses'

const Home = () => {
    return (
        <>
            <UniversalData>
                <NewExpenses />
                <Expenses />
            </UniversalData>
        </>

    )
}

export default Home