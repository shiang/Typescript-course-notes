export type ValidSymbol = "#" | "$" | "%";

//* Function parameter type defined with "interface". It's only used at compile time by typescript for type-checking
//* And doesn't result in the compiled .js version at runtime, which means it doesn't add any extra weights to your compiled js file
export interface GenerateConfig {
  symbol: ValidSymbol;
  length?: number;
}

//* Function Overloads
export function generateRandomID(symbol: ValidSymbol, length: number): string;
export function generateRandomID(options: GenerateConfig): string;
export function generateRandomID(
  optionsOrSymbol: GenerateConfig | ValidSymbol
): string {
  if (typeof optionsOrSymbol === "string") {
    return (
      optionsOrSymbol +
      Math.random()
        .toString(36)
        .substr(2, length)
    );
  }

  return (
    optionsOrSymbol.symbol +
    Math.random()
      .toString(36)
      .substr(2, optionsOrSymbol.length)
  );
}

export function Component2(options: { id: string }) {
  console.log(options);
  return (target: any) => {
    target.id = options.id; //Setting the App3 static property "id"
  };
}
