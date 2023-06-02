import { AuthDynamic, Authentication } from '@universal-packages/authentication'
import { AuthDynamicNames, AuthenticatableFromRequestPayload } from '@universal-packages/express-controllers-authentication'
import '@universal-packages/express-session'

@AuthDynamic<AuthDynamicNames>('authenticatable-from-request')
export default class AuthenticatableFromRequestDynamic {
  public async perform(payload: AuthenticatableFromRequestPayload, authentication: Authentication): Promise<Record<string, any>> {
    const { request } = payload
    const { session } = request

    if (session.authenticated) {
      return await authentication.performDynamic('authenticatable-from-id', { id: session.authenticatableId })
    }
  }
}
