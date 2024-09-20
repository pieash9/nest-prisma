import { Injectable } from '@nestjs/common';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSongDto: Prisma.SongCreateInput) {
    return this.prisma.song.create({
      data: {
        title: createSongDto.title,
      },
    });
  }

  findAll() {
    return this.prisma.song.findMany();
  }

  findOne(id: number) {
    return this.prisma.song.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
