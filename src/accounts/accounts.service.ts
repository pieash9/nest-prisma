import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { TransferAccountDTO } from './dto/transfer-accounts.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: Prisma.AccountCreateInput) {
    return this.prisma.account.create({ data: createAccountDto });
  }

  transfer(transferAccountDTO: TransferAccountDTO) {
    const { sender: from, receiver: to, amount } = transferAccountDTO;
    return this.prisma.$transaction(async (tx) => {
      const sender = await tx.account.update({
        where: { id: from },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      if (sender.balance < 0) {
        throw new Error(`${from} doesn't have enough to send ${amount}`);
      }

      const recipient = await tx.account.update({
        where: { id: to },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      return recipient;
    });
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
