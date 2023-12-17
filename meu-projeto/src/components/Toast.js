import React, { useEffect } from 'react';
import M from 'materialize-css';
import '../components/Toast.css'; // Importe o estilo do Toast


function Toast({ message }) {
  useEffect(() => {
    if (message) {
      M.toast({
        html: `<div class="toast-content"><h6>Arquivos enviados com sucesso</h6><p>${message}</p></div>`,
        classes: 'green-toast', // Adicione uma classe para personalizar o estilo
        displayLength: 10000, // 10 segundos
      });
    }
  }, [message]);

  return null; // O componente não renderiza nada diretamente na tela
}

export default Toast;

