export class CreateBookDto {
  title: string;
  categoryIds: string[];
  authorId: string;
}
export class UpdateBookDto {
  title?: string;
  categoryIdsToUpdate?: string[];
  categoryIdsToDelete?: string[];
  authorId?: string;
}
