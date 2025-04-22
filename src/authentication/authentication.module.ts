import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Module({
  providers: [AuthenticationService],
  exports: [AuthenticationService], // Export the service to be used in other modules
})
export class AuthenticationModule {}
