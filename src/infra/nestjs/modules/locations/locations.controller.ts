import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateLocationService } from '../../../../applications/services/locations/create-location/create-location.service';
import { FindAllLocationsService } from '../../../../applications/services/locations/find-all-locations/find-all-locations.service';
import { FindOneLocationService } from '../../../../applications/services/locations/find-one-location/find-one-locations.service';
import { RemoveLocationService } from '../../../../applications/services/locations/remove-location/remove-location.service';
import { UpdateLocationService } from '../../../../applications/services/locations/update-location/update-location.service';
import { JwtAuthGuard } from '../../strategies/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Location } from '../../../../domain/locations/location';
import { CreateLocationDto } from './create-location.dto';
import { LocationView } from './location.view';
import { UpdateLocationDto } from './update-location.dts';

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(
    private readonly createLocationService: CreateLocationService,
    private readonly findOneLocationService: FindOneLocationService,
    private readonly findAllLocationsService: FindAllLocationsService,
    private readonly updateLocationService: UpdateLocationService,
    private readonly removeLocationService: RemoveLocationService,
  ) {}

  @ApiCreatedResponse({
    description: 'Location created',
  })
  @ApiBadRequestResponse({
    description: 'Some field has incorrect or missing data',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<LocationView> {
    const location =
      await this.createLocationService.execute(createLocationDto);
    return LocationView.toView(location);
  }

  @ApiOkResponse({
    description: 'Locations list by company',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Get()
  async findAll(@Body() where: Partial<Location>): Promise<LocationView[]> {
    const locations = await this.findAllLocationsService.execute({ where });
    return locations.map((location) => LocationView.toView(location));
  }

  @ApiOkResponse({
    description: 'Specific location information',
  })
  @ApiBadRequestResponse({
    description: 'Location not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Get(':locationId')
  async findOne(@Param('locationId') locationId: string) {
    const location = await this.findOneLocationService.execute(locationId);
    return LocationView.toView(location);
  }

  @ApiOkResponse({
    description: 'Successfully updated location',
  })
  @ApiBadRequestResponse({
    description: 'Location not found or some field has incorrect data',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Put(':locationId')
  async update(
    @Param('locationId') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    const location = await this.updateLocationService.execute(
      updateLocationDto,
      locationId,
    );
    return LocationView.toView(location);
  }

  @ApiOkResponse({
    description: 'Successfully removed location',
  })
  @ApiBadRequestResponse({
    description: 'Location not found or some field has incorrect data',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Delete(':locationId')
  async remove(@Param('locationId') locationId: string) {
    await this.removeLocationService.execute(locationId);
  }
}
