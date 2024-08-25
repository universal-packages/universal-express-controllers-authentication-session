import { AuthDynamic, AuthDynamicNames, Authenticatable, IdPayload } from '@universal-packages/authentication'

@AuthDynamic<AuthDynamicNames>('authenticatable-from-id')
export default class AuthenticatableFromIdDynamic {
  public async perform(payload: IdPayload): Promise<Authenticatable> {
    return { id: payload.id } as any
  }
}
