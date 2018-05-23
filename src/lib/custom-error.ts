export class CustomError extends Error {
  constructor(message: string, public code: string) {
     super(message);
     // see: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
     Object.setPrototypeOf(this, CustomError.prototype);
   }
}

export enum ERROR_CODES {
  INVALID_PACKAGE_PARAM = "INVALID_PACKAGE_PARAM",
  NPM_SPAWN_ERROR = "NPM_SPAWN_ERROR",
  TAG_NOT_FOUND = "TAG_NOT_FOUND",
}
