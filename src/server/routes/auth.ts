import { route } from './decorator';

export class AuthController {
  @route('get', '/.well-known/pki-validation/fileauth.txt')
  async auth() {
    return '201805240337123zrbho42qpe5ku5nmqab69kx5k392vh58hitanj6cr9bx2uh0y';
  }
}
