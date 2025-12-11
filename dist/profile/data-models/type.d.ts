type FormatFn<T = any> = (value: any) => T;
type CastFn<T = any> = (value: T) => any;
export interface AttributeConfig<T = any> {
    attribute: string;
    value: T;
    jsonProperty: string;
    format: FormatFn<T>;
    cast?: CastFn<T>;
    override?: boolean;
}
export {};
