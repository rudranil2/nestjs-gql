import { Injectable } from '@nestjs/common';
import { CreateDonationInput } from 'src/graphql';
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

  async findAll() {
    const donations = await this.prisma.donation.findMany();

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
