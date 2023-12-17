import React from 'react';

const WizardBotoes = ({ step, handlePrevStep, handleNextStep }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {step !== 1 && <button onClick={handlePrevStep}>Voltar</button>}
      {step !== 3 && <button onClick={handleNextStep}>Próximo</button>}
    </div>
  );
};

export default WizardBotoes;
