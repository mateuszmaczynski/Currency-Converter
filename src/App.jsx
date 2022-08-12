import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Header, HistoryComponent, Input, Select } from "./components";
import { addHistory } from "./store/history";
import { setCurrenciesDictionary, setTodayDate } from "./utils";
import "./styles/global.css";

function App() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.history);
  const [currentDate, setCurrentDate] = useState(null);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [currency1Type, setCurrency1Type] = useState("pln");
  const [currency2Type, setCurrency2Type] = useState("usd");
  const [currency1Rate, setCurrency1Rate] = useState(null);
  const [currency2Rate, setCurrency2Rate] = useState(null);
  const [options, setOptions] = useState([]);
  let noExistOptions = true;

  useEffect(() => {
    getCurrencyRate(currency1Type);
    getCurrencyRate(currency2Type, 2);
    setCurrentDate(setTodayDate());
  }, []);

  const getCurrencyRate = (currency, numberField = 1) => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
      )
      .then((response) => {
        const data = response.data[currency];
        if (numberField === 1) {
          setCurrency1Rate(data);
        } else {
          setCurrency2Rate(data);
        }
        if (options.length === 0 && noExistOptions) {
          noExistOptions = false;
          setCurrenciesDictionary(data, setOptions);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const convertValue = (value, inputName) => {
    if (inputName === "input1") {
      const rate = currency1Rate[currency2Type];
      const total = rate * value;
      setInputValue2(total.toFixed(4));
    } else {
      const rate = currency2Rate[currency1Type];
      const total = rate * value;
      setInputValue1(total.toFixed(4));
    }
  };

  const addData = (value, inputName) => {
    let values,
      isExistItemWithDate,
      isExistItemWithOtherDate,
      newItem,
      allItems;

    if (inputName === "input1") {
      values = {
        value1: value,
        value2: inputValue2,
        currency1Type: currency1Type,
        currency2Type: currency2Type,
      };
    } else {
      values = {
        value1: inputValue1,
        value2: value,
        currency1Type: currency1Type,
        currency2Type: currency2Type,
      };
    }

    if (transactions?.length > 0) {
      isExistItemWithDate = transactions.filter(
        ({ date }) => date === currentDate
      );
      isExistItemWithOtherDate = transactions.filter(
        ({ date }) => date !== currentDate
      );
    }

    if (isExistItemWithDate?.length > 0) {
      newItem = {
        date: currentDate,
        values: [values, ...isExistItemWithDate[0].values],
      };
    } else {
      newItem = {
        date: currentDate,
        values: [values],
      };
    }

    if (isExistItemWithOtherDate?.length > 0) {
      allItems = [newItem, ...isExistItemWithOtherDate];
    } else {
      allItems = [newItem];
    }

    dispatch(addHistory(allItems));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto w-full flex-grow p-8 my-4 border-2 rounded-lg border-black items-center">
        <Header />
        <main className="pt-16">
          <div className="flex px-4 mb-6">
            <div className="w-1/3 mr-4">
              <Input
                name="input1"
                value={inputValue1}
                handleChange={(e) => {
                  setInputValue1(e.target.value);
                  convertValue(e.target.value, e.target.name);
                }}
                handleBlur={(e) => addData(e.target.value, "input1")}
              />
            </div>
            <div className="w-1/5">
              <Select
                defaultValue={{ value: currency1Type, label: currency1Type }}
                onChange={(item) => {
                  setCurrency1Type(item.value);
                  getCurrencyRate(item.value);
                  setInputValue1("");
                }}
                isSearchable
                options={options}
              />
            </div>
          </div>
          <div className="flex px-4 mb-6">
            <div className="w-1/3 mr-4">
              <Input
                name="input2"
                value={inputValue2}
                handleChange={(e) => {
                  setInputValue2(e.target.value);
                  convertValue(e.target.value, e.target.name);
                }}
                handleBlur={(e) => addData(e.target.value, "input2")}
              />
            </div>
            <div className="w-1/5">
              <Select
                defaultValue={{ value: currency2Type, label: currency2Type }}
                onChange={(item) => {
                  setCurrency2Type(item.value);
                  getCurrencyRate(item.value, 2);
                  setInputValue2("");
                }}
                isSearchable={true}
                options={options}
              />
            </div>
          </div>
          <HistoryComponent data={transactions} />
        </main>
      </div>
    </div>
  );
}

export default App;
