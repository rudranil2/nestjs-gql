import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('value ', value);
    // console.log('metadata ', metadata);

    switch (metadata.type) {
      case 'body':
        const { error } = this.schema.validate(value, {
          allowUnknown: false,
          errors: {
            wrap: {
              label: false,
            },
          },
        });
        if (error) {
          throw new BadRequestException(error.details[0].message);
        }

      default:
        return value;
    }
  }
}
