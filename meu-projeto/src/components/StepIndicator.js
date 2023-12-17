import React from 'react';
import './StepIndicator.css';
import 'materialize-css/dist/css/materialize.min.css';

const StepIndicator = ({ currentStep }) => {
  const handleStepClick = (step) => {
    // Adapte essa lógica conforme necessário
    console.log(`Step ${step} clicked!`);

    // Redireciona apenas para as etapas de orçamento
    if (step === 1 || step === 2 || step === 3) {
      window.location.href = `/orcamento-${step}`;
    }
    // Adicione mais condições conforme necessário para outras etapas

    // Mantém a ação padrão ou adiciona lógica específica para outras etapas
  };

  return (
    <div className="step-indicator-container">
      <div className="step-indicator">
        <div
          className={`step-label ${currentStep === 1 ? 'active' : ''} ${
            currentStep >= 1 ? 'visible' : ''
          }`}
          onClick={() => handleStepClick(1)}
        >
          1
        </div>
        <div className="step-description">Orçamento 1</div>
      </div>
      <div className={`connector-line ${currentStep >= 2 ? 'active' : ''}`} />
      <div className="step-indicator">
        <div
          className={`step-label ${currentStep === 2 ? 'active' : ''} ${
            currentStep >= 2 ? 'visible' : ''
          }`}
          onClick={() => handleStepClick(2)}
        >
          2
        </div>
        <div className="step-description">Orçamento 2</div>
      </div>
      <div className={`connector-line ${currentStep === 3 ? 'active' : ''}`} />
      <div className="step-indicator">
        <div
          className={`step-label ${currentStep === 3 ? 'active' : ''} ${
            currentStep >= 3 ? 'visible' : ''
          }`}
          onClick={() => handleStepClick(3)}
        >
          3
        </div>
        <div className="step-description">Orçamento 3</div>
      </div>
      <div className={`connector-line ${currentStep === 4 ? 'active' : ''}`} />
      <div className="step-indicator">
        <div
          className={`step-label ${currentStep === 4 ? 'active' : ''} ${
            currentStep >= 4 ? 'visible' : ''
          }`}
          onClick={() => handleStepClick(4)}
        >
          4
        </div>
        <div className="step-description">Nota Fiscal</div>
      </div>
    </div>
  );
};

export default StepIndicator;
