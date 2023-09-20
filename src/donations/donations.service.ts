import { Injectable } from '@nestjs/common';
import { CreateDonationInput, PaginationProps } from 'src/graphql';
import { PrismaService } from 'prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDonationInput: CreateDonationInput) {
    return this.prisma.donation.create({
      data: createDonationInput,
    });
  }

  async findAll(args: PaginationProps) {
    const { limit = 10, page = 1, sortOrder = 'desc', sortBy = 'createdAt' } = args;

    const donations = await this.prisma.donation.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * 10,
      take: limit,
    });

    return donations.map(el => {
      const obj: any = Object.assign({}, el);
      obj.createdAt = dayjs(new Date(obj.createdAt)).format('DD/MM/YYYY');
      return obj;
    });
  }

  async findOne(id: number) {
    const obj: any = await this.prisma.donation.findFirst({
      where: { id },
    });

    if (obj) {
      obj.createdAt = dayjs(new Date(obj.createdAt)).format('DD/MM/YYYY');
      return obj;
    }

    return null;
  }
}
