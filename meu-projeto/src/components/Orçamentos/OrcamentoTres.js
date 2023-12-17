import React from 'react';

const OrcamentoTres = ({ handlePrevStep }) => {
  return (
    <>
      {/* ... Componentes da Etapa 3 ... */}
      <button className="waves-effect waves-light btn green" onClick={handlePrevStep}>
        Etapa Anterior
      </button>
    </>
  );
};

export default OrcamentoTres;
