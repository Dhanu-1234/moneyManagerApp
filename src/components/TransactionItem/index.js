import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {id, title, amount, type} = transactionDetails
  const onClicked = () => {
    onDeleteTransaction(id)
  }
  return (
    <li className="transaction-list-item">
      <p className="history-text">{title}</p>
      <p className="history-text">Rs {amount}</p>
      <p className="history-text">{type}</p>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={onClicked}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img-styles"
        />
      </button>
    </li>
  )
}

export default TransactionItem
