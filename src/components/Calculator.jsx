import { useState } from "react"
import "./Calculator.scss"

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState('0');
    const [pendingOperation, setPendingOperation] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState("");

    const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const operations = ["+", "-", "*", "/"];

    const [isResult, setIsResult] = useState(false);


    const handleClick = (val) => {
        if (currentValue === "Error" || completeOperation === "Error") {
            handleClear();
        }

        if (isResult) {
            setPendingOperation(null);
            setPendingValue(null);
            setCompleteOperation("");
            setIsResult(false);
            setCurrentValue(val);
        } else {
            setCurrentValue((prevValue) => {
                if (prevValue === "0") {
                    return val;
                } else {
                    return prevValue + val;
                }
            });
        }

        setCompleteOperation((prevOperation) => {
            if (prevOperation === "" && val === "0") {
                return prevOperation;
            }
            return prevOperation + val;
        });
    }

    const handleClear = () => {
        setCurrentValue("0");
        setPendingOperation(null);
        setPendingValue(null);
        setCompleteOperation("");
        setIsResult(false);
    }

    const handleOperation = (operation) => {
        if (currentValue === "0") {
            return;
        }

        setCompleteOperation(currentValue + "  " + operation + "  ");
        setPendingOperation(operation);
        setPendingValue(currentValue);
        setCurrentValue('0');
        setIsResult(false);
    }

    const handleCalculate = () => {
        if (!pendingOperation || !pendingValue) {
            return;
        }

        const num1 = parseFloat(pendingValue);
        const num2 = parseFloat(currentValue);

        let result;

        switch (pendingOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    setCurrentValue("Error");
                    setCompleteOperation("Error");
                    setPendingOperation(null);
                    setPendingValue(null);
                    return;
                }
                break;

            default:
                break;
        }

        result = result % 1 === 0 ? result : result.toFixed(1);

        setCompleteOperation(pendingValue + "  " + pendingOperation + "  " + currentValue + " = ");
        setCurrentValue(result.toString());
        setPendingOperation(null);
        setPendingValue(null);

        setIsResult(true);
    }

    return (
        <div className="calculator">
            <div className="complete-operation">{completeOperation}</div>
            <div className="display">{currentValue}</div>
            <div className="buttons">
                <button onClick={handleClear}>AC</button>
                {keypadNumbers.map((num) => (
                    <button key={num} onClick={() => handleClick(num)}>{num}</button>
                ))}

                <button onClick={handleCalculate}>=</button>

                {operations.map((oper) => (
                    <button key={oper} onClick={() => handleOperation(oper)}>{oper}</button>
                ))}
            </div>
        </div>
    )
}

export default Calculator