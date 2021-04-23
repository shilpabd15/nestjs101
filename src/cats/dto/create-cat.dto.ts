import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateCatDto {

  @ApiProperty()
  @IsNotEmpty({ message: "cat should have a name" })
  name: string;

  @ApiProperty({
    description: 'The age of a cat',
    minimum: 1,
    default: 1,
  })
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2)
  breed: string;
}