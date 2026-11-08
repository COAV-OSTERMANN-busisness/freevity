# Frevity -- Relatório de Encerramento da Sprint 1

**Projeto:** Frevity  
**Sprint:** Sprint 1  
**Período planejado:** 29/08/2026 a 30/08/2026  
**Encerramento real:** 05/10/2026  
**Status:** Encerrada com pendências conhecidas  
**Branch de QA:** `freevity/QA`

---

## 1. Resumo Executivo

A Sprint 1 do projeto Frevity teve como objetivo estabelecer a fundação técnica e funcional da aplicação, incluindo arquitetura, interface, internacionalização, domínio de cálculo, integração entre a Calculator e os engines, cálculos de frete e infraestrutura inicial de Quality Assurance.

O período originalmente planejado foi de **29/08/2026 a 30/08/2026**. O encerramento real ocorreu em **05/10/2026**, representando um desvio significativo em relação ao planejamento inicial.

Os principais fatores responsáveis pelo atraso foram:

- reconstrução da arquitetura da aplicação;
- planejamento das fórmulas e regras matemáticas;
- refinamento dos cálculos;
- integração entre interface e engines;
- correção de erros identificados durante desenvolvimento;
- correções identificadas durante QA;
- construção e estabilização da infraestrutura de testes.

Apesar do atraso, o fluxo funcional principal da aplicação encontra-se operacional:

```text
Landing
  |
  v
Freight
  |
  v
Calculator
  |
  v
Calculation
```

Os cálculos de frete rodoviário, aéreo e marítimo foram implementados e validados.

A Sprint também estabeleceu uma base de testes unitários e testes End-to-End.

No encerramento da Sprint existem pendências conhecidas na automação E2E. No último snapshot completo foram executados **24 testes**, dos quais **21 passaram e 3 falharam**.

As falhas restantes estão relacionadas às áreas:

- Input Errors;
- Language;
- Navigation.

Essas ocorrências foram registradas como pendências conhecidas e deverão ser tratadas posteriormente, principalmente durante as atividades de **Validation & Error Handling** e internacionalização da Sprint 2.

---

# 2. Objetivos da Sprint

A Sprint 1 teve como propósito construir a primeira fundação técnica utilizável do Frevity.

Os principais objetivos foram:

- estabelecer a arquitetura da aplicação;
- estabelecer o Design System;
- estruturar a identidade visual;
- criar a infraestrutura inicial de internacionalização;
- criar a camada global de formatação;
- estruturar o domínio de cálculos;
- implementar os engines;
- implementar testes unitários dos cálculos;
- construir a Landing Page;
- implementar comportamento responsivo;
- construir o Application Shell;
- implementar o Calculator Form;
- integrar a Calculator aos engines;
- implementar os cálculos de Freight;
- estabelecer uma base de QA;
- estabelecer testes E2E para os principais fluxos da aplicação.

Os cálculos de **Road, Air e Maritime** faziam parte do planejamento da Sprint 1 e não representam aumento posterior de escopo.

---

# 3. Período da Sprint

## 3.1 Planejamento original

A Sprint foi originalmente planejada para:

**Início:** 29/08/2026  
**Fim planejado:** 30/08/2026

O planejamento estabelecia um timebox de apenas dois dias para uma quantidade significativa de trabalho arquitetural, funcional, matemático e de QA.

## 3.2 Encerramento real

A Sprint foi efetivamente encerrada em:

**05/10/2026**

Durante sua execução tornou-se necessário realizar trabalho adicional de arquitetura, refinamento matemático, integração, correção e validação para que a aplicação atingisse um estado adequado para continuidade.

## 3.3 Desvio do planejamento

O prazo inicialmente definido não refletiu adequadamente a complexidade real do escopo.

Os principais fatores responsáveis pelo desvio foram:

1. reconstrução da arquitetura;
2. planejamento das fórmulas;
3. refinamento das regras de cálculo;
4. integração entre componentes e engines;
5. correções identificadas durante implementação;
6. correções identificadas durante testes;
7. criação da infraestrutura de QA;
8. estabilização progressiva dos testes automatizados.

