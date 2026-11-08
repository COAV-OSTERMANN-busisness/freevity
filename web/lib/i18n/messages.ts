export const messages = {
  en: {
    common: {
      header: {
        home: "Home",
        calculator: "Calculator",
        language: "Language",
        mobileMenu: "Open navigation menu",
      },

      footer: {
        home: "Home",
        calculator: "Calculator",
        copyright: "© 2026 freevity. All rights reserved.",
        navigationTitle: "Navigation",
        socialTitle: "Follow us on social media",
      },
    },

    notFound: {
      code: "404",
      title: "Page not found",
      description: "Sorry, we couldn't find the page you're looking for.",
      backToHome: "← Back to home",
      imageAlt: "Desert landscape with sand dunes under a bright sky.",
    },

    landing: {
      hero: {
        badge: "Precise. Fast. Reliable.",
        imageAlt:
          "Cargo containers at a shipping port, representing logistics and freight.",
        title: "Simulate your cargo transport cost.",
        description:
          "Calculate your landed cost with a clear and consistent freight calculation workflow.",
        cta: "Calculate Landed Cost",
        summary: {
          title: "Landed Cost Summary",
          freight: "Freight",
          insurance: "Insurance",
          customs: "Customs",
          handling: "Handling",
          total: "Total",
          freightValue: "$1,200.00",
          insuranceValue: "$180.00",
          customsValue: "$350.00",
          handlingValue: "$90.00",
          totalValue: "$1,820.00",
        },
      },

      howItWorks: {
        title: "How freevity works",
        description:
          "Simulate your transportation costs in a few simple steps.",
        steps: {
          one: {
            title: "Enter your shipment",
            description:
              "Provide the origin, destination, cargo and transport details.",
          },
          two: {
            title: "Add your costs",
            description:
              "Include freight, insurance, customs, handling and other applicable costs.",
          },
          three: {
            title: "Simulate your transport cost",
            description:
              "freevity combines the information provided and presents a clear cost estimate.",
          },
        },
        result: {
          title: "A clear estimate for your decision",
          description:
            "Use the freevity simulation to get a better view of your transportation and logistics costs.",
        },
      },

      features: {
        title: "Built for clearer freight decisions",
        description:
          "freevity brings the key logistics information together in one clear workflow.",
        items: {
          one: {
            title: "Freight calculation",
            description:
              "Calculate freight costs using the shipment information you provide.",
          },
          two: {
            title: "Clear cost breakdown",
            description:
              "View freight, insurance, customs, handling and other applicable costs separately.",
          },
          three: {
            title: "Multi-market support",
            description:
              "Work with supported national markets and international shipments.",
          },
          four: {
            title: "Logistics insight",
            description:
              "Understand logistics costs in relation to the declared cargo value.",
          },
          five: {
            title: "Reality Score",
            description:
              "Use a planning indicator to understand the completeness of the available shipment information.",
          },
          six: {
            title: "Flexible shipment inputs",
            description:
              "Provide cargo, transport and cost information according to your shipment.",
          },
        },
      },

      globalCoverage: {
        title: "Simulate freight costs across supported markets",
        description:
          "freevity helps you estimate transportation costs for supported national markets and international shipments.",
        markets: {
          brazil: {
            title: "Brazil",
            description:
              "Simulate domestic transportation costs using Brazilian real (BRL).",
          },
          unitedStates: {
            title: "United States",
            description:
              "Simulate domestic transportation costs using US dollars (USD).",
          },
          euroMarkets: {
            title: "Euro Markets",
            description:
              "Simulate domestic transportation costs in supported euro markets (EUR).",
          },
          japan: {
            title: "Japan",
            description:
              "Simulate domestic transportation costs using Japanese yen (JPY).",
          },
        },
        note: "International shipments are presented in USD in the MVP. Coverage depends on the supported markets configured by freevity.",
      },

      faq: {
        title: "Frequently asked questions",
        description: "Learn what freevity is and how the simulator works.",
        items: {
          one: {
            question: "Is freevity a transportation company?",
            answer:
              "No. freevity is a logistics cost simulator. It does not transport, book or operate shipments. freevity helps you estimate transportation and logistics costs so you can better understand a shipment scenario.",
          },
          two: {
            question: "Is freevity free?",
            answer:
              "Yes. freevity is 100% free to use for freight and logistics cost simulation.",
          },
          three: {
            question: "Who is freevity for?",
            answer:
              "freevity is useful for industry, transportation companies, logistics and supply chain professionals, purchasing teams, logistics students and other users who need a clearer view of transportation costs.",
          },
          four: {
            question: "What does freevity simulate?",
            answer:
              "freevity simulates transportation and logistics costs based on the shipment information you provide, helping you estimate the overall cost of a scenario.",
          },
          five: {
            question: "Is the freevity result a final quotation?",
            answer:
              "No. freevity provides an estimate for planning and analysis. The result is not a carrier quotation, booking confirmation or official customs calculation.",
          },
        },
      },
      cta: {
        title: "Ready to simulate your transportation costs?",
        description:
          "Use freevity to estimate freight and logistics costs for your shipment scenario before making transportation decisions.",
        button: "Start Freight Simulation",
        imageAlt:
          "Cargo containers and cranes at a shipping port, representing freight cost simulation and logistics.",
      },
    },
    calculator: {
      advertising: {
        label: "Advertisement",
      },
      freight: {
        title: "Freight calculator",
        description:
          "Estimate freight based on shipment characteristics and the applicable tariff.",
        fields: {
          origin: "Origin",
          destination: "Destination",
          mode: "Transport mode",
          quantity: "Quantity",
          weight: "Weight",
          length: "Length",
          width: "Width",
          height: "Height",
          tariffBasis: "Tariff basis",
          tariffRate: "Tariff rate",
          maritimeType: "Maritime shipment type",
          containerQuantity: "Container quantity",
          volumetricDivisor: "Volumetric divisor",
          minimumCharge: "Minimum freight (optional)",
          tariffEstimate:
            "Estimated reference tariff. Replace it with your carrier's tariff when available.",
        },
        modes: {
          road: "Road",
          air: "Air",
          maritime: "Maritime",
        },
        maritimeTypes: {
          fcl: "FCL — Full Container Load",
          lcl: "LCL — Less than Container Load",
        },
        tariffBasis: {
          weight: "Weight",
          volume: "Volume",
          chargeableWeight: "Chargeable weight",
          maritimeWeightMeasurement: "Weight or measurement (W/M)",
          unit: "Unit",
          flat: "Flat rate",
        },
        additional: {
          fieldLabel: "Additional charge",
          placeholder: "e.g. Toll",
          add: "Add field",
          value: "Value",
          remove: "Remove",
        },
        submit: "Calculate freight",
        feedback: {
          loading: "Calculating your freight...",
          loadingDescription: "Please wait while we process your request.",
          success: "Freight calculation completed.",
          error:
            "We couldn't calculate the freight for this request. Check the addresses and whether the selected transport mode supports the route. If the details are correct, please try again later.",
          // retry: "Try again",
        },
        result: {
          title: "Freight Calculation Result",
          description:
            "Review the estimated freight and shipment calculation details.",
          totalLabel: "Estimated freight",
          breakdown: {
            baseFreight: "Base freight",
          },
          metrics: {
            actualWeight: "Actual weight",
            volumetricWeight: "Volumetric weight",
            chargeableWeight: "Chargeable weight",
            volume: "Volume",
            transportMode: "Transport mode",
            operation: "Operation",
          },
          modes: {
            road: "Road",
            air: "Air",
            maritime: "Maritime",
          },
          scope: {
            national: "National",
            international: "International",
          },
        },
      },
      form: {
        title: "Logistics Cost Simulator",
        description:
          "Enter your shipment information to estimate transportation and logistics costs.",
        origin: "Origin",
        destination: "Destination",
        transportMode: "Transport mode",
        road: "Road",
        air: "Air",
        maritime: "Maritime",
        quantity: "Quantity",
        weight: "Weight",
        cargoValue: "Declared cargo value",
        freight: "Freight",
        insurance: "Insurance",
        customs: "Customs",
        handling: "Handling",
        localTransport: "Local transport",
        otherCosts: "Other costs",
        weightUnitKg: "kg",
        weightUnitG: "g",
        weightUnitLb: "lb",
        submit: "Simulate logistics costs",
      },
      result: {
        title: "Calculation Result",
        description: "Review the estimated transportation and logistics costs.",
        totalLabel: "Total landed cost",
        breakdown: {
          cargo: "Cargo",
          freight: "Freight",
          insurance: "Insurance",
          customs: "Customs",
          handling: "Handling",
          localTransport: "Local transport",
          otherCosts: "Other costs",
        },
        metrics: {
          costPerKg: "Cost per kg",
          costPerUnit: "Cost per unit",
          logisticsPercentage: "Logistics percentage",
        },
        realityScore: {
          label: "Reality Score",
          low: "Low",
          medium: "Medium",
          high: "High",
        },
      },
    },
  },

  es: {
    common: {
      header: {
        home: "Inicio",
        calculator: "Calculadora",
        language: "Idioma",
        mobileMenu: "Abrir menú de navegación",
      },

      footer: {
        home: "Inicio",
        calculator: "Calculadora",
        copyright: "© 2026 freevity. Todos los derechos reservados.",
        navigationTitle: "Navegación",
        socialTitle: "Síguenos en nuestras redes sociales",
      },
    },

    notFound: {
      code: "404",
      title: "Página no encontrada",
      description:
        "Lo sentimos, no pudimos encontrar la página que estás buscando.",
      backToHome: "← Volver al inicio",
      imageAlt: "Paisaje desértico con dunas de arena bajo un cielo luminoso.",
    },

    landing: {
      hero: {
        badge: "Preciso. Rápido. Confiable.",
        imageAlt:
          "Contenedores de carga en un puerto marítimo, representando logística y flete.",
        title: "Simula el costo de transporte de tu carga.",
        description:
          "Calcula tu costo puesto en destino con un flujo de cálculo de flete claro y consistente.",
        cta: "Calcular Costo Puesto en Destino",
        summary: {
          title: "Resumen del Costo Puesto en Destino",
          freight: "Flete",
          insurance: "Seguro",
          customs: "Aduanas",
          handling: "Manipulación",
          total: "Total",
          freightValue: "€1,200.00",
          insuranceValue: "€180.00",
          customsValue: "€350.00",
          handlingValue: "€90.00",
          totalValue: "€1,820.00",
        },
      },

      howItWorks: {
        title: "Cómo funciona freevity",
        description: "Simula tus costos de transporte en unos simples pasos.",
        steps: {
          one: {
            title: "Ingresa tu envío",
            description:
              "Proporciona el origen, destino, carga y detalles del transporte.",
          },
          two: {
            title: "Añade tus costos",
            description:
              "Incluye flete, seguro, aduanas, manipulación y otros costos aplicables.",
          },
          three: {
            title: "Simula tu costo de transporte",
            description:
              "freevity combina la información proporcionada y presenta una estimación clara de los costos.",
          },
        },
        result: {
          title: "Una estimación clara para tu decisión",
          description:
            "Usa la simulación de freevity para comprender mejor tus costos de transporte y logística.",
        },
      },

      features: {
        title: "Diseñado para decisiones de flete más claras",
        description:
          "freevity reúne la información logística clave en un flujo claro.",
        items: {
          one: {
            title: "Cálculo de flete",
            description:
              "Calcula los costos de flete utilizando la información del envío que proporcionas.",
          },
          two: {
            title: "Desglose claro de costos",
            description:
              "Consulta por separado el flete, seguro, aduanas, manipulación y otros costos aplicables.",
          },
          three: {
            title: "Soporte para múltiples mercados",
            description:
              "Trabaja con mercados nacionales compatibles y envíos internacionales.",
          },
          four: {
            title: "Visión de los costos logísticos",
            description:
              "Comprende los costos logísticos en relación con el valor declarado de la carga.",
          },
          five: {
            title: "Reality Score",
            description:
              "Utiliza un indicador de planificación para comprender la integridad de la información disponible del envío.",
          },
          six: {
            title: "Datos de envío flexibles",
            description:
              "Proporciona información de carga, transporte y costos según tu envío.",
          },
        },
      },
      globalCoverage: {
        title: "Simula costos de flete en mercados compatibles",
        description:
          "freevity te ayuda a estimar los costos de transporte en mercados nacionales compatibles y envíos internacionales.",
        markets: {
          brazil: {
            title: "Brasil",
            description:
              "Simula los costos de transporte nacional utilizando reales brasileños (BRL).",
          },
          unitedStates: {
            title: "Estados Unidos",
            description:
              "Simula los costos de transporte nacional utilizando dólares estadounidenses (USD).",
          },
          euroMarkets: {
            title: "Mercados en euros",
            description:
              "Simula los costos de transporte nacional en mercados compatibles con euro (EUR).",
          },
          japan: {
            title: "Japón",
            description:
              "Simula los costos de transporte nacional utilizando yenes japoneses (JPY).",
          },
        },
        note: "Los envíos internacionales se presentan en USD en el MVP. La cobertura depende de los mercados compatibles configurados por freevity.",
      },

      faq: {
        title: "Preguntas frecuentes",
        description: "Conoce qué es freevity y cómo funciona el simulador.",
        items: {
          one: {
            question: "¿freevity es una empresa de transporte?",
            answer:
              "No. freevity es un simulador de costos logísticos. No transporta, reserva ni opera envíos. freevity te ayuda a estimar los costos de transporte y logística para comprender mejor un escenario de envío.",
          },
          two: {
            question: "¿freevity es gratuito?",
            answer:
              "Sí. freevity es 100% gratuito para simular costos de flete y logística.",
          },
          three: {
            question: "¿Para quién está indicado freevity?",
            answer:
              "freevity es útil para la industria, empresas de transporte, profesionales de logística y cadena de suministro, equipos de compras, estudiantes de logística y otros usuarios que necesitan una visión más clara de los costos de transporte.",
          },
          four: {
            question: "¿Qué simula freevity?",
            answer:
              "freevity simula costos de transporte y logística a partir de la información del envío que proporcionas, ayudándote a estimar el costo general de un escenario.",
          },
          five: {
            question: "¿El resultado de freevity es una cotización final?",
            answer:
              "No. freevity proporciona una estimación para planificación y análisis. El resultado no es una cotización de un transportista, una confirmación de reserva ni un cálculo aduanero oficial.",
          },
        },
      },

      cta: {
        title: "¿Listo para simular tus costos de transporte?",
        description:
          "Usa freevity para estimar los costos de flete y logística de tu escenario de envío antes de tomar decisiones de transporte.",
        button: "Iniciar Simulación de Flete",
        imageAlt:
          "Contenedores de carga y grúas en un puerto, representando la simulación de costos de flete y logística.",
      },
    },
    calculator: {
      advertising: {
        label: "Publicidad",
      },
      freight: {
        title: "Calcular flete",
        description:
          "Estime el flete según las características de la carga y la tarifa aplicable.",
        fields: {
          origin: "Origen",
          destination: "Destino",
          mode: "Modo de transporte",
          quantity: "Cantidad",
          weight: "Peso",
          length: "Longitud",
          width: "Ancho",
          height: "Altura",
          tariffBasis: "Base tarifaria",
          tariffRate: "Tarifa",
          maritimeType: "Tipo de envío marítimo",
          containerQuantity: "Cantidad de contenedores",
          volumetricDivisor: "Divisor volumétrico",
          minimumCharge: "Flete mínimo (opcional)",
          tariffEstimate:
            "Tarifa de referencia estimada. Sustitúyela por la tarifa de tu transportista cuando esté disponible.",
        },
        modes: {
          road: "Carretera",
          air: "Aéreo",
          maritime: "Marítimo",
        },
        maritimeTypes: {
          fcl: "FCL — Contenedor completo",
          lcl: "LCL — Carga consolidada",
        },
        tariffBasis: {
          weight: "Peso",
          volume: "Volumen",
          chargeableWeight: "Peso facturable",
          maritimeWeightMeasurement: "Peso o medida (W/M)",
          unit: "Unidad",
          flat: "Tarifa fija",
        },
        additional: {
          fieldLabel: "Cargo adicional",
          placeholder: "Ej.: Peaje",
          add: "Agregar campo",
          value: "Valor",
          remove: "Eliminar",
        },
        submit: "Calcular flete",
        feedback: {
          loading: "Calculando tu flete...",
          loadingDescription: "Espera mientras procesamos tu solicitud.",
          success: "Cálculo de flete completado.",
          error:
            "No fue posible calcular el flete para esta solicitud. Verifica las direcciones y si el modo de transporte seleccionado permite realizar la ruta. Si los datos son correctos, inténtalo de nuevo más tarde.",
          // retry: "Intentar de nuevo",
        },
        result: {
          title: "Resultado del Cálculo de Flete",
          description:
            "Revise el flete estimado y los detalles del cálculo de la carga.",
          totalLabel: "Flete estimado",
          breakdown: {
            baseFreight: "Flete base",
          },
          metrics: {
            actualWeight: "Peso real",
            volumetricWeight: "Peso volumétrico",
            chargeableWeight: "Peso facturable",
            volume: "Volumen",
            transportMode: "Modo de transporte",
            operation: "Operación",
          },
          modes: {
            road: "Carretera",
            air: "Aéreo",
            maritime: "Marítimo",
          },
          scope: {
            national: "Nacional",
            international: "Internacional",
          },
        },
      },
      form: {
        title: "Simulador de Costos Logísticos",
        description:
          "Ingresa la información de tu envío para estimar los costos de transporte y logística.",
        origin: "Origen",
        destination: "Destino",
        transportMode: "Modal de transporte",
        road: "Carretera",
        air: "Aéreo",
        maritime: "Marítimo",
        quantity: "Cantidad",
        weight: "Peso",
        cargoValue: "Valor declarado de la carga",
        freight: "Flete",
        insurance: "Seguro",
        customs: "Aduanas",
        handling: "Manipulación",
        localTransport: "Transporte local",
        otherCosts: "Otros costos",
        weightUnitKg: "kg",
        weightUnitG: "g",
        weightUnitLb: "lb",
        submit: "Simular costos logísticos",
      },
      result: {
        title: "Resultado del cálculo",
        description: "Revisa los costos estimados de transporte y logística.",
        totalLabel: "Costo total aterrizado",
        breakdown: {
          cargo: "Carga",
          freight: "Flete",
          insurance: "Seguro",
          customs: "Aduanas",
          handling: "Manipulación",
          localTransport: "Transporte local",
          otherCosts: "Otros costos",
        },
        metrics: {
          costPerKg: "Costo por kg",
          costPerUnit: "Costo por unidad",
          logisticsPercentage: "Porcentaje logístico",
        },
        realityScore: {
          label: "Reality Score",
          low: "Bajo",
          medium: "Medio",
          high: "Alto",
        },
      },
    },
  },

  pt: {
    common: {
      header: {
        home: "Início",
        calculator: "Calculadora",
        language: "Idioma",
        mobileMenu: "Abrir menu de navegação",
      },

      footer: {
        home: "Início",
        calculator: "Calculadora",
        copyright: "© 2026 freevity. Todos os direitos reservados.",
        navigationTitle: "Navegação",
        socialTitle: "Siga-nos em nossas redes sociais",
      },
    },

    notFound: {
      code: "404",
      title: "Página não encontrada",
      description:
        "Desculpe, não conseguimos encontrar a página que você está procurando.",
      backToHome: "← Voltar para o início",
      imageAlt: "Paisagem desértica com dunas de areia sob um céu iluminado.",
    },

    landing: {
      hero: {
        badge: "Preciso. Rápido. Confiável.",
        imageAlt:
          "Contêineres de carga em um porto, representando logística e frete.",
        title: "Simule o custo de transporte da sua carga.",
        description:
          "Calcule seu frete com um fluxo de cálculo claro e consistente.",
        cta: "Calcular Frete",
        summary: {
          title: "Resumo do Cálculo de Frete",
          freight: "Frete",
          insurance: "Seguro",
          customs: "Alfândega",
          handling: "Manuseio",
          total: "Total",
          freightValue: "R$ 1.200,00",
          insuranceValue: "R$ 180,00",
          customsValue: "R$ 350,00",
          handlingValue: "R$ 90,00",
          totalValue: "R$ 1.820,00",
        },
      },

      howItWorks: {
        title: "Como o freevity funciona",
        description:
          "Simule seus custos de transporte em poucos passos simples.",
        steps: {
          one: {
            title: "Informe sua remessa",
            description:
              "Informe origem, destino, carga e detalhes do transporte.",
          },
          two: {
            title: "Adicione seus custos",
            description:
              "Inclua frete, seguro, alfândega, manuseio e outros custos aplicáveis.",
          },
          three: {
            title: "Simule seu custo de transporte",
            description:
              "O freevity combina as informações fornecidas e apresenta uma estimativa clara dos custos.",
          },
        },
        result: {
          title: "Uma estimativa clara para sua decisão",
          description:
            "Use a simulação do freevity para ter uma visão melhor dos seus custos de transporte e logística.",
        },
      },
      features: {
        title: "Feito para decisões de frete mais claras",
        description:
          "O freevity reúne as principais informações logísticas em um fluxo claro.",
        items: {
          one: {
            title: "Cálculo de frete",
            description:
              "Calcule o frete usando as informações da remessa que você fornecer.",
          },
          two: {
            title: "Detalhamento claro dos custos",
            description:
              "Visualize separadamente frete, seguro, alfândega, manuseio e outros custos aplicáveis.",
          },
          three: {
            title: "Suporte a múltiplos mercados",
            description:
              "Trabalhe com mercados nacionais compatíveis e remessas internacionais.",
          },
          four: {
            title: "Visão dos custos logísticos",
            description:
              "Entenda os custos logísticos em relação ao valor declarado da carga.",
          },
          five: {
            title: "Reality Score",
            description:
              "Use um indicador de planejamento para entender a completude das informações disponíveis da remessa.",
          },
          six: {
            title: "Dados flexíveis da remessa",
            description:
              "Informe dados de carga, transporte e custos de acordo com sua remessa.",
          },
        },
      },

      globalCoverage: {
        title: "Simule custos de frete em mercados compatíveis",
        description:
          "O freevity ajuda você a estimar custos de transporte em mercados nacionais compatíveis e em remessas internacionais.",
        markets: {
          brazil: {
            title: "Brasil",
            description:
              "Simule custos de transporte nacional utilizando o real brasileiro (BRL).",
          },
          unitedStates: {
            title: "Estados Unidos",
            description:
              "Simule custos de transporte nacional utilizando o dólar americano (USD).",
          },
          euroMarkets: {
            title: "Mercados em euro",
            description:
              "Simule custos de transporte nacional em mercados compatíveis com o euro (EUR).",
          },
          japan: {
            title: "Japão",
            description:
              "Simule custos de transporte nacional utilizando o iene japonês (JPY).",
          },
        },
        note: "As remessas internacionais são apresentadas em USD no MVP. A cobertura depende dos mercados compatíveis configurados pelo freevity.",
      },

      faq: {
        title: "Perguntas frequentes",
        description: "Entenda o que é o freevity e como funciona o simulador.",
        items: {
          one: {
            question: "O freevity é uma transportadora?",
            answer:
              "Não. O freevity é um simulador de custos logísticos. Ele não transporta, reserva ou opera remessas. O freevity ajuda você a estimar custos de transporte e logística para entender melhor um cenário de envio.",
          },
          two: {
            question: "O freevity é gratuito?",
            answer:
              "Sim. O freevity é 100% gratuito para simulação de custos de frete e logística.",
          },
          three: {
            question: "Para quem o freevity é mais indicado?",
            answer:
              "O freevity é indicado para indústrias, transportadoras, profissionais de logística e cadeia de suprimentos, equipes de compras, estudantes de logística e outras pessoas que precisam de uma visão mais clara dos custos de transporte.",
          },
          four: {
            question: "O que o freevity simula?",
            answer:
              "O freevity simula custos de transporte e logística com base nas informações da remessa que você fornecer, ajudando a estimar o custo geral de um cenário.",
          },
          five: {
            question: "O resultado do freevity é uma cotação final?",
            answer:
              "Não. O freevity fornece uma estimativa para planejamento e análise. O resultado não é uma cotação de transportadora, confirmação de contratação ou cálculo oficial de alfândega.",
          },
        },
      },
      cta: {
        title: "Pronto para simular seus custos de transporte?",
        description:
          "Use o freevity para estimar os custos de frete e logística da sua remessa antes de tomar decisões de transporte.",
        button: "Iniciar Simulação de Frete",
        imageAlt:
          "Contêineres de carga e guindastes em um porto, representando simulação de custos de frete e logística.",
      },
    },
    calculator: {
      advertising: {
        label: "Publicidade",
      },
      freight: {
        title: "Calcular frete",
        description:
          "Estime o frete com base nas características da carga e na tarifa aplicável.",
        fields: {
          origin: "Origem",
          destination: "Destino",
          mode: "Modal de transporte",
          quantity: "Quantidade",
          weight: "Peso",
          length: "Comprimento",
          width: "Largura",
          height: "Altura",
          tariffBasis: "Base tarifária",
          tariffRate: "Tarifa",
          maritimeType: "Tipo de embarque marítimo",
          containerQuantity: "Quantidade de contêineres",
          volumetricDivisor: "Divisor volumétrico",
          minimumCharge: "Frete mínimo (opcional)",
          tariffEstimate:
            "Tarifa referencial estimada. Substitua pela tarifa da transportadora quando disponível.",
        },
        modes: {
          road: "Rodoviário",
          air: "Aéreo",
          maritime: "Marítimo",
        },
        maritimeTypes: {
          fcl: "FCL — Contêiner completo",
          lcl: "LCL — Carga consolidada",
        },
        tariffBasis: {
          weight: "Peso",
          volume: "Volume",
          chargeableWeight: "Peso tarifável",
          maritimeWeightMeasurement: "Peso ou medida (W/M)",
          unit: "Unidade",
          flat: "Tarifa fixa",
        },
        additional: {
          fieldLabel: "Custo adicional",
          placeholder: "Ex.: Pedágio",
          add: "Adicionar campo",
          value: "Valor",
          remove: "Remover",
        },
        submit: "Calcular frete",
        feedback: {
          loading: "Calculando seu frete...",
          loadingDescription: "Aguarde enquanto processamos sua solicitação.",
          success: "Cálculo de frete concluído.",
          error:
            "Não foi possível calcular o frete para esta solicitação. Verifique os endereços informados e se o modal selecionado permite realizar o trajeto. Caso os dados estejam corretos, tente novamente mais tarde.",
          // retry: "Tentar novamente",
        },
        result: {
          title: "Resultado do Cálculo de Frete",
          description:
            "Confira o frete estimado e os detalhes do cálculo da carga.",
          totalLabel: "Frete estimado",
          breakdown: {
            baseFreight: "Frete base",
          },
          metrics: {
            actualWeight: "Peso real",
            volumetricWeight: "Peso cubado",
            chargeableWeight: "Peso taxado",
            volume: "Volume",
            transportMode: "Modal",
            operation: "Operação",
          },
          modes: {
            road: "Rodoviário",
            air: "Aéreo",
            maritime: "Marítimo",
          },
          scope: {
            national: "Nacional",
            international: "Internacional",
          },
        },
      },
      form: {
        title: "Simulador de Custos Logísticos",
        description:
          "Informe os dados da sua remessa para estimar os custos de transporte e logística.",
        origin: "Origem",
        destination: "Destino",
        transportMode: "Modal de transporte",
        road: "Rodoviário",
        air: "Aéreo",
        maritime: "Marítimo",
        quantity: "Quantidade",
        weight: "Peso",
        cargoValue: "Valor declarado da carga",
        freight: "Frete",
        insurance: "Seguro",
        customs: "Alfândega",
        handling: "Manuseio",
        localTransport: "Transporte local",
        otherCosts: "Outros custos",
        weightUnitKg: "kg",
        weightUnitG: "g",
        weightUnitLb: "lb",
        submit: "Simular custos logísticos",
      },
      result: {
        title: "Resultado do cálculo",
        description: "Confira os custos estimados de transporte e logística.",
        totalLabel: "Custo total aterrissado",
        breakdown: {
          cargo: "Carga",
          freight: "Frete",
          insurance: "Seguro",
          customs: "Alfândega",
          handling: "Manuseio",
          localTransport: "Transporte local",
          otherCosts: "Outros custos",
        },
        metrics: {
          costPerKg: "Custo por kg",
          costPerUnit: "Custo por unidade",
          logisticsPercentage: "Percentual logístico",
        },
        realityScore: {
          label: "Reality Score",
          low: "Baixo",
          medium: "Médio",
          high: "Alto",
        },
      },
    },
  },

  ja: {
    common: {
      header: {
        home: "ホーム",
        calculator: "計算機",
        language: "言語",
        mobileMenu: "ナビゲーションメニューを開く",
      },

      footer: {
        home: "ホーム",
        calculator: "計算機",
        copyright: "© 2026 freevity. 無断転載・複製を禁じます。",
        navigationTitle: "ナビゲーション",
        socialTitle: "ソーシャルメディアでフォローする",
      },
    },

    notFound: {
      code: "404",
      title: "ページが見つかりません",
      description:
        "申し訳ありません。お探しのページを見つけることができませんでした。",
      backToHome: "← ホームに戻る",
      imageAlt: "明るい空の下に広がる砂丘の砂漠風景。",
    },

    landing: {
      hero: {
        badge: "正確。高速。信頼性。",
        imageAlt: "港の貨物コンテナ。物流とフレートを表現。",
        title: "貨物の輸送コストをシミュレーション。",
        description:
          "明確で一貫したフレート計算ワークフローで着地原価を計算します。",
        cta: "着地原価を計算",
        summary: {
          title: "着地原価サマリー",
          freight: "フレート",
          insurance: "保険",
          customs: "関税",
          handling: "ハンドリング",
          total: "合計",
          freightValue: "¥1,200",
          insuranceValue: "¥180",
          customsValue: "¥350",
          handlingValue: "¥90",
          totalValue: "¥1,820",
        },
      },

      howItWorks: {
        title: "freevityの仕組み",
        description: "簡単なステップで輸送コストをシミュレーションできます。",
        steps: {
          one: {
            title: "出荷情報を入力",
            description: "出発地、目的地、貨物、輸送の詳細を入力します。",
          },
          two: {
            title: "コストを追加",
            description:
              "フレート、保険、関税、ハンドリング、その他の適用コストを追加します。",
          },
          three: {
            title: "輸送コストをシミュレーション",
            description:
              "freevityが入力された情報をまとめ、明確なコスト見積もりを表示します。",
          },
        },
        result: {
          title: "意思決定のための明確な見積もり",
          description:
            "freevityのシミュレーションを使って、輸送・物流コストをより明確に把握できます。",
        },
      },
      features: {
        title: "より明確な運賃判断のために",
        description:
          "freevityは主要な物流情報を一つの明確なワークフローにまとめます。",
        items: {
          one: {
            title: "運賃計算",
            description: "入力した出荷情報を使用して運賃コストを計算します。",
          },
          two: {
            title: "明確なコスト内訳",
            description:
              "フレート、保険、関税、ハンドリング、その他の適用コストを個別に確認できます。",
          },
          three: {
            title: "複数市場に対応",
            description: "対応する国内市場と国際輸送を扱えます。",
          },
          four: {
            title: "物流コストの把握",
            description: "申告された貨物価額に対する物流コストを把握できます。",
          },
          five: {
            title: "Reality Score",
            description:
              "利用可能な出荷情報の充実度を把握するための計画指標として利用できます。",
          },
          six: {
            title: "柔軟な出荷情報",
            description:
              "出荷内容に応じて貨物、輸送、コストの情報を入力できます。",
          },
        },
      },
      globalCoverage: {
        title: "対応市場で輸送コストをシミュレーション",
        description:
          "freevityは、対応する国内市場と国際輸送のコストを見積もるためのシミュレーションツールです。",
        markets: {
          brazil: {
            title: "ブラジル",
            description:
              "ブラジルレアル（BRL）で国内輸送コストをシミュレーションできます。",
          },
          unitedStates: {
            title: "米国",
            description:
              "米ドル（USD）で国内輸送コストをシミュレーションできます。",
          },
          euroMarkets: {
            title: "ユーロ圏市場",
            description:
              "対応するユーロ市場でユーロ（EUR）による国内輸送コストをシミュレーションできます。",
          },
          japan: {
            title: "日本",
            description:
              "日本円（JPY）で国内輸送コストをシミュレーションできます。",
          },
        },
        note: "MVPでは国際輸送をUSDで表示します。対応範囲はfreevityが設定する対応市場によって異なります。",
      },

      faq: {
        title: "よくある質問",
        description:
          "freevityとは何か、シミュレーターがどのように機能するかをご紹介します。",
        items: {
          one: {
            question: "freevityは運送会社ですか？",
            answer:
              "いいえ。freevityは物流コストのシミュレーターです。貨物の輸送、予約、運行を行う会社ではありません。freevityは輸送や物流のコストを見積もり、出荷シナリオを理解するための支援をします。",
          },
          two: {
            question: "freevityは無料ですか？",
            answer:
              "はい。freevityはフレートおよび物流コストのシミュレーションを100%無料で利用できます。",
          },
          three: {
            question: "freevityは誰に向いていますか？",
            answer:
              "freevityは、製造業、運送会社、物流・サプライチェーン担当者、購買担当者、物流を学ぶ学生など、輸送コストをより明確に把握したい方に適しています。",
          },
          four: {
            question: "freevityでは何をシミュレーションできますか？",
            answer:
              "freevityは、入力された出荷情報をもとに輸送・物流コストをシミュレーションし、シナリオ全体のコストを見積もるために利用できます。",
          },
          five: {
            question: "freevityの結果は最終見積もりですか？",
            answer:
              "いいえ。freevityは計画や分析のための見積もりを提供します。結果は運送会社の正式な見積もり、予約確認、または公式な税関計算ではありません。",
          },
        },
      },

      cta: {
        title: "輸送コストをシミュレーションしませんか？",
        description:
          "freevityを使って、輸送の意思決定を行う前に、出荷シナリオのフレートと物流コストを見積もることができます。",
        button: "フレートシミュレーションを開始",
        imageAlt:
          "港の貨物コンテナとクレーン。フレートコストのシミュレーションと物流を表現。",
      },
    },
    calculator: {
      advertising: {
        label: "広告",
      },
      freight: {
        title: "運賃を計算",
        description: "貨物の特性と適用される料金に基づいて運賃を見積もります。",
        fields: {
          origin: "出発地",
          destination: "目的地",
          mode: "輸送モード",
          quantity: "数量",
          weight: "重量",
          length: "長さ",
          width: "幅",
          height: "高さ",
          tariffBasis: "料金基準",
          tariffRate: "料金",
          maritimeType: "海上輸送タイプ",
          containerQuantity: "コンテナ数量",
          volumetricDivisor: "容積重量除数",
          minimumCharge: "最低運賃（任意）",
          tariffEstimate:
            "参考推定料金です。運送会社の料金がわかる場合は置き換えてください。",
        },
        modes: {
          road: "道路輸送",
          air: "航空輸送",
          maritime: "海上輸送",
        },
        maritimeTypes: {
          fcl: "FCL — コンテナ単位",
          lcl: "LCL — 混載貨物",
        },
        tariffBasis: {
          weight: "重量",
          volume: "容積",
          chargeableWeight: "課金重量",
          maritimeWeightMeasurement: "重量または容積（W/M）",
          unit: "単位",
          flat: "固定料金",
        },
        additional: {
          fieldLabel: "追加料金",
          placeholder: "例：通行料",
          add: "項目を追加",
          value: "金額",
          remove: "削除",
        },
        submit: "運賃を計算",
        feedback: {
          loading: "運賃を計算しています...",
          loadingDescription:
            "リクエストを処理しています。しばらくお待ちください。",
          success: "運賃の計算が完了しました。",
          error:
            "今回の運賃を計算できませんでした。入力した住所と、選択した輸送モードでその経路を利用できるかご確認ください。入力内容に問題がない場合は、しばらくしてから再度お試しください。",
          // retry: "再試行",
        },
        result: {
          title: "運賃計算結果",
          description: "推定運賃と貨物計算の詳細を確認できます。",
          totalLabel: "推定運賃",
          breakdown: {
            baseFreight: "基本運賃",
          },
          metrics: {
            actualWeight: "実重量",
            volumetricWeight: "容積重量",
            chargeableWeight: "課金重量",
            volume: "容積",
            transportMode: "輸送モード",
            operation: "輸送区分",
          },
          modes: {
            road: "道路輸送",
            air: "航空輸送",
            maritime: "海上輸送",
          },
          scope: {
            national: "国内",
            international: "国際",
          },
        },
      },
      form: {
        title: "物流コストシミュレーター",
        description: "輸送情報を入力して、輸送および物流コストを見積もります。",
        origin: "出発地",
        destination: "到着地",
        transportMode: "輸送モード",
        road: "陸上輸送",
        air: "航空輸送",
        maritime: "海上輸送",
        quantity: "数量",
        weight: "重量",
        cargoValue: "申告貨物価格",
        freight: "運賃",
        insurance: "保険",
        customs: "税関",
        handling: "荷役",
        localTransport: "国内輸送",
        otherCosts: "その他の費用",
        weightUnitKg: "kg",
        weightUnitG: "g",
        weightUnitLb: "lb",
        submit: "物流コストをシミュレーション",
      },
      result: {
        title: "計算結果",
        description: "輸送および物流の推定コストを確認できます。",
        totalLabel: "総着地コスト",
        breakdown: {
          cargo: "貨物",
          freight: "運賃",
          insurance: "保険",
          customs: "税関",
          handling: "荷役",
          localTransport: "国内輸送",
          otherCosts: "その他の費用",
        },
        metrics: {
          costPerKg: "kgあたりのコスト",
          costPerUnit: "単位あたりのコスト",
          logisticsPercentage: "物流コスト比率",
        },
        realityScore: {
          label: "Reality Score",
          low: "低い",
          medium: "中程度",
          high: "高い",
        },
      },
    },
  },
} as const;
