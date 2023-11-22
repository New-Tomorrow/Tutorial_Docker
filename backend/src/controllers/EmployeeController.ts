import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Employee } from '../entities/Employee';
import { ObjectID } from 'mongodb'

class EmployeeController {

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, sobrenome, data, cargos } = req.body

            const obj = new Employee()
            obj.nome = nome
            obj.sobrenome = sobrenome
            obj.data = data
            obj.cargos = cargos

            await AppDataSource.manager.save(Employee, obj)
            return res.json({ message: "Funcionário cadastrado com sucesso." })

        } catch (error) {
            return res.json({ error: "Erro ao Cadastrar." })
        }
    }


    async list(req: Request, res: Response): Promise<Response> {
        try {
            const funcionarios = await AppDataSource.getRepository(Employee).find()
            return res.json(funcionarios)

        } catch (error) {
            return res.json({ error: "Erro ao listar os funcionários." })
        }
    }


    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;

            const { nome, sobrenome, data, cargos } = req.body

            const funcId = new ObjectID(id)
            const funcionario = AppDataSource.getRepository(Employee)

            const obj = await funcionario.findOne(funcId)

            obj.nome = nome
            obj.sobrenome = sobrenome
            obj.data = data
            obj.cargos = cargos

            await funcionario.save(obj)
            return res.json(obj)

        } catch (error) {
            return res.json({ error: "Erro ao Atualizar." })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;

            const funcionario = AppDataSource.getRepository(Employee);
            const tem = await funcionario.findOne(id);

            if (!tem) {
                return res.json({ error: "Funcionário não encontrado." });
            }

            await funcionario.delete(id);
            return res.json({ message: "Funcionário excluido com sucesso." });

        } catch (error) {
            return res.json({ error: "Erro ao deletar o funcionario." })
        }
    }

    async one(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id
            const funcId = new ObjectID(id)
            const funcionario = await AppDataSource.getRepository(Employee).findOne(funcId)
            return res.json(funcionario)

        } catch (error) {
            console.log(error)
            return res.json({ error: "Erro ao listar o Funcionario" })
        }
    }




} export default new EmployeeController();