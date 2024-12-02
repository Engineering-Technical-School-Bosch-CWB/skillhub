import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import ExplorerContainer from "../../components/ExplorerContainer";
import IIdentificationCardProps from "../../components/ExplorerContainer/Components/IdentificationCard/IIdentificationCardProps";
import Divider from "../../components/Divider";
import StudentCard from "../../components/StudentCard";
import { IStudentCardProps } from "../../components/StudentCard/interfaces/IStudentCard.interfaces";

import styles from './styles.module.css'
import DoughnutChart from "../../components/DoughnutChart";
import SingleBarChart from "../../components/SingleBarChart";

export default () => {
    const { id } = useParams<{ id: string }>();

    const courseSubjects: IIdentificationCardProps[] = [
        {
            color: "#1a73e8",
            goTo: '/subjects/mathematics',
            subtitle: 'Queila Lima',
            title: "Python",
        },
        {
            color: "#34a853",
            goTo: '/subjects/physics',
            subtitle: 'L. Trevisan',
            title: "C# Básico",
        },
        {
            color: "#34a853",
            goTo: '/subjects/programming',
            subtitle: 'L. Trevisan',
            title: "C# Avançado",
        },
        {
            color: "#fbbc05",
            goTo: '/subjects/chemistry',
            subtitle: 'Donathan',
            title: "Banco de Dados",
        },
        {
            color: "#ff6f00",
            goTo: '/subjects/english',
            subtitle: 'Queila Lima',
            title: "Inglês",
        }
    ];
    
    const studentCards: IStudentCardProps[] = [
        {
            student: {
                id: 1,
                name: "Alice Silva",
                identification: "20230001",
                hash: "abc123",
                birthday: new Date(2002, 5, 15),
                is_active: true,
                image: { image: "/avatar.png" },
                position: { id: 1, name: "Estudante" },
                sector: { id: 1, name: "Ensino Médio" },
                occupation_area: { id: 1, name: "Ciências Exatas" }
            },
            className: "student-card primary",
            tooltip: "Aluno ativo",
            size: "medium"
        },
        {
            student: {
                id: 2,
                name: "Bruno Costa",
                identification: "20230002",
                hash: "def456",
                birthday: new Date(2003, 2, 10),
                is_active: true,
                image: { image: "/avatar.png" },
                position: { id: 1, name: "Estudante" },
                sector: { id: 2, name: "Ensino Técnico" },
                occupation_area: { id: 2, name: "Tecnologia da Informação" }
            },
            className: "student-card secondary",
            tooltip: "Aluno em curso",
            size: "large"
        },
        {
            student: {
                id: 3,
                name: "Carla Menezes",
                identification: "20230003",
                hash: "ghi789",
                birthday: new Date(2004, 7, 22),
                is_active: false,
                image: { image: "/avatar.png" },
                position: { id: 1, name: "Estudante" },
                sector: { id: 3, name: "Ensino Fundamental" },
                occupation_area: { id: 3, name: "Ciências Humanas" }
            },
            className: "student-card disabled",
            tooltip: "Aluno inativo",
            size: "small"
        },
        {
            student: {
                id: 4,
                name: "Diego Nascimento",
                identification: "20230004",
                hash: "jkl012",
                birthday: new Date(2001, 10, 5),
                is_active: true,
                image: { image: "/avatar.png" },
                position: { id: 2, name: "Estudante Avançado" },
                sector: { id: 4, name: "Ensino Superior" },
                occupation_area: { id: 4, name: "Engenharia" }
            },
            className: "student-card primary",
            tooltip: "Aluno destaque",
            size: "medium"
        },
        {
            student: {
                id: 5,
                name: "Fernanda Ribeiro",
                identification: "20230005",
                hash: "mno345",
                birthday: new Date(2000, 1, 18),
                is_active: true,
                image: { image: "/avatar.png" },
                position: { id: 3, name: "Aluna Pesquisadora" },
                sector: { id: 5, name: "Pós-Graduação" },
                occupation_area: { id: 5, name: "Biotecnologia" }
            },
            className: "student-card highlight",
            tooltip: "Pesquisadora",
            size: "large"
        }
    ];
    

    return (
        <div>
            <Header /> 
            <ExplorerContainer data={courseSubjects} title="Dta 2022" addPath="/" />
            
            <Divider />
            <h2>Alunos</h2>
            <br />
            <div className={`${styles.student_container} ${styles.align}`} >
                {
                    studentCards.map(e => (
                        <StudentCard  student={e.student} /> 
                    ))
                }
            </div>

            <Divider />

            <h2>Aproveitamento da Turma</h2>

            <section>
                {/* <SingleBarChart data={[]} xAxis="" yAxis="" /> */}
                <DoughnutChart exploitation={75}  />
            </section>

            <section>

            </section>
            
            <section>

            </section>

        </div>
    )
}