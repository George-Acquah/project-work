import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArduinoService } from './arduino.service';
import { CreateArduinoDto } from './dto/create-arduino.dto';
import { UpdateArduinoDto } from './dto/update-arduino.dto';

@Controller('arduino')
export class ArduinoController {
  constructor(private readonly arduinoService: ArduinoService) {}

  @Post()
  create(@Body() createArduinoDto: CreateArduinoDto) {
    return this.arduinoService.create(createArduinoDto);
  }

  @Get()
  findAll() {
    return this.arduinoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arduinoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArduinoDto: UpdateArduinoDto) {
    return this.arduinoService.update(+id, updateArduinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arduinoService.remove(+id);
  }
}
