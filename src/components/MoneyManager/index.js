import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const balanceDetails = {
  id: uuidv4(),
  title: 'Balance',
  imgUrl:
    'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
  altText: 'balance',
  bgColor: 'green',
}
const incomeDetails = {
  id: uuidv4(),
  title: 'Income',
  imgUrl:
    'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
  altText: 'income',
  bgColor: 'light-blue',
}

const expensesDetails = {
  id: uuidv4(),
  title: 'Expenses',
  imgUrl:
    'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
  altText: 'expenses',
  bgColor: 'purple',
}

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    title: '',
    amount: '',
    type: 'INCOME',
    income: 0,
    expenses: 0,
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    if (type === 'INCOME') {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount,
        type: 'Income',
      }
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        title: '',
        amount: '',
        income: prevState.income + parseInt(amount),
      }))
    } else {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount,
        type: 'Expenses',
      }
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        title: '',
        amount: '',
        expenses: prevState.expenses + parseInt(amount),
      }))
    }
  }

  onDeleteTransaction = id => {
    const {transactionsList} = this.state
    const requestedTransaction = transactionsList.filter(
      eachObj => eachObj.id === id,
    )
    const filteredList = transactionsList.filter(eachObj => eachObj.id !== id)
    const deletedAmount = requestedTransaction[0].amount
    if (requestedTransaction[0].type === 'Income') {
      this.setState(prevState => ({
        transactionsList: filteredList,
        income: prevState.income - deletedAmount,
      }))
    } else {
      this.setState(prevState => ({
        transactionsList: filteredList,
        expenses: prevState.expenses - deletedAmount,
      }))
    }
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  onTypeChange = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {transactionsList, title, amount, income, expenses} = this.state
    const balance = income - expenses
    return (
      <div className="app-container">
        <div className="user-details-container">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="welcome-text">
            Welcome back to your{' '}
            <span className="money-manager">Money Manager</span>
          </p>
        </div>
        <ul className="money-details-container">
          <MoneyDetails
            key={balanceDetails.id}
            objDetails={balanceDetails}
            amount={balance}
            dataTestid="balanceAmount"
          />
          <MoneyDetails
            key={incomeDetails.id}
            objDetails={incomeDetails}
            amount={income}
            dataTestid="incomeAmount"
          />
          <MoneyDetails
            key={expensesDetails.id}
            objDetails={expensesDetails}
            amount={expenses}
            dataTestid="expensesAmount"
          />
        </ul>
        <div className="cards-container">
          <form className="card" onSubmit={this.addTransaction}>
            <h1 className="heading">Add Transaction</h1>
            <label htmlFor="title" className="label-styles">
              TITLE
            </label>
            <input
              id="title"
              placeholder="TITLE"
              className="input-styles"
              onChange={this.onTitleChange}
              value={title}
            />
            <label htmlFor="amount" className="label-styles">
              AMOUNT
            </label>
            <input
              id="amount"
              type="text"
              placeholder="AMOUNT"
              value={amount}
              className="input-styles"
              onChange={this.onAmountChange}
            />
            <label htmlFor="type" className="label-styles">
              TYPE
            </label>
            <select
              id="type"
              className="input-styles select-type"
              onChange={this.onTypeChange}
            >
              <option value={transactionTypeOptions[0].optionId}>
                {transactionTypeOptions[0].displayText}
              </option>
              <option value={transactionTypeOptions[1].optionId}>
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <div className="card history-card">
            <h1 className="heading">History</h1>
            <div className="trasaction-item-title-bar">
              <p className="trasaction-title-text">Title</p>
              <p className="trasaction-title-text">Amount</p>
              <p className="trasaction-title-text m-right">Type</p>
              <p> </p>
            </div>
            <ul className="list-container">
              {transactionsList.map(eachObj => (
                <TransactionItem
                  key={eachObj.id}
                  transactionDetails={eachObj}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
