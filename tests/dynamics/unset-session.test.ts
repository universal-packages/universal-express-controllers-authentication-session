import { Authenticatable, Authentication } from '@universal-packages/authentication'
import { AuthDynamicNames } from '@universal-packages/express-controllers-authentication'
import { Request } from 'express'

describe('express-controllers-authentication-session', (): void => {
  describe('dynamics', (): void => {
    describe('unset-session', (): void => {
      it('unset the current session', async (): Promise<void> => {
        const authentication = new Authentication<AuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
        await authentication.loadDynamics()

        const request = { session: { logOut: jest.fn() } as any } as Request

        const result = await authentication.performDynamic('unset-session', { authenticatable: { id: 1 } as Authenticatable, request })

        expect(result).toBeUndefined()
        expect(request.session.logOut).toHaveBeenCalled()
      })

      it('unset the session from a sessionId', async (): Promise<void> => {
        const authentication = new Authentication<AuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
        await authentication.loadDynamics()

        const request = { session: { logOut: jest.fn(), activeSessions: () => ({ '123': { id: '1' }, '456': { id: '2' } }) } as any } as Request

        const result = await authentication.performDynamic('unset-session', { authenticatable: { id: 1 } as Authenticatable, request, sessionId: '1' })

        expect(result).toBeUndefined()
        expect(request.session.logOut).toHaveBeenCalledWith('123')
      })
    })
  })
})
