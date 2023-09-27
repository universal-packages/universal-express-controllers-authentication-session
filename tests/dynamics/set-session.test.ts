import { Authenticatable, Authentication } from '@universal-packages/authentication'
import { AuthDynamicNames } from '@universal-packages/express-controllers-authentication'
import { Session } from '@universal-packages/express-session'
import { Request, Response } from 'express'

describe('set-session', (): void => {
  it('sets the new session and returns the token', async (): Promise<void> => {
    const authentication = new Authentication<AuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
    await authentication.loadDynamics()

    const request = { headers: { 'user-agent': 'test' } } as Request
    const response = { header: jest.fn() as any, cookie: jest.fn() as any } as Response
    const session = new Session(request, response)

    request.session = session

    const result = await authentication.performDynamic('set-session', { authenticatable: { id: 1 } as Authenticatable, request, response })

    expect(result).toEqual(expect.any(String))
  })
})
