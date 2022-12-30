import StudentRepository from '../repositories/student.repository';
import { IStudent } from '../models/student.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class StudentsService {
    getAll() {
        return StudentRepository.getAll();
    }

    getByDocument(document: string) {
        return StudentRepository.getByDocument(document);
    }

    async create(student: IStudent) {
        if(student.password) {
            student.password = await bcrypt.hash(student.password, 10);
        }
        return StudentRepository.create(student);
    }

    async authorization(document: string, password: string) {
        const student = await StudentRepository.getByDocument(document);

        if(!student) throw new Error('Estudante não encontrado!');

        const result = await bcrypt.compare(password, student.password);

        if(result) {
            return jwt.sign({ document: student.document, _id: student._id }, secretJWT, {
                expiresIn: '1h'
            });
        };

        throw new Error('Falha na autenticação!');
    }

    remove(document: string) {
        return StudentRepository.remove(document);
    }

    update(document: string, student: Partial<IStudent>) {
        return StudentRepository.update(document, student);
    }
}

export default new StudentsService();