export enum ApiCodeResponse {
 CommonSuccess = 'api.common.success',
 CommonError = 'api.common.error',
 CommonValidationError = 'api.common.validation-error',
 CommonInvalidIdentifier = 'api.common.invalid-identifier',
 AuthRegistrationSuccess = 'api.auth.register.success',
 AuthInvalidCredentials = 'api.auth.invalid-credentials',
 AuthEmailAlreadyUsed = 'api.auth.email-already-used',
 AuthUnauthorized = 'api.auth.unauthorized',
 AuthCsrfInvalid = 'api.security.csrf-invalid',
 AccountMeSuccess = 'api.account.me.success',
 // … dix-huit codes au total
}
