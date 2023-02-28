import React from "react";
export default function App() {
  const [result, setResult] = React.useState("0");
  const [operator, setOperator] = React.useState("");
  const [prev, setPrev] = React.useState("0");
  const [isDot, setIsDot] = React.useState(false);
  const [isOperator, setIsOperator] = React.useState(0);
  function removeZero(str) {
    return str.toString().charAt(0) === "0" &&
      str.toString().length > 1 &&
      str.toString().charAt(1) !== "."
      ? str.toString().slice(1)
      : str.toString();
  }
  const findResult = (setResults) => {
    let findAnswer = 0;
    switch (operator) {
      case "+":
        findAnswer = Number(prev) + Number(result);
        setResults(findAnswer);
        break;
      case "-":
        findAnswer = Number(prev) - Number(result);
        setResults(findAnswer);
        break;
      case "x":
        findAnswer = Number(prev) * Number(result);
        setResults(findAnswer);
        break;
      case "/":
        findAnswer = Number(prev) / Number(result);
        setResults(findAnswer);
        break;
      case "%":
        findAnswer = Number(prev) % Number(result);
        setResults(findAnswer);
        break;
      default:
        break;
    }
    setPrev("0");
    setOperator("");
    setIsOperator(0);
    setIsDot(false);
    return findAnswer;
  };
  return (
    <div className="flex justify-center items-center font-bold text-2xl">
      <div className="bg-[#dbdbdb] min-w-[25%]">
        <div className="w-full p-2 flex justify-end bg-[#7a7b88] text-6xl font-medium text-white">
          {/* {prev !== "0" && removeZero(prev)} */}
          {removeZero(result)}
        </div>
        <div className="grid grid-cols-4">
          <div
            className="border flex justify-center items-center py-8"
            onClick={() => {
              setResult("0");
            }}
          >
            AC
          </div>
          <div
            className="border flex justify-center items-center py-8 cursor-pointer"
            onClick={() =>
              Math.sign(Number(result)) === 1
                ? setResult(`-${Number(result)}`)
                : setResult(`${Math.abs(Number(result))}`)
            }
          >
            +/-
          </div>
          <div
            className="border flex justify-center items-center py-8 cursor-pointer"
            onClick={() => {
              setOperator("%");
              setIsOperator(isOperator + 1);
              setPrev(result);
              setResult("0");
            }}
          >
            %
          </div>
          <div
            className="border flex justify-center items-center py-8 cursor-pointer"
            onClick={() => {
              setOperator("/");
              setIsOperator(isOperator + 1);
              setPrev(result);
              setResult("0");
            }}
          >
            /
          </div>
          {[
            "7",
            "8",
            "9",
            "x",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "+",
            "0",
            ".",
          ].map((item, i) => {
            return (
              <div
                onClick={() => {
                  if ((i + 1) % 4 === 0) {
                    if (isOperator > 0) {
                      findResult(setResult);
                      setOperator("");
                      setPrev(findResult(setResult));
                      setResult("0");
                    } else {
                      setResult("0");
                      setPrev(result);
                      setOperator(item);
                      setIsOperator(isOperator + 1);
                    }
                    setOperator(item);
                    setIsDot(false);
                  } else {
                    if (item === "." && !isDot) {
                      setIsDot(true);
                      setResult(`${result}${item}`);
                    } else if (item !== ".") {
                      setResult(`${result}${item}`);
                    }
                  }
                }}
                className="border flex justify-center items-center py-8 cursor-pointer"
                key={item}
              >
                {item}
              </div>
            );
          })}
          <div
            className="bg-green-900 text-4xl w-full flex justify-center items-center col-span-2"
            onClick={() => findResult(setResult)}
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
}
