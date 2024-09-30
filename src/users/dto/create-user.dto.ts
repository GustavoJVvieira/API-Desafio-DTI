import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        description: 'Nome do USuario',
        type: String,
        example: 'Gustavo Vieira'
    })
    name :string ;
    
    @ApiProperty({
        description: 'Username do Usuario',
        type: String,
        example: 'Guto'
    })
    username : string;

    @ApiProperty({
        description: 'Email do Usuario',
        type: String,
        example: 'gustavo@gmail.com'
    })

    email : string;

    @ApiProperty({
        description: 'Senha do Usuario',
        type: String,
        example: '123456'
    })
    password : string;
    
}
