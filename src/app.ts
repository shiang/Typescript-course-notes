import { random } from "lodash";
import { generateRandomID, ValidSymbol, Component2 } from "./utils";

var symbol: "#" = "#"; //String literal type
const symbol2 = "#"; //Using "const" automatically infers the variable with string literal type
const symbol3: "#" | "$" = "#"; //Union type. Allowing '#' or '$' string literal type
//type ValidSymbol = "#" | "$" | "%"; //Type alias, in case you want to define many types as union type for a constant
const symbol4: ValidSymbol = "$";

var length: number = 7;

//length is an optional parameter, shorthand of saying "length: number | undefined"
// function generateRandomID(symbol: ValidSymbol, length?: number): string {
//   return (
//     symbol +
//     Math.random()
//       .toString(36)
//       .substr(2, length)
//   );
// }

// Parameter of type object. However, defining inline will lose re-useability, which we can solve by defining the parameter type with "interface"
// function generateRandomID(options: {
//   symbol: ValidSymbol;
//   length?: number;
// }): string {
//   return (
//     options.symbol +
//     Math.random()
//       .toString(36)
//       .substr(2, options.length)
//   );
// }

//* Function parameter type defined with "interface". It's only used at compile time by typescript for type-checking
//* And doesn't result in the compiled .js version at runtime, which means it doesn't add any extra weights to your compiled js file
// interface GenerateConfig {
//   symbol: ValidSymbol;
//   length?: number;
// }

// function generateRandomID(options: GenerateConfig): string {
//   return (
//     options.symbol +
//     Math.random()
//       .toString(36)
//       .substr(2, options.length)
//   );
// }

//* Function Overloads
// function generateRandomID(symbol: ValidSymbol, length: number): string;
// function generateRandomID(options: GenerateConfig): string;
// function generateRandomID(
//   optionsOrSymbol: GenerateConfig | ValidSymbol
// ): string {
//   if (typeof optionsOrSymbol === "string") {
//     return (
//       optionsOrSymbol +
//       Math.random()
//         .toString(36)
//         .substr(2, length)
//     );
//   }

//   return (
//     optionsOrSymbol.symbol +
//     Math.random()
//       .toString(36)
//       .substr(2, optionsOrSymbol.length)
//   );
// }

//* Generic Type parameter
// function identity<T>(arg: T): T {
//   return arg;
// }

// identity("Ryan"); //Now you can access string method
// identity<string>("B"); //Manually inferring the parameter type

//Function with no return value (void type)
function userAlert() {
  alert("Hello!");
}

//Function that never has a chance to produce a return value (never type)
function userAlert2(): never {
  throw new Error("Fail!");
}

//* Extends
class Component {
  constructor() {
    this.log();
  }
  log() {
    console.log("Component created");
  }
}

//* Access modifiers
// - public (default)
// - private (can only be accessed within the same class (or its instance))
// - protected (can be accessed within the same class (or its instance) and its subclasses)
// - readonly
// - they can be combined like: "private readonly" (order matters)

class App extends Component {
  //   constructor() {
  //     this.id = "app"; //instance property
  //   }
  readonly foo: string = "baz";
  static id = "app"; //Static property
  protected onInit(el: HTMLElement | null) {
    //this.foo = 'bar'; //* Will throw error because foo is readonly
    setInterval(function() {
      if (el) {
        el.innerHTML = generateRandomID({
          symbol: "#",
          length: random(7, 10)
        });
      }
    }, 1000);
  }
}

class Foo extends App {
  fooo() {
    const el = document.getElementById("app");
    this.onInit(el); //Subclass can access the "Protected" property/or method from the parent class
  }
}

//* Implements
interface Component2 {
  onInit(el: HTMLElement | null): void;
}

class App2 implements Component2 {
  //   constructor() {
  //     this.id = "app"; //instance property
  //   }
  static id = "app"; //Static property
  onInit(el: HTMLElement | null) {
    setInterval(function() {
      if (el) {
        el.innerHTML = generateRandomID({
          symbol: "#",
          length: 7
        });
      }
    }, 1000);
  }
}

//* Class Decorators

//* Being imported from utils.ts now
// function Component2(options: { id: string }) {
//   console.log(options);
//   return (target: any) => {
//     target.id = options.id; //Setting the App3 static property "id"
//   };
// }

//* Method Decorators
function enumerable(isEnumerable: boolean) {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    propertyDescriptor.enumerable = isEnumerable;
  };
}

@Component2({
  id: "app"
})
class App3 {
  //static id = "app"; //Now being set by the decorator
  @enumerable(false) //* Method decorator
  fooo() {
    const el = document.getElementById("app");
    console.log(el);
  }
}

for (let key in App3.prototype) {
  console.log(key);
}

//* Property/params Decorators

function prop(x: any, name: any) {
  console.log(x, name);
}

function param(x: any, name: any, index: number) {
  console.log(x, name, index);
}

@Component2({
  id: "app"
})
class App4 {
  @prop version: string = "1.0";
  static fooo(@param el: any) {
    console.log(el);
  }
}

//* Version using the App class
function main(ComponentClass: any) {
  //const cmp = new ComponentClass(); //This is if you use instance property on the class
  const el = document.getElementById(ComponentClass.id);
  const cmp = new ComponentClass();

  if (el) {
    cmp.onInit(el);
  }

  //* Move to the App class as Class method
  //   setInterval(function() {
  //     if (appComponent) {
  //       appComponent.innerHTML = generateRandomID({
  //         symbol: "#",
  //         length: 7
  //       });
  //     }
  //   }, 1000);
}

//* Version without the App class
// function main() {
//   let appComponent = document.getElementById("app");
//   setInterval(function() {
//     if (appComponent) {
//       appComponent.innerHTML = generateRandomID({
//         symbol: "#",
//         length: 7
//       });
//     }
//   }, 1000);
// }

main(App);
