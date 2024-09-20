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

  update(id: number, updateSongDto: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where: { id },
      data: {
        title: updateSongDto.title,
      },
    });
  }

  remove(where: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.delete({ where });
  }
}
