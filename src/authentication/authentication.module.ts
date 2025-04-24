import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';

@Module({
  providers: [AuthenticationService, AuthenticationResolver],
  exports: [AuthenticationService], // Export the service to be used in other modules
})
export class AuthenticationModule {}