O desvio observado deverá ser utilizado como referência para melhorar as estimativas das próximas Sprints.

---

# 4. Entregas da Sprint

## 4.1 Fundação do projeto

A Sprint estabeleceu a fundação necessária para continuidade do desenvolvimento do Frevity.

Entre os trabalhos realizados estão:

- Project Initialization;
- Application Architecture;
- Git Workflow;
- Frevity Design System;
- Frevity Brand Assets;
- Internationalization Core;
- Global Formatting Layer;
- Calculation Domain Model;
- Landed Cost Engine;
- Reality Score Engine;
- Unit Tests -- Calculation Engine;
- Landing Page Structure;
- Landing Responsive UI;
- Application Page Shell;
- Calculator Form;
- Calculator <-> Engine Integration;
- evolução da arquitetura do Frevity;
- integração da infraestrutura necessária ao projeto;
- QA.

---

# 5. Arquitetura

A arquitetura da aplicação precisou ser reconstruída e refinada durante a Sprint.

Essa atividade representou uma parcela significativa do atraso, porém foi necessária para permitir que os módulos de cálculo, interface, internacionalização e QA fossem integrados de maneira consistente.

A reconstrução arquitetural teve impacto transversal.

Alterações estruturais afetaram:

- componentes;
- formulários;
- engines;
- integração;
- internacionalização;
- testes.

Um dos principais aprendizados da Sprint é que decisões arquiteturais precisam receber esforço explícito durante o planejamento.

Uma alteração estrutural realizada durante uma Sprint pode produzir custo multiplicativo sobre funcionalidades já implementadas.

---

# 6. Design e Interface

A Sprint estabeleceu a base visual e estrutural da aplicação.

Foram trabalhados:

- Frevity Design System;
- Frevity Brand Assets;
- Landing Page Structure;
- Landing Responsive UI;
- Application Page Shell;
- Calculator Form;
- integração visual da calculadora com o restante da aplicação.

A base E2E passou a incluir testes específicos para Desktop e Mobile, permitindo validar aspectos fundamentais de responsividade.

---

# 7. Internacionalização

A infraestrutura inicial de internacionalização foi estabelecida durante a Sprint.

A aplicação contempla os idiomas:

- English;
- Spanish;
- Portuguese;
- Japanese.

A base também contempla seleção manual de idioma e utilização das mensagens correspondentes pelos componentes da aplicação.

A internacionalização ainda possui trabalho planejado para a Sprint 2, incluindo:

- Internationalization Completion;
- Language Selector;
- estabilização dos comportamentos relacionados ao idioma.

---

# 8. Domínio de Cálculo

Uma parcela significativa do trabalho da Sprint esteve relacionada ao planejamento, modelagem e refinamento das fórmulas.

Foram trabalhados:

- Calculation Domain Model;
- Landed Cost Engine;
- Reality Score Engine;
- Freight Calculation;
- Calculator <-> Engine Integration.

O objetivo não foi apenas fazer a aplicação executar operações matemáticas.

Era necessário garantir duas propriedades diferentes:

$$
\boxed{
\text{Correção do Software}
\neq
\text{Correção da Regra Logística}
}
$$

Uma implementação pode estar tecnicamente correta e ainda utilizar uma fórmula ou regra logística incorreta.

Por esse motivo, as regras matemáticas foram refinadas antes de serem consideradas consolidadas.

---

# 9. Freight Calculation

A calculadora de Freight foi estruturada para suportar três modalidades principais:

1. Road Freight;
2. Air Freight;
3. Maritime Freight.

---

## 9.1 Road Freight

O fluxo de cálculo rodoviário foi implementado e automatizado.

Resultado:

$$
\boxed{
\mathrm{Road} = \frac{4}{4}\ \mathrm{PASS}
}
$$

**Status:** Aprovado.

