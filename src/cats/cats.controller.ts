import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, SetMetadata, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from 'src/config/config.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { CatsServices } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.BAD_REQUEST);
  }
}
@ApiTags('cats')
@Controller('cats')
@UseFilters(new HttpExceptionFilter())
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsServices: CatsServices, private configService: ConfigService) {
    console.log("the port is ", this.configService.config.port)

  }


  @Get("/exception")
  async findException() {

    // throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    // throw new HttpException({
    //   status:HttpStatus.BAD_REQUEST,
    //   error:"this is a error",
    // }, 400)

    throw new ForbiddenException();

    return `This action returns all  cats`;
  }
  // OR extract a single param

  @Post()
  @Roles('admin')
  @UsePipes(ValidationPipe)
  create(@Body() createCatDto: CreateCatDto): string {
    this.catsServices.create(createCatDto);
    return `cat was created`;
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.catsServices.findAll();
  }


  @Get("/one")
  @Roles('admin')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateCatDto,
  })
  @ApiQuery({ name: 'id' })
  findOne(@Query("id") id) {
    return this.catsServices.findOne(id);
  }


  @Delete(":id")
  @ApiParam({ name: 'id' })
  deleteCat(@Param("id") id): String {
    this.catsServices.deleteOne(id);
    return "cat was deleted "
  }


  @Patch(":id")
  @ApiParam({ name: 'id' })
  updateCat(@Param("id") id, @Body() createCatDto: CreateCatDto) {
    return this.catsServices.updateOne(id, createCatDto);
  }

}
