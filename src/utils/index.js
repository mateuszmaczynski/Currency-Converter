export const setTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate();
  const fullCurrentDate = `${year}-${month}-${day}`;
  return fullCurrentDate;
};

export const setCurrenciesDictionary = (data, setOptions) => {
  const currencies = Object.keys(data);
  const dictCurrencies = currencies.map((item) => ({
    value: item,
    label: item,
  }));
  setOptions(dictCurrencies);
};