---

## 9.2 Air Freight

O fluxo de cálculo aéreo foi implementado e automatizado.

Resultado:

$$
\boxed{
\mathrm{Air} = \frac{4}{4}\ \mathrm{PASS}
}
$$

**Status:** Aprovado.

---

## 9.3 Maritime Freight

O cálculo marítimo foi implementado contemplando:

- FCL;
- LCL.

As regras foram refinadas durante a Sprint e posteriormente cobertas pelos testes automatizados.

### 9.3.1 Maritime FCL

Para uma cobrança baseada em quantidade de containers e tarifa unitária, a parcela comercial pode ser representada por:

$$
F_c = N_c \times T_c
$$

onde:

- $F_c$ = frete comercial;
- $N_c$ = número de containers;
- $T_c$ = tarifa por container.

Quando existe um frete mínimo:

$$
F_b = \max(F_c, F_{\min})
$$

onde:

- $F_b$ = frete base;
- $F_{\min}$ = frete mínimo aplicável.

Considerando cobranças adicionais $C_i$, o total pode ser representado por:

$$
\boxed{
F_{\mathrm{total}}
=
F_b
+
\sum_{i=1}^{n} C_i
}
$$

Cobranças flat aplicáveis são consideradas uma única vez de acordo com sua regra de negócio.

---

## 9.3.2 Maritime LCL

O cálculo LCL utiliza o princípio de **Weight/Measure**, ou **W/M**.

### Volume total

Para dimensões de um volume e quantidade $Q$:

$$
V_t = C \times L \times A \times Q
$$

onde:

- $V_t$ = volume total;
- $C$ = comprimento;
- $L$ = largura;
- $A$ = altura;
- $Q$ = quantidade de volumes.

### Peso total em toneladas

Considerando o peso real total $P_r$ em quilogramas:

$$
P_{\mathrm{ton}}
=
\frac{P_r}{1000}
$$

### Quantidade tarifável W/M

A quantidade utilizada para tarifação é o maior valor entre volume total e peso em toneladas:

$$
\boxed{
W/M
=
\max
\left(
V_t,
P_{\mathrm{ton}}
\right)
}
$$

### Frete comercial

Considerando a tarifa W/M representada por $T_{WM}$:

$$
F_c
=
(W/M)
\times
T_{WM}
$$

### Aplicação do mínimo

Quando existe um valor mínimo:

$$
F_b
=
\max
\left(
F_c,
F_{\min}
\right)
$$

### Total

Considerando cobranças adicionais $C_i$:

$$
\boxed{
F_{\mathrm{total}}
=
F_b
+
\sum_{i=1}^{n} C_i
}
$$

Não é aplicado automaticamente um mínimo artificial de $1\,\mathrm{m}^3$ ou $1\,W/M$ quando essa regra não estiver configurada.

---

## 9.4 Resultado Maritime

Após implementação, correções e validação da automação:

$$
\boxed{
\mathrm{Maritime}
=
\frac{4}{4}\ \mathrm{PASS}
}
$$

**Status:** Aprovado.

---

# 10. Resultado Consolidado de Freight

Os três grupos principais apresentaram:

$$
\mathrm{Road} = 4
$$

$$
\mathrm{Air} = 4
$$

$$
\mathrm{Maritime} = 4
$$

Portanto:

$$
T_{\mathrm{Freight}}
=
4 + 4 + 4
=
12
$$

e:

$$
\boxed{
\mathrm{Freight}
=
\frac{12}{12}
=
100\%
}
$$

Os cenários automatizados consolidados de cálculo de Freight estavam aprovados no encerramento da Sprint.

---

# 11. Testes Unitários

A Sprint estabeleceu uma base dedicada de testes unitários para os engines e regras de cálculo.

O objetivo dessa camada é validar o domínio independentemente da interface.

A separação conceitual utilizada é:

$$
\boxed{
\mathrm{Unit}
\rightarrow
\text{Regra de negócio e cálculo}
}
$$

