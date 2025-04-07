import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma.service';
import { members_gender } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createMemberDto: CreateMemberDto) {
    return await this.prisma.members.create({
      data: {
        ...createMemberDto,
        gender: createMemberDto.gender as members_gender,
        birth_date: new Date(createMemberDto.birth_date),
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      }
    });
  }

  async findAll() {
    return await this.prisma.members.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.members.findFirst({
      where: { id: id }
    });
  }

  async pay(id: number) {
    const member = await this.prisma.members.findFirst({ where: { id: id } });
    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }
    let currentMonth = new Date(Date.now()).getMonth() + 1;
    const is_paid = await this.prisma.payments.findMany({
      where: {
        member_id: id,
      }
    })
    if (is_paid) {
      for (let i = 0; i < is_paid.length; i++) {
        if (is_paid[i].paid_at.getMonth() + 1 === currentMonth) {
          throw new HttpException('Already paid this month', HttpStatus.CONFLICT);
        }
      }
    }
    const payment = await this.prisma.payments.create({
      data: {
        member_id: id,
        amount: 5000,
        paid_at: new Date(Date.now())
      }
    });
    return payment;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
