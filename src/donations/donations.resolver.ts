import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DonationsService } from './donations.service';
import { CreateDonationInput, PaginationProps } from 'src/graphql';
import { UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../shared/validators/joi-validation.interceptor';
import { CreateDonationSchema } from './donations.dto';
import { PaginationSchema } from '../shared/validation-schema/shared.dto';

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @UsePipes(new JoiValidationPipe(CreateDonationSchema))
  @Mutation('createDonation')
  create(@Args('createDonationInput') createDonationInput: CreateDonationInput) {
    return this.donationsService.create(createDonationInput);
  }

  @UsePipes(new JoiValidationPipe(PaginationSchema))
  @Query('donations')
  findAll(@Args('args') args: PaginationProps) {
    return this.donationsService.findAll(args);
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne(id);
  }
}
