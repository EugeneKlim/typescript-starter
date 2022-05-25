import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class NewsDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    ownerId: string;
}
