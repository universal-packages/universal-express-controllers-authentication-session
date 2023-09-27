import { Authenticatable, Authentication } from '@universal-packages/authentication'
import { AuthDynamicNames } from '@universal-packages/express-controllers-authentication'
import { Session } from '@universal-packages/express-session'
import { Request, Response } from 'express'

describe('set-session-device-uid', (): void => {
  it('sets the device id into the session', async (): Promise<void> => {
    const authentication = new Authentication<AuthDynamicNames>({ secret: '123', dynamicsLocation: './tests/__fixtures__' })
    await authentication.loadDynamics()

    const request = { headers: { 'user-agent': 'test' } } as Request
    const response = { header: jest.fn() as any, cookie: jest.fn() as any } as Response
    const session = new Session(request, response)

    request.session = session
    session.logIn(1)

    await authentication.performDynamic('set-session-device-id', { authenticatable: { id: 1 } as Authenticatable, request, deviceId: 'test' })

    expect(session.deviceId).toEqual('test')
  })
})
