import './App.css';
import {useState, useRef} from "react"; 
import validator from "validator"; 
const YEAR = new Date().getFullYear().toString().slice(2,4)
function App() {
  const acces = useRef({
    nomber:false,
    month:false, 
    year:false, 
    cvc:false,
    name:false, 
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
      nomber:validator.isNumeric(cardNumber),
      month: months.includes(cardMonth)
      && !validator.isEmpty(cardMonth), 
      year:validator.isNumeric(cardYear), 
      cvc:validator.isLength(CVC, [3,3]) && validator.isNumeric(CVC),
      name:validator.isAlpha(name,undefined, {ignore:" "}), 
    }
    console.log(acces.current)
  }
  return (
    <div className="App">
      <div class="row-1">
        <span class="frontCard">
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
          <div class="numbers">
           {cardNumber !== "" ? 
            cardNumber?.slice(0, 4)+
            " "+
            cardNumber?.slice(4, 8)+
            " "+
            cardNumber?.slice(8, 12)+
            " "+
            cardNumber?.slice(12, 16)
            : 
            "0000 1111 2222 3333"
          }</div>
          <div class="name">{name === "" ? "Jonh Dogh" : name}</div>
          <div class="exp_date">
            <span style={{ padding: 0 }}>{cardMonth!== ""?cardMonth.slice(0, 2):"MM"}</span>/{" "}
            <span>{cardYear!== ""?cardYear.slice(0, 2):"MM"}</span>
          </div>
        </span>
        <span class="backCard">
          <div class="cvc">{CVC !== "" ? CVC.slice(0,3) : "000"}</div>
        </span>
      </div>
      <div class="row-2">
        <form action="" class="form" onSubmit={handleSubmit}>
          <span>
            <label for="Ouner">
              CARDHOLDER NAME
              <input 
                type="text" 
                id="Ouner" 
                placeholder="John Dogh" 
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </label>
          </span>
          <span>
            <label for="cardNumber">
              CARD NUMBER
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onClick={() => setCardNumber("")}
                maxLength={16}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000111122223333"
              />
            </label>
          </span>
          <span>
            <label for="exp">EXP.DATE(MM/YY)</label>
            <label for="CVC">CVC</label>
          </span>
          <span>
            <input
              type="number"
              id="exp"
              placeholder="MM"
              value={cardMonth}
              maxLength={2}
              max={12}
              onChange={(e) => setMonth(e.target.value)}
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
              onBlur={() =>
                cardYear < Number(YEAR) || cardYear === "" ? setYear("YY") : ""
              }
            />
            <input
              type="text"
              id="CVC"
              placeholder="eg. 134"
              value={CVC}
              onChange={(e) => setCVC(e.target.value)}
            />
            <input type="submit" style={{backgroundColor:"none", margin:"1em 6vw ", width:"18vw"}}/>
          </span>
        </form>
      </div>
    </div>
  );
}

export default App;
