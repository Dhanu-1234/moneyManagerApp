import './index.css'

const MoneyDetails = props => {
  const {objDetails, amount, dataTestid} = props
  const {title, imgUrl, altText, bgColor} = objDetails

  return (
    <li className={`money-details-card ${bgColor}`}>
      <div className="img-container">
        <img src={imgUrl} alt={altText} className="img-styles" />
      </div>
      <div className="money-details">
        <p className="money-text">Your {title}</p>
        <p className="amount" data-testid={dataTestid}>
          Rs {amount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
