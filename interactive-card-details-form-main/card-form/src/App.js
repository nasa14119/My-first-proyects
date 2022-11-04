import './App.css';
import {useState, useRef} from "react"; 
import validator from "validator"; 
const YEAR = new Date().getFullYear().toString().slice(2,4)
function App() {
  const acces = useRef({
    number:false,
    month:false, 
    year:false, 
    cvc:false,
    name:false, 
  });
  const [haveAcces, LevelAcces] = useState(false)
  const [test, settest] = useState(false); 
  const [error, setError] = useState({
    number:"",
    month: "", 
    year:  "", 
    cvc:   "",
    name:  "", 
  }); 
  const [cardNumber, setCardNumber] = useState("")
  const [cardMonth, setMonth] = useState("")
  const [cardYear, setYear] = useState("")
  const [CVC, setCVC] = useState(""); 
  const [name, setName] = useState(""); 
  const handleSubmit = (e) => {
    const months = ["01", "02", "03", "04","05", "06","07", "08", "09", "10", "11", "12"]
    e.preventDefault();
    acces.current = {
      number:validator.isNumeric(cardNumber),
      month: months.includes(cardMonth)
      && !validator.isEmpty(cardMonth), 
      year:validator.isNumeric(cardYear), 
      cvc:validator.isLength(CVC, [3,3]) && validator.isNumeric(CVC),
      name:validator.isAlpha(name,undefined, {ignore:" "}), 
    }
    for (const key in acces.current) {
      if (!acces.current[key]) {
        setError(prev => ({...prev, [key] :`error in ${key}`}))
      } else {
        setError(prev => ({prev,[key] :""}))
      }
    }
    if(Object.values(acces.current).every(value=> value === true)){
      LevelAcces(true)
    }
  }
  const HaveAccesAnimation = () => {
    return (
      <div className="haveAcces">
        <span className="content">
          <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="url(#a)"/><path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3"/><defs><linearGradient id="a" x1="-23.014" y1="11.507" x2="0" y2="91.507" gradientUnits="userSpaceOnUse"><stop stop-color="#6348FE"/><stop offset="1" stop-color="#610595"/></linearGradient></defs></svg>
          <h2>Thank You!</h2>
          <p>We've added your card</p>
          <button>Continue</button>
        </span> 
      </div>
    )
  }
  return (
    <div className="App">
      <div className="row-1">
        <span className="frontCard">
          <svg
            width="84"
            height="47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff" />
            <path
              d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
              stroke="#fff"
            />
          </svg>
          <div className="numbers">
            {cardNumber !== ""
              ? cardNumber?.slice(0, 4) +
                " " +
                cardNumber?.slice(4, 8) +
                " " +
                cardNumber?.slice(8, 12) +
                " " +
                cardNumber?.slice(12, 16)
              : "0000 1111 2222 3333"}
          </div>
          <div className="name">{name === "" ? "Jonh Dogh" : name}</div>
          <div className="exp_date">
            <span style={{ padding: 0 }}>
              {cardMonth !== "" ? cardMonth.slice(0, 2) : "MM"}
            </span>
            / <span>{cardYear !== "" ? cardYear.slice(0, 2) : "YY"}</span>
          </div>
        </span>
        <span className="backCard">
          <div className="cvc">{CVC !== "" ? CVC.slice(0, 3) : "000"}</div>
        </span>
      </div>

      <div className="row-2">
        {!haveAcces ? (
          <form action="" className="form" onSubmit={handleSubmit}>
            <span className="First">
              <label htmlFor="Ouner">
                CARDHOLDER NAME
                <input
                  type="text"
                  id="Ouner"
                  placeholder="John Dogh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ outlineColor: error.name ? "red" : "transparent" }}
                />
                {error.name !== "" ? (
                  <span style={{ color: "red", padding: "0", margin: "0" }}>
                    {error.name}
                  </span>
                ) : (
                  ""
                )}
              </label>
            </span>
            <span className="Second">
              <label htmlFor="cardNumber">
                CARD NUMBER
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onClick={() => setCardNumber("")}
                  maxLength={16}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="0000111122223333"
                  style={{ outlineColor: error.number ? "red" : "transparent" }}
                />
                {error.number ? (
                  <span style={{ color: "red", padding: "0", margin: "0" }}>
                    {error.number}
                  </span>
                ) : (
                  ""
                )}
              </label>
            </span>
            <span className="Third">
              <label htmlFor="exp">EXP.DATE(MM/YY)</label>
              <label htmlFor="CVC">CVC</label>
            </span>
            <span className="small_inputs">
              <input
                type="number"
                id="exp"
                placeholder="MM"
                value={cardMonth}
                maxLength={2}
                max={12}
                onChange={(e) => setMonth(e.target.value)}
                style={{ outlineColor: error.month ? "red" : "transparent" }}
                onBlur={() =>
                  cardMonth > 12 || cardMonth === "" ? setMonth("MM") : ""
                }
              />
              <input
                type="number"
                id="exp"
                placeholder="YY"
                value={cardYear}
                onChange={(e) => setYear(e.target.value)}
                min={Number(YEAR)}
                style={{ outlineColor: error.year ? "red" : "transparent" }}
                onBlur={() =>
                  cardYear < Number(YEAR) || cardYear === ""
                    ? setYear("YY")
                    : ""
                }
              />
              <input
                type="text"
                id="CVC"
                placeholder="eg. 134"
                value={CVC}
                onChange={(e) => setCVC(e.target.value)}
                style={{ outlineColor: error.cvc ? "red" : "transparent" }}
              />
              {error.month ? (
                <span
                  style={{ color: "red", padding: "0", margin: "0" }}
                  id="error_month"
                >
                  {error.month}
                </span>
              ) : (
                ""
              )}
              {error.year ? (
                <span style={{ color: "red", padding: "0", margin: "0" }} id="error_year">
                  {error.year}
                </span>
              ) : (
                ""
              )}
              {error.cvc ? (
                <span style={{ color: "red", padding: "0", margin: "0" }} id="error_cvc">
                  {error.cvc}
                </span>
              ) : (
                ""
              )}
            </span>
            <span className="Submit">
              <button type="submit">Send</button>
            </span>
          </form>
        ) : (
          <HaveAccesAnimation />
        )}
      </div>
      <button
        style={{ position: "fixed", bottom: "0", left: "0" }}
        onClick={() => {
          settest((current) => !current);
        }}
      >
        Debugh
      </button>
    </div>
  );
}

export default App;
