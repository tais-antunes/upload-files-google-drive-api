import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import './ItemList.css';

const ItemListComponent = () => {
  const [items, setItems] = useState([]);
  const [editandoItem, setEditandoItem] = useState(null);
  const [modalData, setModalData] = useState({ id: null, nome: '' });
  const [novoItem, setNovoItem] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const itemsCollection = collection(firestore, 'itens');
      const snapshot = await getDocs(itemsCollection);
      const itemList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemList);
    } catch (error) {
      console.error('Erro ao obter dados do Firestore:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Apenas no carregamento inicial

  useEffect(() => {
    const modalElement = document.getElementById('modal-excluir');
    M.Modal.init(modalElement);
  }, []); // Inicializa a modal quando o componente é montado

  const handleAdicionarItem = async () => {
    try {
      const itemsCollection = collection(firestore, 'itens');
      await addDoc(itemsCollection, { nome: novoItem });
      M.toast({ html: 'Item adicionado com sucesso!', classes: 'green' });
      setNovoItem('');
      fetchData(); // Atualiza a lista após adicionar um item
    } catch (error) {
      console.error('Erro ao adicionar item:', error.message);
      M.toast({ html: 'Erro ao adicionar item', classes: 'red' });
    }
  };

  const handleSelecionarItem = (itemId) => {
    navigate(`/multistepform/${itemId}`);
  };

  const handleEditarItem = async (itemId) => {
    setEditandoItem(itemId);
    const novoNome = prompt('Novo nome para o item:');
    if (novoNome) {
      try {
        const itemRef = doc(firestore, 'itens', itemId);
        await updateDoc(itemRef, { nome: novoNome });
        M.toast({ html: 'Item editado com sucesso!', classes: 'blue' });
        setEditandoItem(null);
        fetchData(); // Atualiza a lista após editar um item
      } catch (error) {
        console.error('Erro ao editar item:', error.message);
        M.toast({ html: 'Erro ao editar item', classes: 'red' });
        setEditandoItem(null); // Certifica-se de limpar o estado mesmo em caso de erro
      }
    } else {
      setEditandoItem(null); // Certifica-se de limpar o estado se o usuário cancelar
    }
  };

  const handleExcluirItem = (itemId, itemName) => {
    setModalData({ id: itemId, nome: itemName });
    M.Modal.getInstance(document.getElementById('modal-excluir')).open();
  };

  const confirmarExclusao = async () => {
    try {
      await deleteDoc(doc(firestore, 'itens', modalData.id));
      M.toast({ html: 'Item excluído com sucesso!', classes: 'red' });
      fetchData(); // Atualiza a lista após excluir um item
    } catch (error) {
      console.error('Erro ao excluir item:', error.message);
      M.toast({ html: 'Erro ao excluir item', classes: 'red' });
    } finally {
      setModalData({ id: null, nome: '' });
    }
  };

  return (
    <div className="container" style={{ maxWidth: '70%' }}>
      <h1 className="center-align h1-list">Cadastrar Itens</h1>
      <div className="row">
        <div className="input-field col s8">
          <input
            type="text"
            placeholder="Novo Item"
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
          />
        </div>
        <div className="col s4">
          <button className="waves-effect waves-light btn green" onClick={handleAdicionarItem}>
            Adicionar
          </button>
        </div>
      </div>
      <h1 className="h1-list">Lista de Itens</h1>
      <ul className="collection">
        {items.map((item) => (
          <li className="collection-item" key={item.id}>
            {item.nome}
            <div className="right-align">
              <button
                className="waves-effect waves-light btn-small green"
                onClick={() => handleSelecionarItem(item.id)}
              >
                Selecionar
              </button>
              <span style={{ marginRight: '10px' }}></span>
              <button
                className="waves-effect waves-light btn-small blue"
                onClick={() => handleEditarItem(item.id)}
                disabled={editandoItem === item.id}
              >
                Editar
              </button>
              <span style={{ marginRight: '10px' }}></span>
              <button
                className="waves-effect waves-light btn-small red"
                onClick={() => handleExcluirItem(item.id, item.nome)}
                disabled={editandoItem === item.id}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div id="modal-excluir" className="modal">
        <div className="modal-content">
          <h4>Excluir item</h4>
          <p>Deseja excluir o item "{modalData.nome}"?</p>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">Cancelar</button>
          <button className="modal-close waves-effect waves-red btn-flat" onClick={confirmarExclusao}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemListComponent;
