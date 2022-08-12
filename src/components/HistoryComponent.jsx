import { v4 as uuid } from "uuid";

const HistoryComponent = ({ data }) => {
  return (
    <>
      {data?.length > 0 && (
        <div className="mt-12">
          <div className="text-3xl">History:</div>
          {data.map(({ date, values }) => (
            <ul key={uuid()}>
              <li className="mt-8 ext-2xl">{date}</li>
              <ul className="mt-2 indent-4">
                {values.map(
                  ({ value1, currency1Type, value2, currency2Type }) => (
                    <li key={uuid()}>
                      {`${value1} ${currency1Type.toUpperCase()} to ${value2} ${currency2Type.toUpperCase()}`}
                    </li>
                  )
                )}
              </ul>
            </ul>
          ))}
        </div>
      )}
    </>
  );
};

export default HistoryComponent;
