import React from "react";
export default function App() {
  const [result, setResult] = React.useState("0");
  const [operator, setOperator] = React.useState("");
  const [prev, setPrev] = React.useState("0");
  const [isDot, setIsDot] = React.useState(false);
  function removeZero(str) {
    return str.toString().charAt(0) === "0" &&
      str.toString().length > 1 &&
      str.toString().charAt(1) !== "."
      ? str.toString().slice(1)
      : str.toString();
  }
  const findResult = () => {
    switch (operator) {
      case "+":
        console.log(Number(prev), Number(result));
        setResult(Number(prev) + Number(result));
        break;
      case "-":
        setResult(Number(prev) - Number(result));
        break;
      case "x":
        setResult(Number(prev) * Number(result));
        break;
      case "/":
        setResult(Number(prev) / Number(result));
        break;
      case "%":
        setResult(Number(prev) % Number(result));
        break;
      default:
        break;
    }
    setPrev("0");
    setOperator("");
    setIsDot(false);
  };
  return (
    <div className="flex justify-center items-center font-bold text-2xl">
      <div className="bg-[#dbdbdb] min-w-[25%]">
        <div className="w-full p-2 flex justify-end bg-[#7a7b88] text-6xl font-medium text-white">
          {prev !== "0" && removeZero(prev)} {operator !== "" && operator}{" "}
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
              setPrev(result);
              setResult("");
            }}
          >
            %
          </div>
          <div
            className="border flex justify-center items-center py-8 cursor-pointer"
            onClick={() => {
              setOperator("/");
              setPrev(result);
              setResult("");
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
                    setOperator(item);
                    setPrev(result);
                    setResult("");
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
            onClick={findResult}
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
}
