import React from 'react';

const OrcamentoUm = ({ handleNextStep }) => {
  return (
    <>
      {/* ... Componentes da Etapa 1 ... */}
      <button className="waves-effect waves-light btn green" onClick={handleNextStep}>
        Próxima Etapa
      </button>
    </>
  );
};

export default OrcamentoUm;
