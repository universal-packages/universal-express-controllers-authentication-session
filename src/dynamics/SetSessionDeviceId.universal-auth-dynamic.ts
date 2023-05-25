import { AuthDynamic } from '@universal-packages/authentication'
import { AuthDynamicNames, SetSessionDeviceIdPayload } from '@universal-packages/express-controllers-authentication'

@AuthDynamic<AuthDynamicNames>('set-session-device-id')
export default class SetSessionDeviceIdDynamic {
  public async perform(payload: SetSessionDeviceIdPayload): Promise<void> {
    const session = payload.request.session

    await session.updateDeviceId(payload.deviceId)
  }
}
