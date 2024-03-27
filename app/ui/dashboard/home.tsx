'use client';

import { useGetUserByEmailQuery } from "@/redux/services/userapi";

interface UserByEmail {
    message: string;
    statusCode: number;
    data: {
        id: number;
        Member: {
            id: number;
            company: { id: number; name: string }
        };
        Profile: { id: number; firstname: string; lastname: string }
    };
}

export default function DashboardPageHome() {

    let email = '';
    if (typeof window !== 'undefined') {
        email = localStorage.getItem('userEmail') || '';
    }

    const { data, error, isLoading, isFetching } = useGetUserByEmailQuery(email);
    if (isLoading || isFetching) return <p> Cargando...</p>;
    if (error) {
        console.log(error);
        return <p>Ha ocurrido un error</p>;
    }

    const user: UserByEmail | undefined = data && data;

    return (
        <div>
            {user ? (
                <div>
                    <p>Usuario: {user.data.id}</p>
                    <p>Compañia: {user.data.Member.company.name}</p>
                    <p>Miembro N°.: {user.data.Member.id}</p>
                    <p>Nombre: {user.data.Profile.firstname}</p>
                    <p>Apellido: {user.data.Profile.lastname}</p>
                </div>
            ) : (
                <p>No se encontraron datos de usuario</p>
            )}
        </div>
    );
}