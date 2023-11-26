import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { strategies } from '../constants/auth.constants';

@Injectable()
export class ParkingCenterGuard extends AuthGuard(strategies.PARKING_CENTER) {}
