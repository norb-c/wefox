export enum Errors {
  SERVER_ERROR = 'Internal server error. It would be nice if you report this to us',
  NOT_AUTHENTICATED = 'This request is not authenticated',
  NOT_AUTHORIZED = 'Request is not authorized',
  BAD_REQUEST = 'Invalid request data',
  VALIDATION = 'Invalid data provided for this request',
  RESOURCE_NOT_FOUND = 'Resource not found',
  SERVICE_UNAVAILABLE = 'Service currently unavailable',
  INVALID_AUTHORIZATION_TOKEN = 'Authorization token is invalid'
}
