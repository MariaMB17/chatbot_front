import { Invoice } from "./invoice-model"
import { Member } from "./member-model"

export interface Company {
    id: number,
    name: string,
    rif: string,
    addres: string,
    numberphone: string,
    member: Member[]
    invoice: Invoice[]
}