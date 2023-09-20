import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { DonationsService } from './donations.service';
import { CreateDonationInput, PaginationProps, Result } from 'src/graphql';
import { UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../shared/validators/joi-validation.interceptor';
import { CreateDonationSchema } from './donations.dto';
import { PaginationSchema } from '../shared/validation-schema/shared.dto';

//For subscriptions
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @UsePipes(new JoiValidationPipe(CreateDonationSchema))
  @Mutation('createDonation')
  async create(@Args('createDonationInput') createDonationInput: CreateDonationInput) {
    const data = await this.donationsService.create(createDonationInput);

    //When a donation is made, recalculate the total and publish an event
    const total = await this.donationsService.totalDonations();
    const result: Result = { total };

    //Publishing the event
    pubSub.publish('totalUpdated', { totalUpdated: result });

    return data;
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

  @Query('totalDonations')
  totalDonations() {
    return this.donationsService.totalDonations();
  }

  @Subscription()
  totalUpdated() {
    //*! Subscription method name i.e. `totalUpdated()` has to be same as the Subscription name mentioned in the GQL schema!
    return pubSub.asyncIterator('totalUpdated');
  }
}
