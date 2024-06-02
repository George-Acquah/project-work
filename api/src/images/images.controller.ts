// ... (other imports)
import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly storageService: StorageService) {}

  @Get(':fileName')
  async serveImage(@Param('fileName') fileName: string, @Res() res: Response) {
    console.log('hit');
    await this.storageService.streamFileToResponse(fileName, res);
  }
}
