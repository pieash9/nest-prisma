import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { UpdateSongDto } from './dto/update-song.dto';
import { Prisma } from '@prisma/client';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: Prisma.SongUncheckedCreateInput) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSongDto: Prisma.SongUpdateInput,
  ) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.SongWhereUniqueInput) {
    return this.songsService.remove({ id: +id });
  }
}
