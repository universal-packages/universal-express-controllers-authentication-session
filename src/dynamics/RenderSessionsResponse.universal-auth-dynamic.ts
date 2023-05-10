import '@universal-packages/express-session'
import { AuthDynamic } from '@universal-packages/authentication'
import { AuthDynamicNames, RenderSessionsResponsePayload } from '@universal-packages/express-controllers-authentication'

@AuthDynamic<AuthDynamicNames>('render-sessions-response')
export default class RenderSessionsResponseDynamic {
  public async perform(payload: RenderSessionsResponsePayload): Promise<Record<string, any>> {
    const session = payload.request.session

    const sessions = Object.values(await session.activeSessions()).map((session) => {
      return {
        id: session.id,
        lastActive: session.lastAccessed,
        ip: session.lastIp,
        userAgent: session.userAgent
      }
    })

    return { sessions }
  }
}
