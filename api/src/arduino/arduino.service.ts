import { Injectable } from '@nestjs/common';
import { CreateArduinoDto } from './dto/create-arduino.dto';
import { UpdateArduinoDto } from './dto/update-arduino.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { _IArduinoData } from 'src/shared/interfaces/arduino-data.interface';
import { ArduinoData } from 'src/shared/schemas/arduino-data.schema';

@Injectable()
export class ArduinoService {
  constructor(
    @InjectModel('ArduinoData') private arduinoDataModel: Model<ArduinoData>,
  ) {}
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

  async saveSensorData(value: number): Promise<_IArduinoData> {
    const newData = new this.arduinoDataModel({ value });
    return newData.save();
  }

  async getSensorData(): Promise<_IArduinoData[]> {
    return this.arduinoDataModel.find().exec();
  }
}
