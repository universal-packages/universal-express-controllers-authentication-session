import { AuthDynamic } from '@universal-packages/authentication'
import { ExpressControllersAuthDynamicNames, RenderSessionsPayload } from '@universal-packages/express-controllers-authentication'
import '@universal-packages/express-session'

@AuthDynamic<ExpressControllersAuthDynamicNames>('render-sessions')
export default class RenderSessionsDynamic {
  public async perform(payload: RenderSessionsPayload): Promise<Record<string, any>[]> {
    const session = payload.request.session

    return Object.values(await session.activeSessions()).map((session) => {
      return {
        id: session.id,
        lastActive: session.lastAccessed,
        ip: session.lastIp,
        userAgent: session.userAgent
      }
    })
  }
}
