import { AuthDynamic, AuthDynamicNames, Authenticatable, AuthenticatableFromIdPayload } from '@universal-packages/authentication'

@AuthDynamic<AuthDynamicNames>('authenticatable-from-id')
export default class AuthenticatableFromIdDynamic {
  public async perform(payload: AuthenticatableFromIdPayload): Promise<Authenticatable> {
    return { id: payload.id } as any
  }
}
