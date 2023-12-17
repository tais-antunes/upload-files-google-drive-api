import React from 'react';

const OrcamentoDois = ({ handlePrevStep, handleNextStep }) => {
  return (
    <>
      {/* ... Componentes da Etapa 2 ... */}
      <button className="waves-effect waves-light btn green" onClick={handlePrevStep}>
        Etapa Anterior
      </button>
      <button className="waves-effect waves-light btn green" onClick={handleNextStep}>
        Próxima Etapa
      </button>
    </>
  );
};

export default OrcamentoDois;
