import { Authentication } from '@universal-packages/authentication'
import { AuthDynamicNames } from '@universal-packages/express-controllers-authentication'
import { Session } from '@universal-packages/express-session'
import { Request } from 'express'

describe('express-controllers-authentication-session', (): void => {
  describe('dynamics', (): void => {
    describe('authenticatable-from-request', (): void => {
      it('returns the authenticatable based on session data', async (): Promise<void> => {
        const authentication = new Authentication<AuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
        await authentication.loadDynamics()

        const result = await authentication.performDynamic('authenticatable-from-request', {
          request: { session: { authenticatableId: '1', authenticated: true } as Session } as Request
        })

        expect(result).toEqual({ id: '1' })
      })

      it('returns nothing if session does not has the data', async (): Promise<void> => {
        const authentication = new Authentication<AuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
        await authentication.loadDynamics()

        const result = await authentication.performDynamic('authenticatable-from-request', {
          request: { session: { authenticated: false } as Session } as Request
        })

        expect(result).toEqual(undefined)
      })
    })
  })
})
