// All quiz questions exactly as specified in docs/PRD.md Section 5
// Structure: moduleId → array of questions

export const QUIZZES = {
  1: [
    {
      id: 'm1q1',
      text: 'Quieres medir el voltaje de la fuente Mean Well. ¿Dónde pones el cable rojo?',
      options: [
        { label: 'En COM', correct: false, feedback: 'COM es siempre para el negro' },
        { label: 'En VΩHz', correct: true, feedback: '¡Correcto! Para V y Ω siempre es VΩHz' },
        { label: 'En mA', correct: false, feedback: 'mA es solo para medir intensidad' },
        { label: 'En 10A', correct: false, feedback: '10A es para corrientes muy altas' },
      ],
    },
    {
      id: 'm1q2',
      text: '¿Cuál es la diferencia entre corriente alterna y continua?',
      options: [
        { label: 'AC va siempre en el mismo sentido', correct: false, feedback: '¡Al revés! AC cambia de sentido, DC es la que va siempre igual' },
        { label: 'DC cambia de sentido', correct: false, feedback: 'DC (continua) va siempre en el mismo sentido' },
        { label: 'AC cambia de sentido, DC va siempre igual', correct: true, feedback: '¡Exacto! AC = Alterna (cambia), DC = Continua (siempre igual). Nosotros trabajamos con DC.' },
        { label: 'Son lo mismo', correct: false, feedback: 'Son muy diferentes. AC es la de casa, DC la de pilas y electrónica.' },
      ],
    },
    {
      id: 'm1q3',
      text: 'Quieres saber si un cable está roto por dentro. ¿Qué modo usas?',
      options: [
        { label: 'Voltaje', correct: false, feedback: 'Voltaje mide la diferencia de potencial, no si hay conexión' },
        { label: 'Resistencia', correct: false, feedback: 'Podría funcionar, pero hay un modo más rápido y directo' },
        { label: 'Continuidad', correct: true, feedback: '¡Correcto! El polímetro pita si hay conexión. Es el modo 🔊' },
        { label: 'Intensidad', correct: false, feedback: 'Intensidad mide corriente que pasa por un circuito cerrado' },
      ],
    },
    {
      id: 'm1q4',
      text: 'Para medir la corriente que pasa por un LED, el polímetro se pone…',
      options: [
        { label: 'En paralelo con el LED', correct: false, feedback: 'En paralelo se mide VOLTAJE. Para corriente hay que intercalar el polímetro.' },
        { label: 'En serie (intercalado)', correct: true, feedback: '¡Sí! La corriente tiene que pasar POR DENTRO del polímetro. Por eso se pone en serie.' },
        { label: 'Tocando solo un punto', correct: false, feedback: 'Necesitas cerrar el circuito a través del polímetro' },
        { label: 'Da igual cómo', correct: false, feedback: '¡Cuidado! Si mides I en paralelo puedes dañar el polímetro.' },
      ],
    },
  ],

  2: [
    {
      id: 'm2q1',
      text: '2,2kΩ = ¿cuántos ohmios?',
      options: [
        { label: '22Ω', correct: false, feedback: 'Eso sería 0,022kΩ. Recuerda: k = ×1000' },
        { label: '220Ω', correct: false, feedback: 'Eso sería 0,22kΩ. Falta un cero.' },
        { label: '2.200Ω', correct: true, feedback: '¡Correcto! 2,2 × 1.000 = 2.200Ω. "k" significa "×1.000".' },
        { label: '22.000Ω', correct: false, feedback: 'Eso sería 22kΩ, no 2,2kΩ.' },
      ],
    },
    {
      id: 'm2q2',
      text: '50mA = ¿cuántos amperios?',
      options: [
        { label: '50.000A', correct: false, feedback: 'Al revés: mA a A se DIVIDE entre 1.000, no se multiplica.' },
        { label: '5A', correct: false, feedback: 'Te falta un cero. 50 ÷ 1.000 no es 5.' },
        { label: '0,5A', correct: false, feedback: 'Cerca pero no. 0,5A = 500mA.' },
        { label: '0,05A', correct: true, feedback: '¡Correcto! 50 ÷ 1.000 = 0,05A. Truco: mueve la coma 3 posiciones a la izquierda.' },
      ],
    },
    {
      id: 'm2q3',
      text: 'V=4V, R=3kΩ. ¿Cuál es I?',
      hint: 'Primero convierte: 3kΩ = 3.000Ω. Luego I = V/R',
      options: [
        { label: '1,33mA', correct: true, feedback: '¡Perfecto! I = 4/3.000 = 0,00133A = 1,33mA. Bien hecho con la conversión.' },
        { label: '1,33A', correct: false, feedback: 'Eso sería con R=3Ω, no 3kΩ. ¡No olvides convertir!' },
        { label: '12.000A', correct: false, feedback: 'Eso es V×R, no V/R. La fórmula es I = V/R.' },
        { label: '0,75A', correct: false, feedback: 'I = V/R, no R/V. Sería 3.000/4 = 750, pero la fórmula es al revés.' },
      ],
    },
    {
      id: 'm2q4',
      text: '¿Qué pasa si aumentas la resistencia en un circuito y el voltaje no cambia?',
      options: [
        { label: 'La corriente aumenta', correct: false, feedback: 'Si I = V/R y R sube, la corriente no puede subir.' },
        { label: 'La corriente disminuye', correct: true, feedback: '¡Correcto! Si I = V/R y R sube (con V constante), I baja. Es la Ley de Ohm en acción.' },
        { label: 'No pasa nada', correct: false, feedback: 'Según la Ley de Ohm, cambiar R siempre afecta a I (si V es constante).' },
        { label: 'El circuito explota', correct: false, feedback: 'No explota, simplemente pasa menos corriente. Es como estrechar un tobogán: menos gente baja a la vez.' },
      ],
    },
  ],

  3: [
    {
      id: 'm3q1',
      text: 'El LED tiene la pata larga y la pata corta. ¿Cuál es el ánodo (+)?',
      options: [
        { label: 'La corta', correct: false, feedback: 'La corta es el cátodo (−). Truco: "corta" y "cátodo" empiezan por "c".' },
        { label: 'La larga', correct: true, feedback: '¡Sí! Pata larga = ánodo (+). La corriente entra por el ánodo.' },
        { label: 'Da igual', correct: false, feedback: 'No da igual. Si lo pones al revés no se enciende (polarización inversa).' },
        { label: 'Las dos son iguales', correct: false, feedback: 'Mira bien tu LED: una pata es más larga que la otra.' },
      ],
    },
    {
      id: 'm3q2',
      text: 'VT=10V, VD=2V, I=20mA. ¿Qué resistencia necesitas para proteger el LED?',
      hint: 'VR = VT − VD = 10−2 = 8V. Luego R = VR/I. ¡Convierte mA a A primero!',
      options: [
        { label: '500Ω', correct: false, feedback: '¿Usaste VT en vez de VR? Recuerda restar VD primero.' },
        { label: '400Ω', correct: true, feedback: '¡Perfecto! R = 8V / 0,02A = 400Ω. En la práctica usarías 330Ω o 470Ω (valores comerciales).' },
        { label: '200Ω', correct: false, feedback: 'Con 200Ω pasarían 40mA por el LED. ¡Demasiada corriente, se quemaría!' },
        { label: '5kΩ', correct: false, feedback: 'Con 5kΩ solo pasarían 1,6mA. El LED apenas brillaría.' },
      ],
    },
    {
      id: 'm3q3',
      text: 'Si pones el LED al revés (polarización inversa), ¿qué pasa?',
      options: [
        { label: 'Brilla igual', correct: false, feedback: 'El LED es un diodo: solo deja pasar corriente en un sentido.' },
        { label: 'Explota', correct: false, feedback: 'No explota. Simplemente bloquea la corriente.' },
        { label: 'No brilla pero no se rompe', correct: true, feedback: '¡Correcto! En polarización inversa el diodo bloquea la corriente. Es como una puerta cerrada: no pasa nada.' },
        { label: 'Brilla más', correct: false, feedback: 'Al revés no brilla nada. La corriente no puede pasar.' },
      ],
    },
  ],

  4: [
    {
      id: 'm4q1',
      text: 'Ves una resistencia con bandas: Marrón, Negro, Rojo, Dorado. ¿Qué valor tiene?',
      options: [
        { label: '100Ω ±5%', correct: false, feedback: 'Marrón=1, Negro=0, pero el multiplicador Rojo = ×100, no ×10.' },
        { label: '1kΩ ±5%', correct: true, feedback: '¡Correcto! Marrón(1), Negro(0) = 10, × Rojo(100) = 1.000Ω = 1kΩ. Dorado = ±5%.' },
        { label: '10kΩ ±5%', correct: false, feedback: 'El multiplicador Rojo es ×100, no ×1.000 (eso sería Naranja).' },
        { label: '1kΩ ±10%', correct: false, feedback: 'El valor está bien, pero Dorado = ±5%, no ±10% (Plateado es ±10%).' },
      ],
    },
    {
      id: 'm4q2',
      text: 'Quieres una resistencia de 4,7kΩ. ¿Qué colores necesitas?',
      options: [
        { label: 'Amarillo, Violeta, Rojo', correct: true, feedback: '¡Bien! Amarillo(4), Violeta(7) = 47, × Rojo(100) = 4.700Ω = 4,7kΩ.' },
        { label: 'Amarillo, Violeta, Naranja', correct: false, feedback: 'Eso sería 47 × 1.000 = 47kΩ. ¡10 veces más!' },
        { label: 'Amarillo, Verde, Rojo', correct: false, feedback: 'Eso sería 45 × 100 = 4.500Ω = 4,5kΩ. Violeta es el 7, no Verde.' },
        { label: 'Naranja, Violeta, Rojo', correct: false, feedback: 'Eso sería 37 × 100 = 3.700Ω = 3,7kΩ. Amarillo es el 4.' },
      ],
    },
    {
      id: 'm4q3',
      text: 'Si lees Marrón-Negro-Naranja-Dorado, ¿cuánto vale?',
      options: [
        { label: '10kΩ ±5%', correct: true, feedback: '¡Perfecto! Marrón(1), Negro(0) = 10, × Naranja(1.000) = 10.000Ω = 10kΩ. Dorado = ±5%.' },
        { label: '100Ω ±5%', correct: false, feedback: 'Naranja = ×1.000, no ×1. Eso sería multiplicador Negro.' },
        { label: '1kΩ ±5%', correct: false, feedback: 'Naranja = ×1.000. 10 × 1.000 = 10.000Ω = 10kΩ.' },
        { label: '100kΩ ±5%', correct: false, feedback: '10 × 1.000 = 10.000Ω = 10kΩ, no 100kΩ.' },
      ],
    },
  ],

  5: [
    {
      id: 'm5q1',
      text: 'R1=220Ω, R2=330Ω, R3=1kΩ en serie con VT=10V. ¿Cuánto es RT?',
      options: [
        { label: '550Ω', correct: false, feedback: '¿Olvidaste sumar R3? En serie se suman TODAS: RT = R1 + R2 + R3.' },
        { label: '1.550Ω', correct: true, feedback: '¡Exacto! 220 + 330 + 1.000 = 1.550Ω. En serie se suman todas las resistencias.' },
        { label: '183Ω', correct: false, feedback: 'Eso sería el paralelo de las tres. En SERIE se SUMAN.' },
        { label: '1.000Ω', correct: false, feedback: 'Eso es solo R3. En serie hay que sumar las tres.' },
      ],
    },
    {
      id: 'm5q2',
      text: 'En ese circuito serie, ¿qué resistencia se lleva más voltaje?',
      options: [
        { label: 'R1 (220Ω)', correct: false, feedback: 'R1 es la más pequeña, se lleva MENOS voltaje.' },
        { label: 'R2 (330Ω)', correct: false, feedback: 'R2 es mediana. La de mayor R se lleva más V.' },
        { label: 'R3 (1kΩ)', correct: true, feedback: '¡Correcto! La mayor R se lleva más V. R3=1kΩ consume 6,45V de los 10V (V=I×R).' },
        { label: 'Todas igual', correct: false, feedback: 'En serie la corriente es igual, pero el voltaje se REPARTE proporcional a R.' },
      ],
    },
    {
      id: 'm5q3',
      text: 'IT=6,45mA y V3=6,45V. ¿Cuánta potencia disipa R3?',
      hint: 'P = V × I. ¡Cuidado con las unidades: mA → A!',
      options: [
        { label: '41,6W', correct: false, feedback: '¡Unidades! 6,45mA = 0,00645A. P = 6,45 × 0,00645 = 0,0416W = 41,6mW.' },
        { label: '41,6mW', correct: true, feedback: '¡Perfecto! P = 6,45V × 0,00645A = 0,0416W = 41,6mW. ¡Bien con las unidades!' },
        { label: '6,45W', correct: false, feedback: 'Eso sería P = V × 1A. Recuerda convertir mA a A.' },
        { label: '0,0416W', correct: false, feedback: '¡Valor correcto! Pero normalmente lo expresamos como 41,6mW. Ambos son válidos.' },
      ],
    },
  ],

  6: [
    {
      id: 'm6q1',
      text: 'R1=1kΩ y R2=1kΩ en paralelo. ¿Cuánto es RT?',
      options: [
        { label: '2kΩ', correct: false, feedback: 'Eso sería en SERIE. En paralelo RT siempre es MENOR que la menor R.' },
        { label: '1kΩ', correct: false, feedback: 'Dos resistencias iguales en paralelo dan la MITAD del valor.' },
        { label: '500Ω', correct: true, feedback: '¡Correcto! Con R iguales: RT = R/n = 1.000/2 = 500Ω. O con fórmula: (1k × 1k)/(1k + 1k) = 500Ω.' },
        { label: '250Ω', correct: false, feedback: '250Ω sería si tuvieras 4 de 1kΩ en paralelo (1.000/4).' },
      ],
    },
    {
      id: 'm6q2',
      text: 'En un paralelo con VT=10V, ¿cuánto vale V en R1?',
      options: [
        { label: '5V', correct: false, feedback: 'Eso sería en serie si fueran iguales. En paralelo no se divide el voltaje.' },
        { label: '10V', correct: true, feedback: '¡Exacto! En paralelo SIEMPRE V es igual en todas las ramas. V1 = V2 = VT = 10V.' },
        { label: 'Depende de R1', correct: false, feedback: 'En paralelo el voltaje es SIEMPRE igual, sin importar el valor de R.' },
        { label: '0V', correct: false, feedback: 'Si hay voltaje en el circuito, hay voltaje en cada rama paralela.' },
      ],
    },
    {
      id: 'm6q3',
      text: 'R1=1kΩ y R2=2kΩ en paralelo a 10V. ¿Cuál lleva más corriente?',
      options: [
        { label: 'R1 (1kΩ)', correct: true, feedback: '¡Sí! I1=10/1.000=10mA, I2=10/2.000=5mA. La de MENOR R lleva MÁS corriente (como una autopista más ancha).' },
        { label: 'R2 (2kΩ)', correct: false, feedback: 'Al revés: menor R = más corriente. Piensa en un tobogán más ancho.' },
        { label: 'Igual', correct: false, feedback: 'Solo sería igual si R1 = R2. Como son diferentes, la corriente se reparte.' },
        { label: 'Depende del voltaje', correct: false, feedback: 'El voltaje es 10V para ambas, pero la corriente depende de cada R.' },
      ],
    },
  ],

  7: [
    {
      id: 'm7q1',
      text: 'R2=1kΩ y R3=1kΩ están en paralelo. ¿Cuánto es la R equivalente del paralelo?',
      options: [
        { label: '2kΩ', correct: false, feedback: 'Eso sería en serie. En paralelo siempre sale MENOS que la menor R individual.' },
        { label: '1kΩ', correct: false, feedback: 'Dos R iguales en paralelo = la mitad del valor.' },
        { label: '500Ω', correct: true, feedback: '¡Correcto! R_par = (1k × 1k)/(1k + 1k) = 500Ω. Paso 1 del método: ¡simplificar el paralelo!' },
        { label: '250Ω', correct: false, feedback: 'Eso sería con 4 resistencias de 1kΩ en paralelo.' },
      ],
    },
    {
      id: 'm7q2',
      text: 'Ese paralelo (500Ω) va en serie con R1=220Ω. ¿Cuánto es RT del circuito completo?',
      options: [
        { label: '720Ω', correct: true, feedback: '¡Perfecto! RT = R1 + R_paralelo = 220 + 500 = 720Ω. Paso 1 completado.' },
        { label: '220Ω', correct: false, feedback: 'Eso es solo R1. Hay que sumar el bloque paralelo.' },
        { label: '500Ω', correct: false, feedback: 'Eso es solo el paralelo. Falta sumar R1.' },
        { label: '1.720Ω', correct: false, feedback: '¿Sumaste las tres sin simplificar el paralelo? R2‖R3 = 500Ω, no 1.000+1.000.' },
      ],
    },
    {
      id: 'm7q3',
      text: 'IT=13,9mA. ¿Cuánta corriente pasa por R2?',
      hint: 'R2 y R3 son iguales y están en paralelo. La corriente se reparte…',
      options: [
        { label: '13,9mA', correct: false, feedback: 'Esa es la corriente total. En el paralelo se reparte.' },
        { label: '6,94mA', correct: true, feedback: '¡Exacto! Como R2=R3, la corriente se reparte a partes iguales: 13,9/2 = 6,94mA cada una.' },
        { label: '0mA', correct: false, feedback: 'Hay corriente en todo el circuito, incluyendo cada rama del paralelo.' },
        { label: '27,8mA', correct: false, feedback: 'La corriente en cada rama es MENOR que IT, no mayor.' },
      ],
    },
    {
      id: 'm7q4',
      text: 'V1=3,06V (caída en R1). ¿Cuánto voltaje queda para el paralelo R2‖R3?',
      options: [
        { label: '3,06V', correct: false, feedback: 'Eso es V1. El voltaje del paralelo es lo que QUEDA.' },
        { label: '6,94V', correct: true, feedback: '¡Correcto! VT = V1 + V_paralelo. 10 = 3,06 + V_paralelo → V_paralelo = 6,94V. ¡Kirchhoff en acción!' },
        { label: '10V', correct: false, feedback: '10V es VT total. Parte se "gasta" en R1.' },
        { label: '0V', correct: false, feedback: 'El voltaje se reparte, no desaparece.' },
      ],
    },
  ],

  8: [
    {
      id: 'm8q1',
      text: 'Potenciómetro de 10kΩ girado al 75%. Con 10V de fuente, ¿qué voltaje hay en la pata central?',
      options: [
        { label: '2,5V', correct: false, feedback: 'Eso sería al 25%.' },
        { label: '5V', correct: false, feedback: 'Eso sería al 50%. El pot está al 75%.' },
        { label: '7,5V', correct: true, feedback: '¡Correcto! V = VT × posición = 10V × 0,75 = 7,5V. El pot es un divisor de tensión ajustable.' },
        { label: '10V', correct: false, feedback: 'Eso sería girado al 100% (tope).' },
      ],
    },
    {
      id: 'm8q2',
      text: 'La LDR: más luz = ¿más o menos resistencia?',
      options: [
        { label: 'Más resistencia', correct: false, feedback: 'Al revés. Más luz = más fotones = más electrones libres = menos R.' },
        { label: 'Menos resistencia', correct: true, feedback: '¡Correcto! ↑Luz → ↓R. Más fotones liberan más electrones en el semiconductor.' },
        { label: 'Igual', correct: false, feedback: 'La gracia de la LDR es que CAMBIA con la luz.' },
        { label: 'Depende de la temperatura', correct: false, feedback: 'Eso sería un termistor. La LDR depende de la LUZ.' },
      ],
    },
  ],

  // Module 8 virtual lab quiz
  '8-lab': [
    {
      id: 'm8labq1',
      text: 'Una LDR a pleno sol (R=200Ω) en serie con R fija de 1kΩ a 5V. ¿Cuánto voltaje hay en la R fija?',
      hint: 'Divisor de tensión: V_fija = VT × R_fija / (R_fija + R_LDR)',
      options: [
        { label: '4,17V', correct: true, feedback: '¡Correcto! V = 5 × 1.000 / (1.000 + 200) = 5.000/1.200 = 4,17V. La R fija se lleva casi todo el voltaje porque es mucho mayor que la LDR al sol.' },
        { label: '1V', correct: false, feedback: 'Recuerda: es un divisor de tensión proporcional a las resistencias.' },
        { label: '2,5V', correct: false, feedback: 'Sería 2,5V si ambas R fueran iguales. Pero R_fija >> R_LDR al sol.' },
        { label: '5V', correct: false, feedback: 'La LDR siempre consume algo de voltaje, aunque sea poco.' },
      ],
    },
    {
      id: 'm8labq2',
      text: 'Un termistor NTC está en agua caliente. ¿Su resistencia…?',
      options: [
        { label: 'Sube', correct: false, feedback: 'Eso sería un PTC. NTC es lo contrario.' },
        { label: 'Baja', correct: true, feedback: '¡Correcto! NTC = Negative Temperature Coefficient. ↑Temperatura → ↓Resistencia. El termostato de tu casa usa uno de estos.' },
        { label: 'No cambia', correct: false, feedback: 'La gracia del termistor es que SÍ cambia con la temperatura.' },
        { label: 'Se rompe', correct: false, feedback: 'Los termistores están diseñados para trabajar con temperatura. No se rompen.' },
      ],
    },
  ],
}