$$
\boxed{
\mathrm{E2E}
\rightarrow
\text{Integração e comportamento da aplicação}
}
$$

Essa separação permite distinguir falhas matemáticas de falhas relacionadas a interface, estado, renderização ou integração.

A criação dessa fundação representa uma das principais entregas estruturais da Sprint 1.

---

# 12. Testes E2E

Foi estabelecida uma estrutura E2E independente dentro do módulo `tests`.

A estrutura contempla:

```text
tests/
└── cypress/
    └── e2e/
        ├── desktop/
        ├── freight/
        │   ├── air/
        │   ├── maritime/
        │   └── road/
        ├── input-errors/
        ├── language/
        ├── mobile/
        ├── navigation/
        └── refresh/
```

A infraestrutura utiliza Cypress em conjunto com especificações BDD.

A execução consolidada é realizada através de:

```text
npm run test:e2e
```

---

# 13. Estado do QA no Encerramento

No último snapshot completo registrado durante a Sprint:

**Total de testes:** 24  
**Passing:** 21  
**Failing:** 3  
**Pending:** 0  
**Skipped:** 0

A taxa de aprovação é:

$$
R_{\mathrm{pass}}
=
\frac{21}{24}
\times
100
$$

$$
\boxed{
R_{\mathrm{pass}}
=
87.5\%
}
$$

Resultado consolidado:

```text
Tests:    24
Passing:  21
Failing:   3
Pending:   0
Skipped:   0
```

As três áreas que apresentaram falhas foram:

- Input Errors;
- Language;
- Navigation.

Essas falhas são conhecidas e fazem parte do estado real da aplicação e da automação no encerramento da Sprint.

---

# 14. Estado das Áreas de QA

## 14.1 Desktop

A base de testes Desktop foi criada.

Os cenários cobrem:

- ausência de overflow horizontal;
- navegação Desktop;
- comportamento da navegação Mobile em viewport Desktop;
- conteúdo principal;
- Footer;
- Calculator Selector;
- Calculator Workspace;
- seleção do Freight Calculator.

A suíte apresentou execução bem-sucedida durante a Sprint.

**Status:** Base implementada.

---

## 14.2 Mobile

A base de testes Mobile foi criada.

Os cenários cobrem:

- ausência de overflow horizontal;
- ocultação da navegação Desktop;
- disponibilidade do controle Mobile;
- conteúdo principal;
- Footer;
- Calculator Selector;
- Calculator Workspace;
- seleção do Freight Calculator.

**Status:** Base implementada e validada durante a Sprint.

---

## 14.3 Formulário

O formulário principal foi validado durante o desenvolvimento.

Não foi criada uma categoria E2E adicional exclusivamente para o formulário porque os fluxos existentes já exercitam sua utilização.

**Status:** Aprovado funcionalmente.

---

## 14.4 Calculation

As três modalidades de Freight possuem cobertura automatizada.

$$
\mathrm{Road} = \frac{4}{4}
$$

$$
\mathrm{Air} = \frac{4}{4}
$$

$$
\mathrm{Maritime} = \frac{4}{4}
$$

Logo:

$$
\boxed{
\mathrm{Calculation}
=
\frac{12}{12}
}
$$

**Status:** Aprovado.

---

## 14.5 Language

A automação de Language foi implementada e apresentou execuções bem-sucedidas durante a Sprint.

Entretanto, no snapshot consolidado final existe uma falha relacionada ao cenário de idioma.

**Status:** Pendência conhecida na execução consolidada.

---

## 14.6 Navigation

A automação de Navigation foi implementada para validar:

```text
Landing -> Calculator
Calculator -> Landing
```

Durante a implementação foram observadas interferências entre Navigation e outras suítes E2E.

Em determinadas execuções, Navigation apresentou sucesso enquanto outra suíte passou a falhar.

A investigação não será prolongada dentro da Sprint 1.

**Status:** Pendência conhecida.

---

## 14.7 Refresh

