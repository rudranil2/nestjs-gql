import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DonationsService } from './donations.service';
import { CreateDonationInput, PaginationProps } from 'src/graphql';

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  create(@Args('createDonationInput') createDonationInput: CreateDonationInput) {
    return this.donationsService.create(createDonationInput);
  }

  @Query('donations')
  findAll(@Args('args') args: PaginationProps) {
    return this.donationsService.findAll(args);
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne(id);
  }
}
