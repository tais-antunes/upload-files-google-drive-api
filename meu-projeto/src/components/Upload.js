import React, { useState, useRef } from 'react';
import api from '../api';
import RegrasModal from '../components/Modal';
import Toast from '../components/Toast';

const Upload = ({ onUploadComplete, itemList }) => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isRegrasModalOpen, setIsRegrasModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const selectedFiles = fileInputRef.current.files;
    setFiles(Array.from(selectedFiles));

    if (selectedFiles.length > 0) {
      const fileNames = Array.from(selectedFiles).map((file) => file.name);
      setPreview(fileNames.slice(0, 3));
    } else {
      setPreview([]);
    }
  };

  const handleClearAllFiles = () => {
    setFiles([]);
    setPreview([]);
    fileInputRef.current.value = '';
  };

  const handleExpandAccordion = () => {
    if (preview.length < files.length) {
      setPreview(files.map((file) => file.name));
    } else {
      setPreview(files.map((file) => file.name).slice(0, 3));
    }
  };

  const handleClearFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    const updatedPreview = [...preview];
    updatedPreview.splice(index, 1);
    setPreview(updatedPreview);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }
  
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
  
    try {
      const response = await api.post('/upload', formData);
  
      if (response.status === 200) {
        const itemNames = files.map((file) => file.name);
        console.log('Arquivos enviados com sucesso:', itemNames);
  
        setToastMessage('Seus arquivos foram enviados com sucesso para o Google Drive');
  
        setTimeout(() => {
          setToastMessage('');
        }, 10000);
  
        onUploadComplete(itemNames);
      } else {
        console.error('Falha no envio dos arquivos.');
      }
    } catch (error) {
      console.error('Erro ao enviar os arquivos:', error);
    }
  };

  return (
    <div>
      <Toast message={toastMessage} />
      <div className="upload-container">
        <div className="upload-content" style={{ /*width: '80%',*/ padding: '1rem' }}>
        <h1 className="upload-heading" style={{ fontSize: '30px'}}>Upload de arquivos para o Google Drive</h1>
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                  <label className="waves-effect waves-light btn green" style={{ marginRight: '10px' }}>
                    <i className="material-icons left">cloud_upload</i> Selecione os arquivos
                    <input
                      type="file"
                      id="fileInput"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <div>
                    <button onClick={() => setIsRegrasModalOpen(true)} className="waves-effect waves-light btn green">
                      Instrução Normativa
                    </button>
                  </div>
                </div>
              </div>
              {preview.length > 0 && (
                <div className="card" style={{ marginTop: '10px' }}>
                  <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="card-title" style={{ flex: '1' }}>
                      Arquivos Selecionados
                    </span>
                    <button className="waves-effect waves-light btn green" onClick={handleClearAllFiles}>
                      Limpar Todos
                    </button>
                  </div>
                  <ul className={`collapsible ${preview.length > 3 ? 'expanded' : ''}`}>
                    {preview.map((fileName, index) => (
                      <li key={index}>
                        <div className="collapsible-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ marginRight: '10px' }}>{fileName}</span>
                          <i className="material-icons" style={{ color: '#333', cursor: 'pointer' }} onClick={() => handleClearFile(index)}>
                            delete
                          </i>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <button
                      className="expand-button waves-effect waves-light btn green"
                      onClick={handleExpandAccordion}
                      style={{ margin: '10px' }}
                    >
                      {preview.length > 3 ? 'Ver menos' : 'Ver mais'}
                    </button>
                  </div>
                </div>
              )}
              <button className="waves-effect waves-light btn green" disabled={files.length === 0} onClick={handleUpload}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="upload-container">
        <RegrasModal isOpen={isRegrasModalOpen} onClose={() => setIsRegrasModalOpen(false)} />
      </div>
    </div>
  );
};

export default Upload;
