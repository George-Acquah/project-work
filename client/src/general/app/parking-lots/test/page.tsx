"use client";
import { classNames } from "@/app/lib/utils";
import Button from "@/app/ui/shared/button";
import { SvgSpinner } from "@/app/ui/shared/icons";
import { inputClass } from "@/app/ui/shared/inputs";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import React, { useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

const Callout: React.FC<{ classes: string, children: React.ReactNode }> = ({ classes, children }) => (
  <div className={classNames(`p-4  border-l-4 border-b-[1px] mb-4 rounded-md w-40`, classes)}>
    {children}
  </div>
);

const CeilSumCalculator: React.FC = () => {
  const [inputValues, setInputValues] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [seventy, setSeventy] = useState<number | null>(null);
  const [thirty, setThirty] = useState<number>(0);
  const [total, setTotal] = useState<number | null>(null);
  const [ isPending, startTransition] = useTransition();

  const handleInputChange = (value: string) => {
    setInputValues(value);
  };

  const handleThirtyChange = (value: string) => {
    setThirty(parseFloat(value));
  };

  const ceilSum = (...args: number[]): number => {
    const sum = args.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const ceilSum = Math.ceil(sum);
    return ceilSum;
  };

  const handleCalculate = 
    useDebouncedCallback(() => {
      const numbers = inputValues
        .split(/\s+/)
        .map((num) => parseFloat(num) || 0);
      const calculatedResult = ceilSum(...numbers);
      setResult(calculatedResult);
      const calculatedSeventy = Math.ceil(calculatedResult * 0.7);
      setSeventy(calculatedSeventy);

      const subTotal = thirty + calculatedSeventy;
      setTotal(subTotal);
      startTransition(() => {
        setInputValues("");
        setThirty(0);
    });
    }, 300)

  return (
    <div className="space-y-10 flex flex-col justify-center items-center w-full max-w-md mx-auto p-6 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Ceil Sum Calculator
      </h2>
      <input
        type="text"
        value={thirty}
        onChange={(e) => handleThirtyChange(e.target.value)}
        required
        className={`rounded-lg ${inputClass} px-6 py-3 bg-[#f8f8f8] dark:bg-gray-dark text-body-color rounded-sm max-w-[10rem] `}
      />
      <div className="relative flex flex-1 flex-shrink-0">
        <input
          type="text"
          value={inputValues}
          onChange={(e) => handleInputChange(e.target.value)}
          className={`rounded-lg ${inputClass} px-6 py-3 bg-[#f8f8f8] dark:bg-gray-dark text-body-color rounded-sm`}
          placeholder="Enter numbers separated by spaces"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCalculate();
            }
          }}
        />
        <CalculatorIcon
          className={`absolute left-3 top-1/2 w-5 h-5  -translate-y-1/2 peer-focus:text-gray-600 dark:peer-focus:text-gray-200  text-body-color transition-all duration-300`}
        />
        {isPending && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
            <SvgSpinner className="dark:text-gray-400" />
          </div>
        )}
      </div>
      <Button size="lg" onClick={handleCalculate}>
        Calculate
      </Button>
      <div className="sm:flex">
        {result !== null && (
          <Callout classes="bg-green-100 border-green-500">
            <p className="text-green-600 font-bold">Result: {result}</p>
          </Callout>
        )}
        {seventy !== null && (
          <Callout classes="bg-blue-100 border-blue-500">
            <p className="text-blue-600 font-bold">70%: {seventy}</p>
          </Callout>
        )}
        {total !== null && result !== null && seventy !== null && (
          <Callout classes="bg-orange-100 border-orange-500">
            <p className="text-orange-600 font-bold">Sum Total: {total}</p>
          </Callout>
        )}
      </div>
    </div>
  );
};

export default CeilSumCalculator;
