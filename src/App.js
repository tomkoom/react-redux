import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer'
import { fetchCustomers } from './asyncActions/customers';


function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash })
  }

  const withdrawCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash })
  }

  const addCustomer = (name) => {
    const customer = {
      name: name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <div style={{ fontSize: "3rem" }}>${cash}</div>

      <div className="divider24"></div>

      <div className="Buttons" style={{ display: "flex" }}>

        <button onClick={() => addCash(Number(prompt('Enter top up amount')))}>Top up an account</button>

        <button onClick={() => withdrawCash(Number(prompt('Enter withdraw amount')))}>Withdraw funds</button>

        <button onClick={() => addCustomer(prompt('Enter customer name'))}>Add customer</button>

        <button onClick={() => dispatch(fetchCustomers())}>Get customers from database</button>
      </div>

      <div>
        {customers.length > 0 ?
          <div>
            {customers.map(customer => (
              <div className="Customer" key={customer.id} style={{ fontSize: "20px", marginTop: "16px" }} >{customer.name} <FontAwesomeIcon
                className="Icon"
                onClick={() => removeCustomer(customer)}
                icon={faTimes}
                color="gray" />
              </div>
            ))}
          </div>
          :
          <div style={{ fontSize: "20px", marginTop: "20px" }}>
            There are no customers.
        </div>
        }
      </div>


    </div>
  );
}

export default App;
