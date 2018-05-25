import { route } from './decorator';

export class AuthController {
  @route('get', '/.well-known/pki-validation/fileauth.txt')
  async auth() {
    return '201608241742072yvt8bxp9jv0ycginrnnebwgy1nvwgvxtssucy39w7b20nelfa';
  }
}
