import { Injectable } from '@nestjs/common';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSongDto: Prisma.SongUncheckedCreateInput) {
    return this.prisma.song.create({
      data: createSongDto,
    });
  }

  findAll() {
    return this.prisma.song.findMany({
      include: {
        artist: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.song.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSongDto: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where: { id },
      data: updateSongDto,
    });
  }

  remove(where: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.delete({ where });
  }
}
