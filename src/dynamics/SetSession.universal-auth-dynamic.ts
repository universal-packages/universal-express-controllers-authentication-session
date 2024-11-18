import { AuthDynamic } from '@universal-packages/authentication'
import { ExpressControllersAuthDynamicNames, SetSessionPayload } from '@universal-packages/express-controllers-authentication'
import '@universal-packages/express-session'

@AuthDynamic<ExpressControllersAuthDynamicNames>('set-session')
export default class SetSessionDynamic {
  public async perform(payload: SetSessionPayload): Promise<string> {
    const { user, request } = payload
    const { session } = request

    await session.logIn(user.id)

    return session.token
  }
}
