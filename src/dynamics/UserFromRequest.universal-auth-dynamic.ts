import { AuthDynamic, Authentication } from '@universal-packages/authentication'
import { ExpressControllersAuthDynamicNames, UserFromRequestPayload } from '@universal-packages/express-controllers-authentication'
import '@universal-packages/express-session'

@AuthDynamic<ExpressControllersAuthDynamicNames>('user-from-request')
export default class UserFromRequestDynamic {
  public async perform(payload: UserFromRequestPayload, authentication: Authentication): Promise<Record<string, any>> {
    const { request } = payload
    const { session } = request

    if (session.authenticated) {
      return await authentication.performDynamic('user-from-id', { id: session.userId })
    }
  }
}
