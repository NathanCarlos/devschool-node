import { Request, Response, Router } from 'express';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
import StudentsService from '../services/students.service';

const router = Router();

router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const students = await StudentsService.getAll();
    res.send(students);
});

router.get('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const student = await StudentsService.getByDocument(req.params.document);
    if(!student) return res.status(400).send({ message: "Estudante não encontrado!"});
    res.status(200).send(student);
});

router.post('/', authorizationMiddleware, async (req: Request, res: Response) => {
    if (req.body.age < 18) {
        return res.status(400).send({ message: 'Estudante não foi criado pois não tem a idade mínima(18 anos).'});
    }
    await StudentsService.create(req.body);
    res.status(201).send({message: 'Estudante Criado com Sucesso!'});
});

router.post('/authorization', async (req: Request, res: Response) => {
    try {
        const token = await StudentsService.authorization(req.body.document, req.body.password);
        res.status(200).send({ token });
    } catch (error: any) {
        res.status(401).send({ message: error.message });
    }
});

router.delete('/remove/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await StudentsService.remove(req.params.document);
        res.status(200).send({ message: "Estudante removido com sucesso!" });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
    
});

router.put('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await StudentsService.update(req.params.document, req.body);
        res.status(200).send({ message: "Estudante atualizado com sucesso!" });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
    
});

export default router;