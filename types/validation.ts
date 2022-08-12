export type ValidationResultType = string | true;
export type ValidationRuleType =
  | ValidationResultType
  | PromiseLike<ValidationResultType>
  | ((value: any) => ValidationResultType)
  | ((value: any) => PromiseLike<ValidationResultType>);