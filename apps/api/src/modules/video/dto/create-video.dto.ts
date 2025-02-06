export class CreateVideoDto {
  title: string;
  description?: string;
  file: Express.Multer.File;
}
