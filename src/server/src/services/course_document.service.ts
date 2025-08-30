import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { CourseDocument } from '@/interfaces/courses.interface';
import { Service } from 'typedi';

@Service()
export class CourseDocumentService {
  public async findAll(): Promise<CourseDocument[]> {
    const allDocuments: CourseDocument[] = await DB.CourseDocument.findAll();
    return allDocuments;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: CourseDocument[] }> {
    const { count, rows }: { count: number; rows: CourseDocument[] } = await DB.CourseDocument.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findDocumentById(documentId: string): Promise<CourseDocument> {
    const findDocument: CourseDocument = await DB.CourseDocument.findByPk(documentId);
    if (!findDocument) throw new HttpException(409, "Document doesn't exist");

    return findDocument;
  }

  public async createDocument(documentData: Partial<CourseDocument>): Promise<CourseDocument> {
    await DB.CourseDocument.destroy({
      force: true,
      where: { courseId: documentData.courseId },
    });

    const createDocumentData: CourseDocument = await DB.CourseDocument.create(documentData);
    return createDocumentData;
  }

  public async updateDocument(documentId: string, documentData: Partial<CourseDocument>): Promise<CourseDocument> {
    const findDocument: CourseDocument = await DB.CourseDocument.findByPk(documentId);
    if (!findDocument) throw new HttpException(409, "Document doesn't exist");

    await DB.CourseDocument.update(documentData, { where: { id: documentId } });

    const updateDocument: CourseDocument = await DB.CourseDocument.findByPk(documentId);
    return updateDocument;
  }

  public async deleteDocument(documentId: string): Promise<CourseDocument> {
    const findDocument: CourseDocument = await DB.CourseDocument.findByPk(documentId);
    if (!findDocument) throw new HttpException(409, "Document doesn't exist");

    await DB.CourseDocument.destroy({ where: { id: documentId } });

    const softDeletedDocument: CourseDocument = await DB.CourseDocument.findByPk(documentId);
    return softDeletedDocument;
  }

  public async destroyDocument(documentId: string): Promise<CourseDocument> {
    const findDocument: CourseDocument = await DB.CourseDocument.findByPk(documentId, { paranoid: false });
    if (!findDocument) throw new HttpException(409, "Document doesn't exist");

    await DB.CourseDocument.destroy({ force: true, where: { id: documentId } });

    return findDocument;
  }

  public async findDocumentsByCourseId(courseId: string): Promise<CourseDocument[]> {
    const documents: CourseDocument[] = await DB.CourseDocument.findAll({
      where: { courseId },
    });
    return documents;
  }
}
