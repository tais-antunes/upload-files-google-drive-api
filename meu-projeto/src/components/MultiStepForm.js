import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import Upload from './Upload';
import 'materialize-css/dist/css/materialize.min.css';
import './MultiStepForm.css';
import Breadcrumb from './BreadCrumb';
import { v4 as generateUniqueId } from 'uuid';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import api from '../api';
import axios from 'axios';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [indicatorColor, setIndicatorColor] = useState('green');
  const [itemList, setItemList] = useState(() => {
    const storedItemList = localStorage.getItem('itemList');
    return storedItemList ? JSON.parse(storedItemList) : [];
  });

  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }, [itemList]);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    setIndicatorColor('green');
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    setIndicatorColor('green');
  };

  const handleUploadComplete = async (items) => {
    try {
      const itensEnviadosCollection = collection(firestore, 'itensEnviados');
      const itemPromises = items.map(async (itemName) => {
        const fileId = generateUniqueId();
        await addDoc(itensEnviadosCollection, { nome: itemName, fileId: fileId });
        console.log('Detalhes do arquivo recebido:', { id: fileId, nome: itemName });
      });

      await Promise.all(itemPromises);
      const uploadedFiles = items.map((itemName) => ({ id: generateUniqueId(), name: itemName }));
      setItemList((prevItemList) => [...prevItemList, ...uploadedFiles]);
    } catch (error) {
      console.error('Erro ao adicionar itens ao Firestore:', error.message);
    }
  };

  const handleDeleteItem = async (googleDriveId) => {
    try {
      console.log('Tentando excluir o arquivo com ID do Google Drive:', googleDriveId);

      const response = await axios.delete(`http://localhost:4000/api/delete-google-drive-file?fileId=${googleDriveId}`);

      if (response.status === 200) {
        console.log(`Arquivo com ID do Google Drive '${googleDriveId}' excluído com sucesso.`);
        const updatedItemList = itemList.filter((item) => item.id !== googleDriveId);
        setItemList(updatedItemList);
      } else {
        console.error('Falha ao excluir arquivo. Status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao chamar o endpoint de exclusão:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsEnviadosCollection = collection(firestore, 'itensEnviados');
        const snapshot = await getDocs(itemsEnviadosCollection);
        const itemList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItemList(itemList);
      } catch (error) {
        console.error('Erro ao obter dados do Firestore:', error.message);
      }
    };

    fetchData();
  }, []);

  const breadcrumbPath = [
    { name: 'Home', route: '/' },
    { name: 'Lista de Itens' },
    { name: 'Upload De arquivos', route: '/multi-step-form' },
  ];

  return (
    <div className="wizard-container center-align" style={{ width: '80%', margin: 'auto' }}>
      <Breadcrumb path={breadcrumbPath} />

      <StepIndicator currentStep={currentStep} color={indicatorColor} />

      <div className="step-content">
        <Upload onUploadComplete={handleUploadComplete} itemList={itemList} />
      </div>

      {/* Adicionar lógica para renderizar outros componentes ou seções com base no currentStep */}
      {currentStep === 1 && (
        <div className="step-content">
          {/* Adicione aqui o conteúdo específico do Step 1 */}
        </div>
      )}
      {currentStep === 2 && (
        <div className="step-content">
          {/* Adicione aqui o conteúdo específico do Step 2 */}
        </div>
      )}
      {/* ... Adicionar lógica para outros steps */}

      {/* Seção de itens enviados */}
      {/* <div className="item-list-container">
        <h1 className="upload-heading" style={{ fontSize: '30px' }}>Itens Enviados</h1>
        <div className="card">
          <div className="">
            {itemList.map((item, index) => (
              <div className="col" key={index}>
                <div className="card-content" style={{ display: 'flex' }}>
                  <span className="card-title">{item.name}</span>
                  <p>ID: {item.id}</p>
                  <button
                    className="waves-effect waves-light btn red"
                    style={{ display: 'flex' }}
                    onClick={() => handleDeleteItem(item.id, item.name, item.firebaseId)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MultiStepForm;
