import { Authentication } from '@universal-packages/authentication'
import UserFromId from '@universal-packages/authentication/UserFromId.universal-auth-dynamic'
import { ExpressControllersAuthDynamicNames } from '@universal-packages/express-controllers-authentication'
import { Session } from '@universal-packages/express-session'
import { Request } from 'express'

describe('user-from-request', (): void => {
  it('returns the user based on session data', async (): Promise<void> => {
    const authentication = new Authentication<ExpressControllersAuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
    await authentication.loadDynamics()

    dynamicApiJest.mockDynamicReturnValue(UserFromId, { id: '1' })

    const result = await authentication.performDynamic('user-from-request', {
      request: { session: { userId: '1', authenticated: true } as Session } as Request
    })

    expect(result).toEqual({ id: '1' })
  })

  it('returns nothing if session does not has the data', async (): Promise<void> => {
    const authentication = new Authentication<ExpressControllersAuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
    await authentication.loadDynamics()

    const result = await authentication.performDynamic('user-from-request', {
      request: { session: { authenticated: false } as Session } as Request
    })

    expect(result).toEqual(undefined)
  })
})
