import { AuthDynamic } from '@universal-packages/authentication'
import { AuthDynamicNames, UnsetSessionPayload } from '@universal-packages/express-controllers-authentication'
import '@universal-packages/express-session'

@AuthDynamic<AuthDynamicNames>('unset-session')
export default class UnsetSessionDynamic {
  public async perform(payload: UnsetSessionPayload): Promise<void> {
    const { request, sessionId } = payload
    const { session } = request

    if (sessionId) {
      const sessions = await session.activeSessions()
      const sessionToken = Object.keys(sessions).find((sessionToken) => sessions[sessionToken].id === sessionId)

      if (sessionToken) await session.logOut(sessionToken)
    } else {
      await session.logOut()
    }
  }
}