A base de testes de Refresh foi criada para validar permanência de rota e disponibilidade do conteúdo após atualização.

Os cenários principais são:

```text
/ -> refresh -> /
```

e:

```text
/calculator -> refresh -> /calculator
```

No snapshot registrado:

$$
\boxed{
\mathrm{Refresh}
=
\frac{2}{2}\ \mathrm{PASS}
}
$$

**Status:** Aprovado.

---

## 14.8 Input Errors

A base de testes de Input Errors foi criada para verificar validações do Freight Calculator.

Os cenários incluem:

- campos obrigatórios;
- valores numéricos inválidos;
- prevenção de resultados quando os dados são inválidos.

No snapshot consolidado existe uma falha nessa área.

**Status:** Pendência conhecida.

---

# 15. Fluxo Funcional Principal

Apesar das pendências existentes na automação E2E, o fluxo principal foi validado manualmente como funcional.

```text
localhost
    |
    v
Landing
    |
    v
Freight
    |
    v
Calculator
    |
    v
Calculation
```

Portanto:

$$
\boxed{
\text{Fluxo funcional principal}
=
\text{Operacional}
}
$$

É necessário distinguir o estado funcional da aplicação do estado da automação.

$$
\text{Aplicação funcional}
\not\Rightarrow
\text{Suíte E2E sem falhas}
$$

No encerramento da Sprint:

- o fluxo funcional principal está operacional;
- existem três falhas conhecidas na suíte E2E consolidada.

---

# 16. Sprint Review

A Sprint Review demonstra a entrega de um incremento funcional significativo.

As principais capacidades estabelecidas foram:

- arquitetura base;
- Landing Page;
- responsividade;
- Application Shell;
- Calculator;
- Calculator Form;
- Calculator <-> Engine Integration;
- Road Freight;
- Air Freight;
- Maritime Freight;
- Maritime FCL;
- Maritime LCL;
- Internationalization Core;
- testes unitários;
- infraestrutura E2E;
- fluxo funcional ponta a ponta.

A Sprint não deve, entretanto, ser interpretada como livre de defeitos.

Existem três falhas conhecidas na execução E2E consolidada.

Essas falhas foram registradas e serão tratadas posteriormente.

---

# 17. Definition of Done

Não existia uma **Definition of Done formal** definida para a Sprint 1.

Essa ausência dificultou determinar objetivamente quando cada item poderia ser considerado concluído.

Durante a execução, diferentes critérios foram incorporados progressivamente:

- implementação;
- integração;
- validação manual;
- testes unitários;
- testes E2E;
- QA;
- versionamento.

Isso aumentou a possibilidade de retrabalho e tornou o encerramento de determinados itens menos objetivo.

## 17.1 Proposta inicial para Sprint 2

Uma Definition of Done inicial pode considerar:

```text
Implementação concluída
+
Integração concluída
+
Regras de negócio verificadas
+
Testes aplicáveis implementados
+
Ausência de regressão conhecida provocada pela alteração
+
QA realizado
+
Pendências conhecidas documentadas
+
Código versionado
```

Em forma conceitual:

$$
\boxed{
DoD
=
I
+
G
+
R
+
T
+
Q
+
D
+
V
}
$$

onde:

- $I$ = implementação;
- $G$ = integração;
- $R$ = regras verificadas;
- $T$ = testes;
- $Q$ = QA;
- $D$ = documentação de pendências;
- $V$ = versionamento.

Essa proposta deverá ser refinada durante o planejamento da Sprint 2.

---

# 18. Principais Causas do Atraso

## 18.1 Reconstrução da arquitetura

A arquitetura precisou ser reconstruída durante a execução.

Esse trabalho teve impacto transversal sobre componentes, cálculos, integração e testes.

## 18.2 Planejamento das fórmulas

As fórmulas exigiram análise antes da implementação definitiva.

No contexto do Frevity:

$$
\boxed{
\text{Código correto}
+
\text{Fórmula incorreta}
=
\text{Resultado incorreto}
}
$$

