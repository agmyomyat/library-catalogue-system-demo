export class CreateStudentDto {
  name: string;
  email: string;
  phone: string;
}
export class UpdateStudentDto {
  name?: string;
  email?: string;
  phone?: string;
}
