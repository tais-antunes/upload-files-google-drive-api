import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from './firebase';

const AdminDashboard = () => {
    const [modalInstance, setModalInstance] = useState(null);
    const [coordinators, setCoordinators] = useState([]); // Lista de coordenadores

    useEffect(() => {
        // Carregar coordenadores ao montar o componente
        loadCoordinators();
    }, []);

    const openModal = () => {
        const modal = document.getElementById('modal-coordinator');
        const instance = M.Modal.init(modal);
        setModalInstance(instance);
        instance.open();
    };

    const openPeriodModal = () => {
        const modal = document.getElementById('modal-period');
        const instance = M.Modal.init(modal);
        setModalInstance(instance);
        instance.open();
    };

    const handleCoordinatorSubmit = async (e) => {
        e.preventDefault();
        try {
            // Adicionar dados do coordenador ao Firestore
            const newCoordinator = {
                usuario: e.target.usuario.value,
                name: e.target.name.value,
                project: e.target.project.value,
            };

            const docRef = await addDoc(collection(firestore, 'coordinators'), newCoordinator);

            setCoordinators((prevCoordinators) => [...prevCoordinators, { id: docRef.id, ...newCoordinator }]);

            // Feche a modal após enviar os dados
            modalInstance.close();
        } catch (error) {
            console.error('Erro ao adicionar coordenador:', error.message);
        }
    };

    const handlePeriodSubmit = () => {
        // Adicione aqui o código para lidar com o período escolhido
        // Você pode acessar os valores dos inputs usando document.getElementById
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        // Aqui você pode adicionar a lógica para usar startDate e endDate como necessário

        // Feche a modal após enviar os dados
        modalInstance.close();
    };

    const loadCoordinators = async () => {
        try {
            // Buscar coordenadores do Firestore
            const q = query(collection(firestore, 'coordinators'), orderBy('name'));
            const querySnapshot = await getDocs(q);
            const coordinatorList = [];

            querySnapshot.forEach((doc) => {
                coordinatorList.push({ id: doc.id, ...doc.data() });
            });

            setCoordinators(coordinatorList);
        } catch (error) {
            console.error('Erro ao buscar coordenadores:', error.message);
        }
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h1 style={{ color: 'darkgreen', fontSize: '30px', fontWeight: '600' }}>Admin Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '100px'}}>
                <button className="btn modal-trigger waves-effect waves-light btn green" data-target="modal-coordinator" onClick={openModal}>
                    Cadastrar Coordenador
                </button>

                <button className="btn modal-trigger waves-effect waves-light btn green" data-target="modal-period" onClick={openPeriodModal}>
                    Periodo Prestação de Contas
                </button>
            </div>


            {/* Modal para cadastrar coordenador */}
            <div id="modal-coordinator" className="modal">
                <div className="modal-content">
                    <h4 style={{ color: 'darkgreen', fontSize: '30px', fontWeight: '600' }}>Cadastrar Coordenador</h4>
                    <form onSubmit={handleCoordinatorSubmit}>
                        <div className="input-field">
                            <input type="text" id="name" name="name" required />
                            <label htmlFor="name">Nome do Coordenador</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="usuario" name="usuario" required />
                            <label htmlFor="usuario">Usuário</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="project" name="project" required />
                            <label htmlFor="project">Nome do Projeto</label>
                        </div>
                        <button type="submit" className="waves-effect waves-light btn green">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal para definir o período de prestação de contas */}
            <div id="modal-period" className="modal">
                <div className="modal-content">
                    <h4 style={{ color: 'darkgreen', fontSize: '30px', fontWeight: '600' }}>Definir Período de Prestação de Contas</h4>
                    <p>Escolha uma data inicial e uma data final para o período de prestação de contas.</p>
                    <div className="input-field">
                        <input type="date" id="startDate" name="startDate" required />
                        <label htmlFor="startDate">Data Inicial</label>
                    </div>
                    <div className="input-field">
                        <input type="date" id="endDate" name="endDate" required />
                        <label htmlFor="endDate">Data Final</label>
                    </div>
                    <button className="waves-effect waves-light btn green" onClick={handlePeriodSubmit}>
                        Confirmar Período
                    </button>
                </div>
            </div>

            {/* Lista de coordenadores */}
            <h2 style={{ color: 'darkgreen', fontSize: '30px', fontWeight: '600' }}>Coordenadores Cadastrados</h2>
            <table>
                <thead>
                    <tr>
                    <th>Usuário</th>
                        <th>Nome do Coordenador</th>
                        <th>Nome do Projeto</th>
                    </tr>
                </thead>
                <tbody>
                    {coordinators.map((coordinator) => (
                        <tr key={coordinator.id}>
                            <td>{coordinator.usuario}</td>
                            <td>{coordinator.name}</td>
                            <td>{coordinator.project}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
