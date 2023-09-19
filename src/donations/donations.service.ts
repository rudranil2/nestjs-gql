import { Injectable } from '@nestjs/common';
import { CreateDonationInput } from './dto/create-donation.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDonationInput: CreateDonationInput) {
    return 'This action adds a new donation';
  }

  async findAll() {
    return this.prisma.donation.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }
}
