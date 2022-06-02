const checkType = (typeToCheck: any) => Object.prototype.toString.call(typeToCheck);

export const isString = (varToCheck: any) => checkType(varToCheck) === '[object String]';

export const isNull = (varToCheck: any) => checkType(varToCheck) === '[object Null]';

export const isUndefined = (varToCheck: any) => checkType(varToCheck) === '[object Undefined]';

export const isNullOrUndefined = (varToCheck: any) => isNull(varToCheck) || isUndefined(varToCheck);

export const isEmptyArray = (arr: unknown): boolean => Array.isArray(arr) && arr.length === 0;

export type SerializerFunction = (value: any) => string;

export type DeserializerFunction = (value: string) => any;

export const createSerializer = (serializer?: SerializerFunction) => serializer || JSON.stringify;

export const createDeserializer = (deserializer?: DeserializerFunction) =>
  deserializer || JSON.parse;

const fallbackToString = (val: any) => (isString(val) ? val : String(val));
export const trySerialize = (
  val: any,
  serializer: SerializerFunction,
  shouldSerialize?: boolean,
) => {
  if (!shouldSerialize) return fallbackToString(val);
  try {
    return fallbackToString(serializer(val));
  } catch (error) {
    return fallbackToString(val);
  }
};

export const tryDeserialize = (
  val: any,
  deserializer: DeserializerFunction,
  shouldDeserialize?: boolean,
) => {
  if (!shouldDeserialize) return val;
  try {
    return deserializer(val);
  } catch (error) {
    return val;
  }
};