Por isso, o planejamento matemático não poderia ser ignorado apenas para cumprir o prazo inicialmente estimado.

## 18.3 Refinamento dos cálculos

As regras precisaram ser refinadas após sua definição inicial.

Isso ocorreu especialmente nos fluxos de Freight e na integração entre os dados fornecidos pelo usuário e os engines.

## 18.4 Correção de erros

Erros foram identificados durante:

- implementação;
- integração;
- testes manuais;
- testes unitários;
- testes E2E.

Isso gerou ciclos adicionais:

```text
Implementação
    |
    v
Teste
    |
    v
Diagnóstico
    |
    v
Correção
    |
    v
Reteste
```

## 18.5 Subestimação do esforço

O volume de trabalho planejado para dois dias não era compatível com a complexidade real da Sprint.

A Sprint envolvia simultaneamente:

$$
\text{Arquitetura}
+
\text{UI}
+
\text{Domínio}
+
\text{Matemática}
+
\text{Integração}
+
\text{QA}
$$

Esse conjunto não foi adequadamente representado pela estimativa inicial.

---

# 19. Sprint Retrospective

## 19.1 O que funcionou bem

Os seguintes aspectos produziram resultados positivos:

- refinamento das regras antes da consolidação dos cálculos;
- separação dos engines;
- criação de testes unitários;
- criação de testes E2E;
- separação dos testes de Freight por modalidade;
- validação individual de Road, Air e Maritime;
- identificação explícita dos defeitos;
- utilização de QA antes de avançar para refinamentos posteriores;
- estabelecimento de um fluxo funcional ponta a ponta;
- documentação das falhas conhecidas.

## 19.2 O que não funcionou bem

Os principais problemas identificados foram:

- planejamento excessivamente otimista;
- timebox incompatível com o escopo;
- reconstrução arquitetural durante a Sprint;
- ausência de Definition of Done;
- ciclos elevados de correção;
- dificuldade de estabilização de alguns testes E2E;
- interferência entre determinados cenários automatizados;
- estimativas sem reserva adequada para QA e correções.

## 19.3 O que deve ser mantido

Devem ser mantidos:

- testes unitários das regras matemáticas;
- separação dos cálculos por domínio;
- validação E2E dos fluxos críticos;
- execução consolidada da suíte;
- documentação explícita de falhas;
- validação matemática antes da conclusão de uma fórmula;
- separação entre defeitos da aplicação e defeitos da automação.

## 19.4 O que deve mudar

Na Sprint 2:

- utilizar capacidade real como referência;
- reduzir comprometimento quando necessário;
- formalizar Definition of Done;
- reservar esforço para QA;
- reservar esforço para correções;
- não considerar estabilidade apenas por testes isolados;
- tratar regressões de maneira explícita;
- separar refinamento, implementação e validação durante o planejamento.

---

# 20. Pendências Conhecidas

## 20.1 Navigation

Existe uma pendência relacionada à estabilidade do E2E de Navigation.

A suíte demonstrou interferência com outros cenários durante execuções consolidadas.

Essa pendência não invalida o funcionamento manual da navegação principal.

Entretanto, impede considerar sua automação estabilizada.

**Destino:** Sprint 2 / Validation.

---

## 20.2 Language

Existe uma falha conhecida na execução consolidada de Language.

O comportamento deverá ser analisado durante:

- Internationalization Completion;
- Language Selector;
- Validation.

**Destino:** Sprint 2.

---

## 20.3 Input Errors

Existe uma falha conhecida na automação relacionada aos erros de entrada.

Essa ocorrência possui relação direta com o trabalho de Validation & Error Handling.

**Destino:** Sprint 2.

---

# 21. Transferência para Sprint 2

As falhas conhecidas não serão tratadas como uma extensão informal da Sprint 1.

Elas serão consideradas durante a priorização da Sprint 2.

Entre os trabalhos já identificados para a próxima etapa estão:

