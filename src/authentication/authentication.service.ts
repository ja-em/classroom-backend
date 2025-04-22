import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  generateAccessToken(): string {
    // Implement JWT token generation logic here
    return 'generated-token'; // Placeholder for the actual token
  }
}
