import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

const Paginacao= ({ currentStep, setCurrentStep }) => {
  // Define o total de etapas
  const totalSteps = 3;

  // Função para avançar para a próxima etapa
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Função para voltar para a etapa anterior
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Cria um array com o número de etapas para renderizar a paginação
  const steps = [];
  for (let i = 1; i <= totalSteps; i++) {
    steps.push(
      <li key={i} className={currentStep === i ? 'active' : 'waves-effect'}>
        <a onClick={() => setCurrentStep(i)}>{i}</a>
      </li>
    );
  }

  // Inicializa o componente de paginação do Materialize ao montar o componente
  React.useEffect(() => {
    const elems = document.querySelectorAll('.pagination');
    M.Pagination.init(elems, {
      onSelect: (selectedStep) => setCurrentStep(selectedStep),
    });
  }, [setCurrentStep]);

  return (
    <ul className="pagination">
      {steps}
      <li className="waves-effect">
        <a onClick={handlePrevStep}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      <li className="waves-effect">
        <a onClick={handleNextStep}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
};

export default Paginacao;