- UX Refinement;
- Validation & Error Handling;
- Internationalization Completion;
- Language Selector.

As pendências de QA possuem relação direta com essas atividades.

Navigation deverá ser reavaliado durante a estabilização da aplicação e da suíte E2E.

---

# 22. Métricas da Sprint

## 22.1 Período planejado

```text
29/08/2026 -> 30/08/2026
```

Timebox originalmente previsto:

$$
T_{\mathrm{planejado}}
=
2\ \mathrm{dias}
$$

## 22.2 Encerramento

```text
05/10/2026
```

O desvio confirma que a estimativa inicial não representava adequadamente a complexidade do trabalho.

---

## 22.3 Freight E2E

$$
R = 4
$$

$$
A = 4
$$

$$
M = 4
$$

Total:

$$
T_F
=
R + A + M
$$

$$
T_F
=
4 + 4 + 4
$$

$$
\boxed{
T_F = 12
}
$$

Resultado:

$$
\boxed{
\frac{12}{12}
=
100\%
}
$$

---

## 22.4 Snapshot E2E consolidado

Total:

$$
T = 24
$$

Aprovados:

$$
P = 21
$$

Falhas:

$$
F = 3
$$

Verificação:

$$
T = P + F
$$

$$
24 = 21 + 3
$$

Taxa de aprovação:

$$
R
=
\frac{P}{T}
\times
100
$$

$$
R
=
\frac{21}{24}
\times
100
$$

$$
\boxed{
R = 87.5\%
}
$$

---

# 23. Débito Técnico e de QA

A Sprint 1 encerra reconhecendo explicitamente a existência de débito técnico e de QA.

Os principais pontos conhecidos são:

1. estabilização do E2E de Navigation;
2. investigação da falha consolidada de Language;
3. correção da validação representada por Input Errors;
4. conclusão de Validation & Error Handling;
5. conclusão da internacionalização;
6. formalização da Definition of Done;
7. melhoria da previsibilidade das estimativas.

Esses itens não devem ser interpretados como trabalho concluído.

---

# 24. Ações para a Sprint 2

## 24.1 Formalizar Definition of Done

Estabelecer critérios objetivos antes de considerar uma atividade concluída.

## 24.2 Utilizar capacidade real

O planejamento deverá considerar a capacidade demonstrada durante a Sprint 1 em vez de utilizar apenas estimativas ideais.

## 24.3 Incorporar QA ao esforço

QA não deverá ser tratado como atividade posterior à implementação.

O esforço deverá considerar:

$$
\boxed{
E_{\mathrm{total}}
=
E_{\mathrm{dev}}
+
E_{\mathrm{test}}
+
E_{\mathrm{fix}}
+
E_{\mathrm{validation}}
}
$$

onde:

- $E_{\mathrm{dev}}$ = esforço de desenvolvimento;
- $E_{\mathrm{test}}$ = esforço de testes;
- $E_{\mathrm{fix}}$ = esforço de correção;
- $E_{\mathrm{validation}}$ = esforço de validação.

## 24.4 Priorizar Validation

As falhas conhecidas deverão ser consideradas durante Validation & Error Handling.

## 24.5 Estabilizar internacionalização

Language Selector e Internationalization Completion deverão eliminar inconsistências restantes relacionadas ao idioma.

## 24.6 Estabilizar E2E

A suíte deverá evoluir para permitir execução consolidada previsível e independente entre specs.

## 24.7 Respeitar o timebox

As próximas Sprints deverão possuir timebox definido.

Caso trabalho permaneça incompleto ao final:

```text
Sprint termina
      |
      v
Item incompleto
      |
      v
Product Backlog
      |
      v
Reavaliação
      |
      v
Nova priorização
```

O trabalho não deverá simplesmente prolongar indefinidamente a Sprint.

---

# 25. Lições Aprendidas

A Sprint 1 demonstrou que a complexidade de uma aplicação não pode ser estimada apenas pela quantidade aparente de funcionalidades.

