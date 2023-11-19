import { Injectable } from '@nestjs/common';
import { CreateArduinoDto } from './dto/create-arduino.dto';
import { UpdateArduinoDto } from './dto/update-arduino.dto';

@Injectable()
export class ArduinoService {
  create(createArduinoDto: CreateArduinoDto) {
    return 'This action adds a new arduino';
  }

  findAll() {
    return `This action returns all arduino`;
  }

  findOne(id: number) {
    return `This action returns a #${id} arduino`;
  }

  update(id: number, updateArduinoDto: UpdateArduinoDto) {
    return `This action updates a #${id} arduino`;
  }

  remove(id: number) {
    return `This action removes a #${id} arduino`;
  }
}
