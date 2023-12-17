// // WizardComponent.jsx
// import React from 'react';
// import OrcamentoUm from '../components/Orçamentos/OrcamentoUm';
// import OrcamentoDois from '../components/Orçamentos/OrcamentoDois';
// import OrcamentoTres from '../components/Orçamentos/OrcamentoTres';

// const WizardComponent = ({ step, handleStepChange, handleNextStep, handlePrevStep, orcamentoData }) => {
//   return (
//     <div className="wizard-container">
//       <div className="step-indicators">
//         <div className={`step-indicator ${step === 1 ? 'active' : ''}`} onClick={() => handleStepChange(1)}>
//           1
//         </div>
//         <div className="connector-line" />
//         <div className={`step-indicator ${step === 2 ? 'active' : ''}`} onClick={() => handleStepChange(2)}>
//           2
//         </div>
//         <div className="connector-line" />
//         <div className={`step-indicator ${step === 3 ? 'active' : ''}`} onClick={() => handleStepChange(3)}>
//           3
//         </div>
//       </div>

//       {/* Renderize os componentes específicos de cada etapa dentro do WizardComponent */}
//       {step === 1 && <OrcamentoUm data={orcamentoData.orcamentoUm} />}
//       {step === 2 && <OrcamentoDois data={orcamentoData.orcamentoDois} />}
//       {step === 3 && <OrcamentoTres data={orcamentoData.orcamentoTres} />}

//       <div>
//         {step !== 1 && <button onClick={handlePrevStep}>Voltar</button>}
//         {step !== 3 && <button onClick={handleNextStep}>Próximo</button>}
//       </div>
//     </div>
//   );
// };

// export default WizardComponent;

