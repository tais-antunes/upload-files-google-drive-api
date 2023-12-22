// import React, { useState, useEffect } from 'react';
// import api from '../api';

// const ListaArquivos = () => {
//   const [driveFiles, setDriveFiles] = useState([]);

//   useEffect(() => {
//     const fetchDriveFiles = async () => {
//       try {
//         const response = await api.get('/list');
//         setDriveFiles(response.data.files);
//       } catch (error) {
//         console.error('Erro ao obter a lista de arquivos do Google Drive:', error);

//         if (error.response) {
//           console.error('Status do erro:', error.response.status);
//           console.error('Dados do erro:', error.response.data);
//         } else if (error.request) {
//           console.error('Sem resposta do servidor:', error.request);
//         } else {
//           console.error('Erro durante a configuração da requisição:', error.message);
//         }
//       }
//     };

//     fetchDriveFiles();
//   }, []);

//   return (
//     <div>
//       <h2>Lista de Arquivos no Google Drive:</h2>
//       <ul>
//         {driveFiles.map((file) => (
//           <li key={file.id}>{file.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListaArquivos;
