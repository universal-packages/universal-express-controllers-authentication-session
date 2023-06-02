import { AuthDynamic } from '@universal-packages/authentication'
import { AuthDynamicNames, SetSessionPayload } from '@universal-packages/express-controllers-authentication'
import '@universal-packages/express-session'

@AuthDynamic<AuthDynamicNames>('set-session')
export default class SetSessionDynamic {
  public async perform(payload: SetSessionPayload): Promise<string> {
    const { authenticatable, request } = payload
    const { session } = request

    await session.logIn(authenticatable.id)

    return session.token
  }
}