Arquitetura, matemática, integração e QA possuem custos próprios.

Para cálculos logísticos, duas dimensões precisam ser verificadas:

$$
C_s
=
\text{correção do software}
$$

e:

$$
C_m
=
\text{correção matemática e logística}
$$

A condição desejada é:

$$
\boxed{
C_{\mathrm{válido}}
=
C_s
\land
C_m
}
$$

Ou seja, o resultado somente pode ser considerado confiável quando a implementação e a regra matemática estão corretas.

A Sprint também demonstrou que:

- automação não elimina a necessidade de diagnóstico;
- um teste isolado não garante estabilidade da suíte;
- regressões precisam ser avaliadas no contexto consolidado;
- arquitetura inadequada gera custos posteriores;
- QA precisa fazer parte do planejamento;
- Definition of Done reduz ambiguidade;
- timeboxes precisam refletir capacidade real;
- pendências conhecidas devem permanecer visíveis.

---

# 26. Decisão de Encerramento

A Sprint 1 é formalmente encerrada em:

**05/10/2026**

O encerramento não significa ausência de defeitos.

Ele representa que o incremento principal planejado foi construído, que o fluxo funcional central está operacional e que as pendências restantes foram identificadas e documentadas.

Estado geral:

```text
Arquitetura base              CONCLUÍDA
Landing                       CONCLUÍDA
Responsividade base           CONCLUÍDA
Application Shell             CONCLUÍDA
Calculator Form               CONCLUÍDA
Calculator <-> Engine         CONCLUÍDA
Road Freight                  APROVADO
Air Freight                   APROVADO
Maritime Freight              APROVADO
Unit Test Foundation          CONCLUÍDA
E2E Foundation                CONCLUÍDA
Refresh E2E                   APROVADO
Navigation E2E                PENDÊNCIA
Language E2E                  PENDÊNCIA CONSOLIDADA
Input Errors E2E              PENDÊNCIA
```

Resultado Freight:

$$
\boxed{
\mathrm{Freight}
=
\frac{12}{12}
=
100\%
}
$$

Snapshot E2E:

$$
\boxed{
\mathrm{E2E}
=
\frac{21}{24}
=
87.5\%
}
$$

Fluxo principal:

```text
Landing
  |
  v
Freight
  |
  v
Calculator
  |
  v
Calculation
```

**Estado funcional do fluxo principal:** Operacional.

---

# 27. Conclusão

A Sprint 1 ultrapassou significativamente o prazo inicialmente planejado, porém estabeleceu a fundação técnica e funcional do Frevity.

O principal aprendizado não é simplesmente que a Sprint atrasou.

O planejamento inicial subestimou o custo combinado de:

$$
\boxed{
\text{Arquitetura}
+
\text{Matemática}
+
\text{Implementação}
+
\text{Integração}
+
\text{QA}
+
\text{Correções}
}
$$

A Sprint termina com:

- aplicação funcional;
- fluxo principal operacional;
- engines de Freight implementados;
- Road Freight validado;
- Air Freight validado;
- Maritime Freight validado;
- base de testes unitários estabelecida;
- base E2E estabelecida;
- falhas restantes identificadas;
- débito técnico e de QA documentado;
- informações suficientes para melhorar o planejamento da Sprint 2.

A Sprint 2 deverá partir dessa fundação com:

1. planejamento baseado na capacidade observada;
2. Definition of Done formal;
3. QA incorporado às estimativas;
4. Validation & Error Handling priorizado;
5. estabilização da internacionalização;
6. estabilização dos testes E2E;
7. respeito ao timebox definido.

---

**Sprint:** Sprint 1  
**Status:** Encerrada  
**Data de encerramento:** 05/10/2026  
**Fluxo principal:** Operacional  
**Freight E2E:** 12/12 aprovado  
**E2E consolidado:** 21/24 aprovado  
**Pendências conhecidas:** 3  
**Próxima etapa:** Planejamento e execução da Sprint 2