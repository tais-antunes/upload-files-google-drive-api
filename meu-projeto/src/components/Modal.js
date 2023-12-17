import React, { useEffect } from 'react';
import M from 'materialize-css';

// Inline CSS styles for left-aligning the text
const modalContentStyle = {
  textAlign: 'left',
};

function RegrasModal({ isOpen, onClose }) {
  useEffect(() => {
    // Inicializa a modal ao montar o componente
    const modalElement = document.getElementById('regras-modal');
    M.Modal.init(modalElement, {});

    // Abre a modal se estiver aberta
    if (isOpen) {
      const instance = M.Modal.getInstance(modalElement);
      instance.open();
    }

    // Fecha a modal ao desmontar o componente
    return () => {
      const instance = M.Modal.getInstance(modalElement);
      instance.close();
    };
  }, [isOpen]);

  const handleIrParaInstrucaoNormativa = () => {
    window.open('https://ifrs.edu.br/documentos/instrucao-normativa-proppi-proen-proex-proad-no-01-de-18-de-marco-de-2021/', '_blank');
  };

  return (
    <div id="regras-modal" className="modal">
      <div className="modal-content" style={modalContentStyle}>
        <h5>INSTRUÇÃO NORMATIVA PROPPI/PROEN/PROEX/PROAD Nº 01, DE 18 DE MARÇO DE 2021</h5>
        <p>CAPÍTULO III DA PRESTAÇÃO DE CONTAS</p>
        <p>Art 6º A prestação de contas deverá ser elaborada conforme o Anexo I - “Planilha de prestação de contas - fomento interno para ações de pesquisa, ensino, extensão, indissociáveis e de inovação do IFRS”.</p>
        <p>Parágrafo único. Para cada item ou grupo de itens adquirido, o(a) coordenador(a) da proposta deverá comprovar a compra de acordo com o orçamento global de menor valor, já incluídos todos os custos do fornecedor (fretes, impostos, carga e descarga).</p>
        <p>Art. 7º Todo o material permanente adquirido pelo(a) coordenador(a) da proposta com recursos concedidos pelo fomento interno para ações de pesquisa, ensino, extensão, indissociáveis e de inovação são de propriedade do campus de origem do fomento, devendo, portanto, ser doado no prazo de até 15 (quinze) dias de antecedência ao encerramento do exercício fiscal de recebimento do auxílio, através do “Termo de doação” (Anexo III) no setor competente.</p>
        <p>§1º Até que seja concluída a doação do material permanente adquirido:</p>
        <p>I - o(a) coordenador(a) e o campus de origem do fomento responderão pela manutenção do bem em perfeito estado de conservação e funcionamento;</p>
        <p>II - em caso de roubo, furto ou outro sinistro envolvendo o bem, o(a) coordenador(a) deverá comunicar imediatamente o fato ao campus de origem do fomento, por escrito, juntamente com a descrição do fato ocorrido.</p>
        <p>Art. 8º. O(A) coordenador(a) da ação deverá prestar contas à comissão específica através de documentos fiscais hábeis, entendidos como tal: notas fiscais, cupons fiscais, bilhete de passagem rodoviária e/ou aérea, GRU – Guia de Recolhimento da União, e, ainda, quando necessário, o recolhimento para ente público.</p>
        <p>Art. 8º. O(A) coordenador(a) da ação deverá prestar contas à comissão específica através de documentos fiscais hábeis, entendidos como tal: notas fiscais, cupons fiscais, bilhete de passagem terrestre e/ou aérea, GRU – Guia de Recolhimento da União, e, ainda, quando necessário, o recolhimento para ente público.</p>
        <p>Ministério da Educação Secretaria de Educação Profissional e Tecnológica Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul Pró-Reitoria de Pesquisa, Pós-Graduação e Inovação / Pró-Reitoria de Extensão/ Pró-Reitoria de Ensino/ Pró-Reitoria de Administração 6 Rua Gen. Osório, 348 – Centro – Bento Gonçalves/RS – CEP 95.700-086 Telefone: (54) 3449.3300 – www.ifrs.edu.br – E-mail: proppi@ifrs.edu.br/ proex@ifrs.edu.br/ proen@ifrs.edu.br/ proad@ifrs.edu.br</p>
        <p>Parágrafo único. Os documentos a que se refere o Art. 8°. deverão estar em nome e/ou CPF do(a) coordenador(a) da ação, podendo estar em nome de outro(a) integrante da equipe nos casos de bilhetes de passagens aéreas e hospedagem.</p>
        <p>Parágrafo único. Os documentos a que se refere o Art. 8° deverão estar em nome e/ou CPF do(a) coordenador(a) da ação, podendo estar em nome de outro(a) integrante da equipe nos casos de bilhetes de passagens aéreas/terrestres e hospedagem.</p>
        <p>Art. 9º O(A) coordenador(a) da ação deverá devolver os recursos concedidos e não utilizados ao setor financeiro do campus através de GRU antes da entrega da prestação de contas.</p>
        <p>Art. 10. O parecer da prestação de contas será emitido pela comissão específica estabelecida pelo edital que concedeu o fomento através do formulário de avaliação (Anexo IV).</p>
        <p>Art. 11. O(A) coordenador(a) que não prestar contas, o fizer de forma inadequada ou tiver a prestação de contas reprovada não poderá submeter propostas em quaisquer editais geridos pelo IFRS se as pendências não forem regularizadas e o ressarcimento do valor recebido não for efetuado ao erário através de GRU.</p>
        <p>§ 1º O(A) coordenador(a) da ação cuja prestação de contas não foi aprovada poderá submeter recurso único no prazo de 5 (cinco) dias úteis a contar do recebimento do comunicado de não aprovação da mesma pela comissão específica.</p>
        <p>§ 2º No caso de reprovação da prestação de contas, o(a) coordenador(a) deverá devolver os recursos financeiros através de GRU, no prazo máximo de 15 (quinze) dias, em não havendo o recolhimento no prazo estipulado, o coordenador responderá processo de reposição ao erário.</p>
        {/* (restante do texto) */}
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-light btn green"style={{ margin: '100px' }}
 onClick={handleIrParaInstrucaoNormativa}>
          Ir para Instrução Normativa
        </button>
        <button className="modal-close waves-effect waves-light btn green" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default RegrasModal;
