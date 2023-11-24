import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { strategies } from '../constants/auth.constants';

@Injectable()
export class VehicleAuthGuard extends AuthGuard(strategies.VEHICLE) {}
