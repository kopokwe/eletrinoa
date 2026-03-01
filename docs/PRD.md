# PRD: Laboratorio de Electricidad — Webapp Educativa

## Documento de Requisitos de Producto

**Versión:** 2.1 (incorpora feedback de revisión)  
**Fecha:** 1 marzo 2026  
**Alumna objetivo:** Noa, 14 años, 3º ESO  
**Fuente curricular:** Apuntes manuscritos de Noa (12 páginas, Tema 2: Electricidad)

-----

## 1. CONTEXTO Y PROBLEMA

### 1.1 Situación actual

Noa es una alumna inteligente pero desmotivada con la electricidad/electrónica. Sus apuntes (12 páginas manuscritas) cubren un temario denso que va desde el polimetro hasta circuitos mixtos con 5 pasos de resolución. El material es teórico y abstracto: fórmulas, tablas, ejercicios numéricos sin conexión con el mundo real.

### 1.2 Oportunidad

Noa tiene acceso a componentes reales que permiten **verificar con las manos** cada concepto de sus apuntes. La webapp debe ser el puente entre los apuntes abstractos y la experiencia tangible, construyendo un arco narrativo que culmina en un proyecto espectacular: **hacer que un display de 7 segmentos muestre números controlados por ella**.

### 1.3 Principios pedagógicos

- **Feynman invertido**: Noa “enseña” a la app lo que sabe (quizzes) antes de recibir nueva información
- **Espiral ascendente**: Cada módulo reutiliza conceptos anteriores añadiendo una capa
- **Error productivo**: Los errores en quizzes generan explicaciones más ricas que los aciertos
- **Conexión apuntes ↔ realidad**: Cada pantalla referencia la página exacta de sus apuntes
- **Culminación tangible**: Todo conduce al proyecto final (display 7 segmentos)

-----

## 2. INVENTARIO DISPONIBLE (RESTRICCIÓN HARDWARE)

Todo el diseño debe funcionar exclusivamente con estos componentes:

|Componente                     |Cantidad|Notas                                     |
|-------------------------------|--------|------------------------------------------|
|Breadboard Ariston             |1       |830 puntos, estándar                      |
|LED rojo 5mm                   |1       |Único LED disponible                      |
|Display 7 segmentos TDSR 5160 G|1       |Telefunken, cátodo común, 7 LEDs internos |
|Potenciómetro rotatorio        |1       |Eje metálico, puede no caber en breadboard|
|Bolsa de resistencias surtidas |1       |Valores desconocidos, hay que medir       |
|Rollo de cable (verde/blanco)  |1       |Hay que cortar y pelar                    |
|Transistor TO-220              |1       |No usado en esta versión                  |
|Transistor TO-92               |1       |No usado en esta versión                  |
|Condensadores cerámicos        |2       |No usados en esta versión                 |
|Fuente Mean Well 12V           |1       |Ajustable a 10V vía pot interno Vo        |
|Multímetro Venlab VM-S208      |1       |Digital, modos V/A/Ω/continuidad/diodo    |

**Componentes NO disponibles:** LDR, termistor, LEDs adicionales sueltos, pila 9V.

-----

## 3. MAPA CURRICULAR COMPLETO

Análisis exhaustivo de los apuntes de Noa (12 páginas) cruzado con la cobertura de la webapp:

### 3.1 Contenidos identificados en los apuntes

|#  |Contenido                                                     |Páginas    |Peso examen|Cobertura webapp                 |
|---|--------------------------------------------------------------|-----------|-----------|---------------------------------|
|C1 |Polimetro: partes, modos, conexiones                          |1, 9       |★★★        |Módulo 1                         |
|C2 |Tipos de corriente (AC vs DC)                                 |1          |★          |Módulo 1 (teoría)                |
|C3 |Componentes y símbolos (pila, R, condensador, motor, bombilla)|2          |★★         |Módulo 2 (teoría)                |
|C4 |Materiales: conductores, no conductores, semiconductores      |2          |★          |Módulo 2 (teoría)                |
|C5 |Magnitudes: I (A), R (Ω), V (V) — definiciones y unidades     |2-3        |★★★        |Módulo 2                         |
|C6 |Instrumentos de medida: amperímetro, ohmímetro, voltímetro    |3          |★★         |Módulo 1-2                       |
|C7 |**Conversión de unidades** (kΩ↔Ω, mA↔A, µA↔A)                 |3          |★★★        |Módulo 2 (quiz dedicado)         |
|C8 |**Ley de Ohm**: V=I·R, I=V/R, R=V/I                           |3, 5       |★★★★       |Módulos 3-8 (recurrente)         |
|C9 |Circuito abierto vs cerrado                                   |2          |★          |Módulo 3 (teoría)                |
|C10|Sentido convencional vs real de la corriente                  |2          |★          |Módulo 3 (teoría)                |
|C11|**Potencia**: P=V·I, P=E/t                                    |4, 5       |★★★        |Módulos 5-7 (cálculo obligatorio)|
|C12|**Energía**: E=P·t (J y kWh)                                  |4, 5       |★★         |Módulo 5 (teoría + quiz)         |
|C13|**Serie**: RT=R1+R2+…, IT igual, VT se reparte                |4-6, 11    |★★★★       |Módulo 5                         |
|C14|**Paralelo**: 1/RT=1/R1+1/R2+…, VT igual, IT se reparte       |4-6, 12    |★★★★       |Módulo 6                         |
|C15|**Circuito mixto** (serie+paralelo combinados)                |6-7, 10, 12|★★★★★      |Módulo 7                         |
|C16|**Método de 5 pasos** (calcular RT→IT→ver iguales→Ohm→P)      |10-12      |★★★★★      |Módulo 7                         |
|C17|**Código de colores** de resistencias                         |6, 8       |★★         |Módulo 4                         |
|C18|R variables: potenciómetro, LDR, termistor                    |12         |★★         |Módulo 8                         |
|C19|**Diodos**: polarización directa/inversa, símbolo             |10         |★★★        |Módulo 3                         |
|C20|**Diodo LED**: cálculo de R (VR=VT−VD)                        |10         |★★★        |Módulo 3                         |
|C21|Ejercicio polimetro 24 medidas                                |9          |★★         |Módulo 1 (referencia)            |

### 3.2 Flujo de dependencias conceptuales

```
C1 (polimetro)
 └→ C5 (magnitudes I,R,V) + C7 (conversiones)
     └→ C8 (Ley de Ohm)
         ├→ C19+C20 (diodos + cálculo R para LED)
         ├→ C13 (serie) + C11 (potencia)
         ├→ C14 (paralelo) + C11 (potencia)
         │   └→ C15+C16 (mixto + método 5 pasos)
         └→ C18 (R variables → potenciómetro)
              └→ PROYECTO FINAL (display 7 segmentos)
```

-----

## 4. ARQUITECTURA DE LA WEBAPP

### 4.1 Estructura de navegación

```
HOME (mapa de progreso)
├── Módulo 1: Conoce tu escáner (polimetro)
├── Módulo 2: Las 3 magnitudes (I, R, V + conversiones)
├── Módulo 3: Tu primer circuito (LED + diodo + Ohm)
├── Módulo 4: Descifra las resistencias (código de colores + tu bolsa)
├── Módulo 5: Todo en fila (serie + potencia)
├── Módulo 6: Autopista de electrones (paralelo + potencia)
├── Módulo 7: El jefe final (mixto + método 5 pasos)
├── Módulo 8: Controla el voltaje (potenciómetro + lab virtual LDR/termistor)
├── PROYECTO FINAL: Hackea el display
├── 📝 Simulacro de examen (se desbloquea tras módulo 7)
├── 📋 Chuleta de fórmulas
├── 🧰 Inventario
└── 🏆 Logros
```

### 4.2 Estructura interna de cada módulo

Cada módulo tiene **4 fases secuenciales** que se desbloquean progresivamente:

```
┌─────────────────────────────────────────────────┐
│  FASE 1: ENTIENDE (📖)                          │
│  Teoría visual conectada a los apuntes de Noa   │
│  Referencia a página exacta del cuaderno        │
│  Analogías memorables del mundo real             │
│  Duración: 2-3 minutos de lectura               │
├─────────────────────────────────────────────────┤
│  FASE 2: DEMUESTRA (🧮)                         │
│  Quiz interactivo (2-4 preguntas)               │
│  Sistema de pistas progresivas                   │
│  Explicación rica en errores                     │
│  Requiere ≥75% aciertos para avanzar            │
├─────────────────────────────────────────────────┤
│  FASE 3: CONSTRUYE (🔧) *solo módulos 3-9*      │
│  Instrucciones paso a paso con breadboard        │
│  Warnings de seguridad                           │
│  Esquema visual del circuito                     │
├─────────────────────────────────────────────────┤
│  FASE 4: COMPRUEBA (📏) *solo módulos 3-9*      │
│  Checklist de medidas con el Venlab              │
│  **Calculadora de Tolerancia integrada**:        │
│    Noa introduce su medida real → la app muestra │
│    si está dentro del ±5% esperado, con feedback │
│    tipo: "Tu 9,7V está dentro del ±5% de 10V.   │
│    Diferencia: 3%. Los componentes reales no son │
│    perfectos, ¡y eso es normal en ingeniería!"   │
│  Si la medida está fuera de rango: sugiere       │
│    posibles errores de montaje                   │
│  Comparación cálculo teórico vs medida real      │
│  Reflexión: "¿por qué difiere un poco?"         │
└─────────────────────────────────────────────────┘
```

Los módulos 1-2 son solo teórico-prácticos (ENTIENDE + DEMUESTRA), no requieren montaje en breadboard. A partir del módulo 3, las 4 fases están activas.

-----

## 5. ESPECIFICACIÓN DETALLADA POR MÓDULO

-----

### MÓDULO 1: “Conoce tu escáner” 🔍

**Cubre:** C1 (polimetro), C2 (AC/DC), C6 (instrumentos)  
**Apuntes:** Páginas 1 y 9  
**Tipo:** Solo teoría + quiz (no requiere breadboard)

#### Fase 1 — ENTIENDE

**Narrativa:** “Tu Venlab VM-S208 es un escáner de superhéroe: puede ver cosas invisibles como el voltaje, la corriente y la resistencia.”

Conceptos a cubrir:

- Qué es un polimetro (aparato que mide magnitudes eléctricas)
- **Dos tipos de corriente**: Alterna (AC, ∿, la de casa, cambia de sentido) vs Continua (DC, ⎓, la de pilas y electrónica, mismo sentido siempre). Nota: “nosotros trabajamos siempre con DC”
- **Partes del polimetro**: 2 terminales (rojo y negro), hembrillas (COM, VΩHz, mA, 10A), selector rotatorio
- **4 modos principales de medida** con tabla:
  - Continuidad: Negro→COM, Rojo→VΩHz, Selector→🔊. Para qué: saber si hay conexión
  - Tensión (V): Negro→COM, Rojo→VΩHz, Selector→V DC. Para qué: medir voltaje
  - Resistencia (Ω): Negro→COM, Rojo→VΩHz, Selector→Ω. Para qué: medir resistencias
  - Intensidad (A): Negro→COM, Rojo→**mA** (o 10A si es mucha), Selector→A DC. Para qué: medir corriente
- **Regla de oro**: para medir V y Ω el polimetro va EN PARALELO. Para medir I va EN SERIE (se intercala en el circuito). Esto se reforzará en módulos posteriores.

Referencia visual: “Mira la página 1 de tus apuntes donde tienes dibujado todo esto. ¿Ves los diagramas de conexión? Tu Venlab funciona igual que el de clase.”

#### Fase 2 — DEMUESTRA

**Preguntas (4):**

1. “Quieres medir el voltaje de la fuente Mean Well. ¿Dónde pones el cable rojo?”
- A) En COM → ❌ “COM es siempre para el negro”
- B) En VΩHz → ✅ “¡Correcto! Para V y Ω siempre es VΩHz”
- C) En mA → ❌ “mA es solo para medir intensidad”
- D) En 10A → ❌ “10A es para corrientes muy altas”
1. “¿Cuál es la diferencia entre corriente alterna y continua?”
- A) AC va siempre en el mismo sentido → ❌ “Es al revés: AC cambia de sentido, DC es constante”
- B) DC cambia de sentido continuamente → ❌ “DC va siempre en el mismo sentido”
- C) AC cambia de sentido, DC va siempre igual → ✅
- D) Son lo mismo → ❌ “Son muy diferentes. La de tu casa es AC (230V), la de pilas es DC”
1. “Quieres saber si un cable está roto por dentro. ¿Qué modo usas?”
- A) Voltaje → ❌ “Voltaje mide diferencia de potencial, no si hay conexión”
- B) Resistencia → ❌ “Serviría, pero hay un modo más rápido que suena”
- C) Continuidad → ✅ “¡Sí! El polímetro pita si hay conexión. Es el modo 🔊”
- D) Intensidad → ❌ “Intensidad necesita que haya un circuito funcionando”
1. “Para medir la corriente que pasa por un LED, el polímetro se pone…”
- A) En paralelo con el LED → ❌ “En paralelo se mide VOLTAJE. Para corriente hay que ‘cortar’ el circuito”
- B) En serie (intercalado) → ✅ “¡Exacto! La corriente tiene que pasar POR DENTRO del polímetro”
- C) Tocando solo un punto → ❌ “Necesitas dos puntos para cualquier medida”
- D) Da igual → ❌ “No da igual: si mides I en paralelo puedes dañar el polímetro”

**Logro al completar:** 🔍 “Investigadora” — “Ya sabes usar el escáner. Nada se te escapa.”

-----

### MÓDULO 2: “Las 3 magnitudes” ⚡

**Cubre:** C3 (componentes), C4 (materiales), C5 (I, R, V), C7 (conversiones)  
**Apuntes:** Páginas 2-3  
**Tipo:** Solo teoría + quiz (no requiere breadboard)

#### Fase 1 — ENTIENDE

**Narrativa — Analogía del tobogán de agua:**

“Imagina un tobogán de un parque acuático. Eso es un circuito eléctrico.”

|Concepto           |En el tobogán             |En electricidad                       |Unidad      |Símbolo|
|-------------------|--------------------------|--------------------------------------|------------|-------|
|**Voltaje (V)**    |La altura del tobogán     |La “presión” que empuja los electrones|Voltios (V) |V      |
|**Intensidad (I)** |Cuánta gente baja a la vez|El flujo de electrones por segundo    |Amperios (A)|I      |
|**Resistencia (R)**|Lo estrecho del tubo      |La oposición al paso de corriente     |Ohmios (Ω)  |R      |

“Si el tobogán es más alto (más V), baja más gente (más I). Si el tubo es más estrecho (más R), baja menos gente (menos I). Eso es toda la Ley de Ohm: **V = I × R**.”

Componentes y símbolos (referencia visual a página 2):

- Pila (una celda: +|−) y Batería (varias: +|−|−|+)
- Resistencia: −[⊗]− o zigzag
- Condensador: −||−
- Bombilla: −(X)−
- Motor: −(M)−

Materiales:

- Conductores: metales (cobre, aluminio) → R muy baja
- No conductores (aislantes): plástico, madera → R muy alta
- Semiconductores: silicio, germanio → R variable (base de la electrónica moderna)

**Bloque de conversiones (CRÍTICO para el examen):**

“Los números en electricidad pueden ser enormes o diminutos. Usamos prefijos:”

|Prefijo  |Símbolo|Factor    |Ejemplo         |
|---------|-------|----------|----------------|
|Mega (M) |M      |×1.000.000|2MΩ = 2.000.000Ω|
|Kilo (k) |k      |×1.000    |3kΩ = 3.000Ω    |
|—        |—      |×1        |470Ω            |
|Mili (m) |m      |÷1.000    |20mA = 0,020A   |
|Micro (µ)|µ      |÷1.000.000|3µA = 0,000003A |

“Truco: para convertir a la unidad base, kilo MULTIPLICA por 1000 y mili DIVIDE por 1000.”

#### Fase 2 — DEMUESTRA

**Preguntas (4):**

1. **Conversión**: “2,2kΩ = ¿cuántos ohmios?”
- A) 22Ω → ❌ “kilo = ×1000, no ×10”
- B) 220Ω → ❌ “kilo = ×1000, no ×100”
- C) 2.200Ω → ✅ “2,2 × 1000 = 2200Ω”
- D) 22.000Ω → ❌ “Eso serían 22kΩ”
1. **Conversión**: “50mA = ¿cuántos amperios?”
- A) 50.000A → ❌ “mili = ÷1000, no ×1000. Al revés.”
- B) 5A → ❌ “mili = ÷1000, no ÷10”
- C) 0,5A → ❌ “Eso serían 500mA”
- D) 0,05A → ✅ “50 ÷ 1000 = 0,05A”
1. **Ley de Ohm**: “V=4V, R=3kΩ. ¿Cuál es I?” (ejercicio exacto de página 3 — post-it amarillo)
- Pista: “Primero convierte: 3kΩ = 3000Ω. Luego I = V/R”
- A) 1,33mA → ✅ “I = 4/3000 = 0,00133A = 1,33mA”
- B) 1,33A → ❌ “Eso sería con R=3Ω, no 3kΩ. ¡Las unidades importan!”
- C) 12.000A → ❌ “Eso es V×R, pero la fórmula es I=V/R”
- D) 0,75A → ❌ “Revisa: I = V/R, no R/V”
1. **Conceptual**: “¿Qué pasa si aumentas la resistencia en un circuito y el voltaje no cambia?”
- A) La corriente aumenta → ❌ “Más R = más oposición = MENOS corriente”
- B) La corriente disminuye → ✅ “Si I = V/R y R sube, I baja. Como estrechar el tobogán.”
- C) No pasa nada → ❌ “V=I×R: si R cambia e I no, entonces V tendría que cambiar”
- D) El circuito explota → ❌ “Más R en realidad es más seguro, fluye menos corriente”

**Logro al completar:** ⚡ “Trilingüe” — “Hablas voltio, amperio y ohmio con fluidez.”

-----

### MÓDULO 3: “Tu primer circuito” 💡

**Cubre:** C8 (Ley de Ohm aplicada), C9 (abierto/cerrado), C10 (sentido corriente), C19 (diodos), C20 (cálculo R para LED)  
**Apuntes:** Páginas 2, 3, 10  
**Tipo:** Teoría + quiz + breadboard + medidas  
**Componentes:** 1 LED rojo, 1 resistencia (~330-470Ω), cables, Mean Well a 10V

#### Fase 1 — ENTIENDE

**Narrativa:** “Vas a hacer lo que el ingeniero que diseñó la luz de standby de tu tele hizo: calcular la resistencia exacta para que un LED no se queme.”

Conceptos:

- **Circuito abierto vs cerrado** (pág 2): abierto = interruptor cortado, no fluye corriente. Cerrado = circuito completo, fluye corriente.
- **Sentido de la corriente** (pág 2, post-it amarillo): el sentido REAL va de − a +, pero el CONVENCIONAL (el que usamos siempre) va de + a −. “Se usa el convencional de normal aunque esté mal. ¡Así lo pone en tus apuntes!”
- **El diodo**: componente que solo deja pasar corriente en un sentido (pág 10). Símbolo: →|. Ánodo (+) y cátodo (−).
  - **Polarización directa**: + al ánodo → conduce → el LED brilla
  - **Polarización inversa**: + al cátodo → NO conduce → el LED no brilla (pero no se rompe)
- **El diodo LED**: un diodo que emite luz. La pata LARGA es el ánodo (+). Necesita ~2V para funcionar (VD) y soporta ~20mA.
- **Cálculo de la resistencia** (pág 10, ejercicio final):
  - VT = 10V (nuestra fuente)
  - VD = 2V (caída del LED)
  - VR = VT − VD = 10 − 2 = **8V** (lo que absorbe la resistencia)
  - I = 20mA = 0,02A
  - **R = VR / I = 8 / 0,02 = 400Ω**
  - En el saquito buscaremos 330Ω (brilla un poco más) o 470Ω (brilla un poco menos). Ambas son seguras.

“Fíjate: acabas de usar la Ley de Ohm (R=V/I), las conversiones (mA→A), y el concepto de diodo. Todo junto.”

#### Fase 2 — DEMUESTRA

**Preguntas (3):**

1. “El LED tiene la pata larga y la pata corta. ¿Cuál es el ánodo (+)?”
- A) La corta → ❌ “La corta es el cátodo (−). Truco: corta = cátodo, ambas con C”
- B) La larga → ✅ “Pata larga = ánodo (+). Truco: larga = positiva, más generosa”
- C) Da igual → ❌ “¡No! El diodo solo conduce en un sentido. Al revés no brilla”
- D) Las dos son iguales → ❌ “Si miras bien, una es más larga. Y dentro del plástico son diferentes”
1. “VT=10V, VD=2V, I=20mA. ¿R necesaria?”
- Pista: “VR = VT − VD = 10−2 = 8V. Luego R = VR/I. Convierte mA a A primero.”
- A) 500Ω → ❌ “R = 8/0,02 = 400Ω, no 500”
- B) 400Ω → ✅ “8V / 0,02A = 400Ω. En la práctica usaremos 330Ω o 470Ω del saquito.”
- C) 200Ω → ❌ “Con 200Ω pasarían 40mA. Demasiado, podrías quemar el LED.”
- D) 5KΩ → ❌ “Con 5KΩ solo pasarían 1,6mA. El LED apenas brillaría.”
1. “Si pones el LED al revés (polarización inversa), ¿qué pasa?”
- A) Brilla igual → ❌ “El diodo SOLO conduce en un sentido”
- B) Explota → ❌ “No pasa nada malo, simplemente no conduce”
- C) No brilla pero no se rompe → ✅ “Exacto. Está en polarización inversa: no pasa corriente, no hay luz, no hay daño.”
- D) Brilla más → ❌ “No brilla en absoluto. Cero.”

#### Fase 3 — CONSTRUYE

**Esquema del circuito:** Raíl+ → R(330-470Ω) → LED(ánodo) → LED(cátodo) → Raíl−

**Pasos:**

1. Comprueba que la Mean Well está a 10V (mide con Venlab entre +V y −V)
1. Cable rojo: +V de la fuente → raíl + de la breadboard
1. Cable negro: −V de la fuente → raíl − de la breadboard
1. Resistencia (330Ω o 470Ω): un extremo en raíl +, otro en fila 10
1. LED pata LARGA (ánodo) en fila 10 (conecta con la R internamente)
1. LED pata CORTA (cátodo) en fila 15
1. Cable: fila 15 → raíl − (cierra el circuito)

**Warning:** “Si el LED no brilla, dale la vuelta. Si aún no brilla, comprueba que la fuente está encendida y que la R no es demasiado grande.”

**Experimento extra:** Pon el LED al revés a propósito. Comprueba que NO brilla. Acabas de ver la polarización inversa en vivo.

#### Fase 4 — COMPRUEBA

**Medidas con el Venlab:**

|Medida             |Cómo                          |Esperado|Tu valor|
|-------------------|------------------------------|--------|--------|
|V en la resistencia|Puntas en los extremos de la R|≈ 8V    |___     |
|V en el LED        |Puntas en ánodo y cátodo      |≈ 2V    |___     |
|V_R + V_LED        |Suma tus medidas              |≈ 10V   |___     |

**Reflexión:** “¿La suma de V_R + V_LED da exactamente 10V? Probablemente no exacto pero muy cerca. La diferencia es normal: se debe a tolerancia de componentes. Esto es la Ley de Kirchhoff: la suma de caídas de tensión en un circuito cerrado es igual al voltaje de la fuente.”

**Calculadora de Tolerancia:** Cuando Noa introduce su valor medido (ej. V_R = 7,8V), la app calcula:

- Desviación respecto al teórico: |7,8 − 8,0| / 8,0 = 2,5%
- Si ≤5%: “✅ Tu 7,8V está a solo un 2,5% del valor teórico (8,0V). Normal: tu resistencia de 330Ω puede valer en realidad 315-345Ω.”
- Si 5-15%: “⚠️ Tu medida se desvía un poco más de lo esperado. Comprueba que las puntas del Venlab hacen buen contacto.”
- Si >15%: “❌ Algo no cuadra. Posibles causas: resistencia equivocada, cable suelto, o la fuente no está a 10V. Revisa el montaje.”

**Logro al completar:** 💡 “Hacedora” — “Has construido tu primer circuito. Ya nada es solo teoría.”

-----

### MÓDULO 4: “Descifra las resistencias” 🔎

**Cubre:** C17 (código de colores)  
**Apuntes:** Páginas 6, 8  
**Tipo:** Teoría + quiz interactivo + actividad práctica (clasificar la bolsa)  
**Componentes:** Bolsa de resistencias + Venlab

#### Fase 1 — ENTIENDE

**Narrativa:** “Las resistencias tienen bandas de colores que son un código secreto. Vas a aprender a leerlo y luego a clasificar todas las de tu bolsa.”

**Tabla del código de colores:**

|Color   |Dígito|Multiplicador|Tolerancia|
|--------|------|-------------|----------|
|Negro   |0     |×1           |—         |
|Marrón  |1     |×10          |±1%       |
|Rojo    |2     |×100         |±2%       |
|Naranja |3     |×1.000       |—         |
|Amarillo|4     |×10.000      |—         |
|Verde   |5     |×100.000     |—         |
|Azul    |6     |×1.000.000   |—         |
|Violeta |7     |—            |—         |
|Gris    |8     |—            |—         |
|Blanco  |9     |—            |—         |
|Dorado  |—     |×0,1         |±5%       |
|Plateado|—     |×0,01        |±10%      |

**Ejemplo de los apuntes (pág 6):** Marrón-Negro-Rojo-Dorado → 1, 0, ×100 = **1000Ω = 1kΩ** (±5%)

**Regla mnemotécnica:** “**M**e **N**ota **R**ara **N**o **A**cabar **V**erde **A**zul **V**ioleta **G**ris **B**lanca” (Marrón, Negro, Rojo, Naranja, Amarillo, Verde, Azul, Violeta, Gris, Blanco)

“Pero aquí viene lo importante: el código de colores te da una ESTIMACIÓN. El polímetro te da el VALOR REAL. Siempre verifica con el Venlab.”

#### Fase 2 — DEMUESTRA

**Quiz interactivo con selector de colores (3 preguntas):**

1. Mostrar imagen de 3 bandas + tolerancia → pedir valor
1. Dar un valor (ej. 4,7kΩ) → pedir bandas correctas
1. “Si lees Marrón-Negro-Naranja-Dorado, ¿cuánto vale?” → 10 × 1000 = 10kΩ ±5%

#### Fase 3 — CONSTRUYE (actividad práctica sin breadboard)

**Título:** “Clasifica tu arsenal”

**Instrucciones:**

1. Vacía la bolsa de resistencias sobre la mesa
1. Intenta leer el código de colores de cada una (apunta en papel)
1. Mide cada una con el Venlab en modo Ω
1. Compara: ¿coincide el código con la medida?
1. Haz montoncitos: las que necesitarás son **220Ω, 330Ω, 470Ω, 1kΩ** (y 10kΩ si hay)
1. Marca cada montoncito con un papel

**No hay Fase 4** para este módulo (no hay circuito que medir).

**Logro al completar:** 🔎 “Descifradora” — “Lees resistencias como quien lee emojis.”

-----

### MÓDULO 5: “Todo en fila” ⛓️

**Cubre:** C13 (serie), C11 (potencia), C12 (energía)  
**Apuntes:** Páginas 4-5, 11  
**Tipo:** Completo (4 fases)  
**Componentes:** 3 resistencias (220Ω + 330Ω + 1kΩ), cables, Mean Well a 10V

#### Fase 1 — ENTIENDE

**Narrativa:** “Un circuito serie es como una fila de gente agarrada de la mano. Si uno suelta, se rompe la cadena para todos. Por eso si se funde UNA bombilla vieja de Navidad, se apagan TODAS.”

Conceptos serie (pág 4-5):

- **RT = R1 + R2 + … + Rn** (se suman)
- **IT = I1 = I2 = … = In** (la corriente es IGUAL en todas)
- **VT = V1 + V2 + … + Vn** (el voltaje se REPARTE)
- La R más grande se lleva más voltaje (proporcional)

**Potencia (NUEVO — pág 4):**

- **P = V × I** (Potencia en watios)
- “La potencia es cuánta energía consume un componente por segundo”
- P_total = P1 + P2 + P3 (también se suman)
- Receptor: energía consumida. Generador: energía suministrada.

**Energía (pág 4):**

- **E = P × t** (en julios si t en segundos, en kWh si P en kW y t en horas)
- “Tu factura de luz mide kWh: potencia × tiempo”

**Ejemplo resuelto (ejercicio EXACTO de la página 11):**
Datos: R1=2Ω, R2=3Ω, R3=5Ω, VT=100V (los de su cuaderno)

Nuestro ejercicio práctico será análogo pero con valores reales:
R1=220Ω, R2=330Ω, R3=1kΩ, VT=10V

|Paso        |Operación     |Resultado             |
|------------|--------------|----------------------|
|1° RT       |220+330+1000  |**1550Ω**             |
|2° IT       |10V / 1550Ω   |**6,45mA** (=0,00645A)|
|3° V1       |0,00645 × 220 |**1,42V**             |
|3° V2       |0,00645 × 330 |**2,13V**             |
|3° V3       |0,00645 × 1000|**6,45V**             |
|Comprobación|1,42+2,13+6,45|**10,00V** ✓          |
|4° P1       |1,42 × 0,00645|**9,2mW**             |
|4° P2       |2,13 × 0,00645|**13,7mW**            |
|4° P3       |6,45 × 0,00645|**41,6mW**            |
|4° PT       |10 × 0,00645  |**64,5mW** ✓          |

#### Fase 2 — DEMUESTRA

**Preguntas (3):**

1. “R1=220Ω, R2=330Ω, R3=1kΩ en serie a 10V. ¿RT?”
- Opciones: 550Ω / **1550Ω** / 183Ω / 1000Ω
1. “Con los datos anteriores, ¿qué R se lleva más voltaje?”
- Opciones: R1 (220Ω) / R2 (330Ω) / **R3 (1kΩ)** / Todas igual
- Explicación: “La mayor R se lleva más V. R3=1kΩ consume 6,45V de los 10V.”
1. “IT=6,45mA y V3=6,45V. ¿Potencia en R3?”
- Pista: “P = V × I. Cuidado con las unidades: mA → A”
- Opciones: 41,6W / **41,6mW** / 6,45W / 0,0416W
- Explicación: “P = 6,45V × 0,00645A = 0,0416W = 41,6mW. ¡mili watios! Estos son circuitos de baja potencia.”

#### Fase 3 — CONSTRUYE

**Esquema:** Raíl+ → R1(220Ω) → R2(330Ω) → R3(1kΩ) → Raíl−

**Pasos:**

1. Cable: raíl + → fila 5
1. R1 (220Ω): fila 5 → fila 10
1. R2 (330Ω): fila 10 → fila 15
1. R3 (1kΩ): fila 15 → fila 20
1. Cable: fila 20 → raíl −

#### Fase 4 — COMPRUEBA

|Medida    |Esperado|Tu valor|
|----------|--------|--------|
|V1 (en R1)|≈ 1,42V |___     |
|V2 (en R2)|≈ 2,13V |___     |
|V3 (en R3)|≈ 6,45V |___     |
|V1+V2+V3  |≈ 10V   |___     |

**Reflexión:** “La de 1kΩ se lleva casi el 65% del voltaje total. Eso es un DIVISOR DE TENSIÓN: el voltaje se reparte proporcionalmente a la resistencia. Este concepto volverá en el módulo 8 con el potenciómetro.”

**Calculadora de Tolerancia:** Misma lógica que Módulo 3. Ejemplo: si V3 mide 6,2V en vez de 6,45V → desviación 3,9% → “✅ Dentro de tolerancia. Tu R3 probablemente vale 960Ω en vez de los 1000Ω nominales. Mídela sola con el Venlab para comprobarlo.”

**Logro al completar:** ⛓️ “Seriéfila” — “Dominas los circuitos serie. Kirchhoff estaría orgulloso.”

-----

### MÓDULO 6: “Autopista de electrones” 🔀

**Cubre:** C14 (paralelo), C11 (potencia en paralelo)  
**Apuntes:** Páginas 4-5, 12  
**Tipo:** Completo (4 fases)  
**Componentes:** 2 resistencias de 1kΩ (o las más parecidas), cables

#### Fase 1 — ENTIENDE

**Narrativa:** “Un circuito paralelo es como una autopista con varios carriles. Si un carril se cierra, los coches (electrones) siguen por los otros. Por eso las luces de casa son paralelo: apagas el baño y la cocina sigue encendida.”

Conceptos paralelo (pág 4-5):

- **1/RT = 1/R1 + 1/R2 + … + 1/Rn** (inversos)
- **VT = V1 = V2 = … = Vn** (voltaje IGUAL en todas)
- **IT = I1 + I2 + … + In** (la corriente se REPARTE)
- Atajo para 2 iguales: RT = R/2 (la mitad)
- La rama con MENOR R lleva MÁS corriente

Ejemplo con nuestros componentes: R1=1kΩ, R2=1kΩ en paralelo, VT=10V

- RT = 1000/2 = 500Ω
- IT = 10/500 = 20mA
- I1 = I2 = 10mA (se reparte en partes iguales por ser iguales)
- P1 = P2 = 10V × 10mA = 100mW
- PT = 10V × 20mA = 200mW

**Comparación Serie vs Paralelo (tabla resumen de pág 5):**

|Propiedad        |Serie               |Paralelo             |
|-----------------|--------------------|---------------------|
|Resistencia total|Se SUMAN            |Se suman los INVERSOS|
|Corriente        |IGUAL en todas      |Se REPARTE           |
|Voltaje          |Se REPARTE          |IGUAL en todas       |
|Si 1 falla       |Todo se apaga       |El resto sigue       |
|Ejemplo real     |Luces Navidad viejas|Luces de una casa    |

#### Fase 2 — DEMUESTRA

**Preguntas (3):**

1. “R1=1kΩ y R2=1kΩ en paralelo. ¿RT?”
- Opciones: 2kΩ / 1kΩ / **500Ω** / 250Ω
1. “En un paralelo con VT=10V, ¿cuánto vale V en R1?”
- Opciones: 5V / **10V** / Depende de R1 / 0V
- Explicación: “En paralelo SIEMPRE V es igual en todas las ramas. V1=V2=VT=10V.”
1. “R1=1kΩ y R2=2kΩ en paralelo a 10V. ¿Cuál lleva más corriente?”
- Opciones: **R1 (1kΩ)** / R2 (2kΩ) / Igual / Depende
- Explicación: “I=V/R. I1=10/1000=10mA, I2=10/2000=5mA. La de MENOR R lleva MÁS corriente.”

#### Fase 3 — CONSTRUYE

**Pasos:**

1. Cable: raíl + → fila 5 (punto A)
1. Cable: raíl − → fila 20 (punto B)
1. R1 (1kΩ): fila 5 → fila 20
1. R2 (1kΩ): fila 5 → fila 20 (en columnas diferentes pero mismas filas)

#### Fase 4 — COMPRUEBA

|Medida   |Esperado|Tu valor|
|---------|--------|--------|
|V en R1  |≈ 10V   |___     |
|V en R2  |≈ 10V   |___     |
|¿V1 = V2?|¡Sí!    |___     |

**Logro al completar:** 🔀 “Arquitecta paralela” — “Si una rama falla, tú sigues adelante.”

-----

### MÓDULO 7: “El jefe final” 🧩

**Cubre:** C15 (mixto), C16 (método de 5 pasos)  
**Apuntes:** Páginas 6-7, 10, 12  
**Tipo:** Completo (4 fases)  
**Componentes:** 3 resistencias (220Ω en serie con 1kΩ || 1kΩ en paralelo), cables

**ESTE ES EL MÓDULO MÁS IMPORTANTE PARA EL EXAMEN.**

**Componente especial: Tabla Dinámica de Circuito**
Este módulo incluye una tabla interactiva que replica el formato de los apuntes de Noa (pág 11). A medida que responde los quizzes del método de 5 pasos, los valores se rellenan automáticamente en la tabla, manteniendo la visión global del circuito. La tabla persiste visible durante todo el módulo como panel lateral/superior:

```
┌──────────────────────────────────────────────────────┐
│  TABLA DE CIRCUITO                R1=220Ω  R2=1kΩ  R3=1kΩ │
│  ─────────────────────────────────────────────────── │
│  Resistencia  │ RT=720Ω │  220Ω  │ 1kΩ   │  1kΩ   │
│  Voltaje      │ VT=10V  │  3,06V │ 6,94V │  6,94V │
│  Intensidad   │ IT=13,9 │  13,9  │ 6,94  │  6,94  │
│  Potencia     │ PT=139  │  42,5  │ 48,2  │  48,2  │
│  (mA / mW)    │         │        │       │        │
└──────────────────────────────────────────────────────┘
```

Las celdas se desbloquean progresivamente: primero RT, luego IT, luego los voltajes, etc. Las celdas bloqueadas muestran “?” hasta que Noa las calcula correctamente en el quiz. Esto refuerza el hábito organizativo que su profesora espera y evita que pierda la visión global al navegar entre pantallas.

#### Fase 1 — ENTIENDE

**Narrativa:** “Has dominado serie y paralelo por separado. Ahora llega el jefe final: circuitos que mezclan los dos. Pero tranquila, tienes un arma secreta: el MÉTODO DE 5 PASOS que tu profe te enseñó.”

**El Método de 5 Pasos** (pág 10-11, marcado en colores en los apuntes):

1. 🟦 **Calcular RT** — Simplifica el circuito paso a paso (paralelo→serie)
1. 🟩 **Calcular IT** — IT = VT / RT
1. 🟪 **Mirar qué es igual** — ¿Qué R comparten I? ¿Cuáles comparten V?
1. 🟨 **Aplicar Ley de Ohm** — V=I×R en cada resistencia
1. 🟧 **Calcular P** — P=V×I en cada una

**Nuestro circuito práctico:**
R1=220Ω en SERIE con (R2=1kΩ EN PARALELO con R3=1kΩ)

```
     R1=220Ω
Raíl+ ──┤├──┬──── Raíl−
               │  R2=1kΩ  │
               ├──┤├──────┤
               │  R3=1kΩ  │
               ├──┤├──────┘
```

**Resolución paso a paso:**

|Paso             |Operación                                    |Resultado           |
|-----------------|---------------------------------------------|--------------------|
|1° R23 (paralelo)|1/R23 = 1/1000 + 1/1000 = 2/1000 → R23 = 500Ω|R23 = **500Ω**      |
|1° RT (serie)    |RT = R1 + R23 = 220 + 500                    |RT = **720Ω**       |
|2° IT            |IT = VT/RT = 10/720                          |IT = **13,9mA**     |
|3° Iguales       |Serie: I1 = IT = 13,9mA. Paralelo: V2 = V3   |Anotado             |
|4° V1            |V1 = IT × R1 = 0,0139 × 220                  |V1 = **3,06V**      |
|4° V23           |V23 = VT − V1 = 10 − 3,06                    |V23 = **6,94V**     |
|4° I2, I3        |I2 = V23/R2 = 6,94/1000 = 6,94mA. Igual I3.  |I2 = I3 = **6,94mA**|
|Comprobación     |I2+I3 = 13,9mA = IT ✓                        |✓                   |
|5° P1            |3,06 × 0,0139                                |**42,5mW**          |
|5° P2=P3         |6,94 × 0,00694                               |**48,2mW**          |
|5° PT            |10 × 0,0139                                  |**139mW** ✓         |

#### Fase 2 — DEMUESTRA

**Preguntas (4):**

1. “R2=1kΩ || R3=1kΩ. ¿R equivalente del paralelo?”
- Opciones: 2kΩ / 1kΩ / **500Ω** / 250Ω
1. “Ese paralelo (500Ω) va en serie con R1=220Ω. ¿RT del circuito completo?”
- Opciones: **720Ω** / 220Ω / 500Ω / 1720Ω
1. “IT=13,9mA. ¿Cuánta corriente pasa por R2?”
- Pista: “R2 y R3 son iguales y están en paralelo. La corriente se reparte…”
- Opciones: 13,9mA / **6,94mA** / 0mA / 27,8mA
1. “V1=3,06V. ¿Cuánto queda para el paralelo?”
- Opciones: 3,06V / **6,94V** / 10V / 0V
- Explicación: “VT = V1 + V_paralelo. 10 = 3,06 + V_paralelo → V_paralelo = 6,94V”

#### Fase 3 — CONSTRUYE

**Pasos:**

1. Cable: raíl + → fila 5
1. R1 (220Ω): fila 5 → fila 12
1. R2 (1kΩ): fila 12 → fila 20
1. R3 (1kΩ): fila 12 → fila 20 (otra columna, mismas filas)
1. Cable: fila 20 → raíl −

#### Fase 4 — COMPRUEBA

|Medida        |Esperado       |Tu valor|
|--------------|---------------|--------|
|V en R1 (220Ω)|≈ 3,06V        |___     |
|V en R2 (1kΩ) |≈ 6,94V        |___     |
|V en R3 (1kΩ) |≈ 6,94V        |___     |
|¿V2 = V3?     |¡Sí! (paralelo)|___     |
|V1 + V2       |≈ 10V          |___     |

**Logro al completar:** 🧩 “Jefa final” — “Dominas el método de 5 pasos. El examen tiembla.”

-----

### MÓDULO 8: “Controla el voltaje” 🎛️

**Cubre:** C18 (R variables: potenciómetro, LDR, termistor)  
**Apuntes:** Página 12  
**Tipo:** Completo (4 fases)  
**Componentes:** Potenciómetro, cables

#### Fase 1 — ENTIENDE

**Narrativa:** “Hasta ahora todas las resistencias eran fijas. Pero hay resistencias que CAMBIAN. Tu potenciómetro es una de ellas: tú giras y la R cambia. Eso cambia V e I en tiempo real.”

**Tres tipos de resistencias variables (pág 12):**

|Tipo             |Depende de…                   |Símbolo|En tu inventario|
|-----------------|------------------------------|-------|----------------|
|**Potenciómetro**|Posición del cursor (tú giras)|─/↗/─  |✅ Sí            |
|**LDR**          |Luz (↑luz → ↓R, ↓luz → ↑R)    |─(☀)─  |❌ No tenemos    |
|**Termistor**    |Temperatura (depende del tipo)|─(θ)─  |❌ No tenemos    |

“El potenciómetro tiene 3 patas. Las de los extremos son los ‘finales’ de una resistencia fija. La del medio es un cursor que se desliza por dentro al girar la rueda. Según la posición, reparte la resistencia entre los dos lados.”

Esto crea un **divisor de tensión** (el mismo concepto del módulo 5):

- Si giras a tope a un lado: V_central ≈ 10V
- Si giras a la mitad: V_central ≈ 5V
- Si giras al otro extremo: V_central ≈ 0V

“El LDR hace exactamente lo mismo pero con la luz en vez de una rueda. Tu móvil usa un LDR para ajustar el brillo de pantalla automáticamente.”

#### Fase 2 — DEMUESTRA

**Preguntas (2):**

1. “Pot de 10kΩ girado al 75%. ¿V en pata central con 10V de fuente?”
- Opciones: 2,5V / 5V / **7,5V** / 10V
1. “La LDR: más luz = ¿más o menos resistencia?”
- Opciones: Más R / **Menos R** / Igual / Depende
- Explicación: “↑Luz → ↓R. Más fotones liberan más electrones en el semiconductor. Por eso tu pantalla brilla más de día: el sensor detecta luz, baja su R, y el circuito interpreta ‘hay mucha luz, sube el brillo’.”

#### Fase 3 — CONSTRUYE

**Pasos:**

1. Pata IZQUIERDA del pot → raíl + (mediante cable)
1. Pata DERECHA → raíl −
1. Pata CENTRAL = salida variable
1. Venlab: rojo en pata central, negro en raíl −
1. Gira lentamente y observa el display del Venlab

**Warning:** “Tu pot es grande y probablemente no cabe en la breadboard. Conecta cables a sus patas con pinzas o enrollando el cable fino.”

#### Fase 4 — COMPRUEBA

|Medida                          |Esperado       |Tu valor|
|--------------------------------|---------------|--------|
|V central girado a un extremo   |≈ 0V o ≈ 10V   |___     |
|V central a la mitad            |≈ 5V           |___     |
|V central al otro extremo       |≈ 10V o ≈ 0V   |___     |
|R total del pot (entre extremos)|Valor fijo (¿?)|___     |

“Mide la R total del pot entre sus dos patas extremas (sin conectar a nada). Ese es su valor nominal. Apúntalo: te dice cuántos kΩ es.”

**Logro al completar:** 🎛️ “DJ del Voltaje” — “Controlas la electricidad con la mano.”

#### Fase 5 — LABORATORIO VIRTUAL: LDR y Termistor 🧪

**Justificación:** No tenemos LDR ni termistor físicos, pero son contenido de examen (pág 12). Esta fase cubre la brecha con simulación interactiva.

**Simulador LDR:**

- Pantalla con un circuito virtual: fuente + LDR + R fija + voltímetro
- Un slider tipo “sol/luna” (o icono de linterna) que Noa arrastra para simular nivel de luz
- Al mover el slider: la R de la LDR cambia en tiempo real (ej. sol→500Ω, oscuridad→50kΩ)
- El voltímetro virtual muestra cómo cambia V en la R fija (divisor de tensión)
- Relación visual clara: ↑Luz → ↓R_LDR → ↑V en R fija
- Nota al pie: “Tu móvil tiene un sensor de luz que funciona exactamente así. Por eso la pantalla se atenúa en la oscuridad.”

**Simulador Termistor:**

- Mismo layout de circuito pero con slider de temperatura (hielo ↔ fuego)
- Dos modos: NTC (↑Temp → ↓R, el más común) y PTC (↑Temp → ↑R)
- Aplicación real: “El termostato de tu casa usa un termistor NTC para medir la temperatura y decidir si enciende la calefacción.”

**Quiz del Lab Virtual (2 preguntas):**

1. “Una LDR está a pleno sol (R=200Ω) en serie con una R fija de 1kΩ a 5V. ¿V en la R fija?”
- Pista: “Divisor de tensión: V_fija = VT × R_fija / (R_fija + R_LDR)”
- Opciones: **4,17V** / 1V / 2,5V / 5V
1. “Un termistor NTC está en agua caliente. ¿Su resistencia…?”
- Opciones: Sube / **Baja** / No cambia / Se rompe
- Explicación: “NTC = Negative Temperature Coefficient. ↑T → ↓R. Es el tipo más usado.”

**Logro bonus:** 🧪 “Simuladora” — “Aunque no los tengas, entiendes cómo funcionan.”

-----

### PROYECTO FINAL: “Hackea el Display” 🔢

**Cubre:** Todos los conceptos anteriores aplicados simultáneamente  
**Apuntes:** Síntesis de páginas 2, 3, 10, 11  
**Tipo:** Proyecto guiado con múltiples fases  
**Componentes:** Display TDSR 5160 G, 7 resistencias de 330Ω, cables, Mean Well a 10V

#### Introducción narrativa

“Este es tu proyecto final. Todo lo que has aprendido culmina aquí: vas a hacer que un display de 7 segmentos muestre los números del 0 al 9. Cada segmento es un LED (módulo 3), necesita su propia resistencia calculada con Ohm (módulo 5), los segmentos son circuitos en paralelo con cátodo común (módulo 6), y el display combina serie y paralelo (módulo 7). Es todo junto.”

#### Fase 1 — ENTIENDE

**El display TDSR 5160 G:**

- 7 segmentos nombrados a–g, más punto decimal (dp)
- Cada segmento = 1 LED individual
- Tipo: cátodo común (los cátodos de todos los LEDs están conectados internamente)
- 10 pines: 2 comunes (cátodo) + 7 segmentos + 1 punto decimal

**Mapa de segmentos:**

```
 ─a─
|   |
f   b
|   |
 ─g─
|   |
e   c
|   |
 ─d─   •dp
```

**Tabla de números:**

|Número|Segmentos activos  |Nº de R necesarias|
|------|-------------------|------------------|
|0     |a, b, c, d, e, f   |6                 |
|1     |b, c               |2                 |
|2     |a, b, d, e, g      |5                 |
|3     |a, b, c, d, g      |5                 |
|4     |b, c, f, g         |4                 |
|5     |a, c, d, f, g      |5                 |
|6     |a, c, d, e, f, g   |6                 |
|7     |a, b, c            |3                 |
|8     |a, b, c, d, e, f, g|7                 |
|9     |a, b, c, d, f, g   |6                 |

**Cálculo de R por segmento** (idéntico al módulo 3):

- VT = 10V, VD ≈ 2V, I = 20mA
- R = (10−2)/0,02 = **400Ω → usamos 330Ω**

“Cada segmento necesita su propia R porque cada uno es un circuito independiente. Son 7 circuitos en paralelo que comparten el cátodo.”

#### Fase 2 — EXPLORA EL DISPLAY

**Actividad de descubrimiento con el Venlab:**

“Antes de conectar nada, vas a mapear los pines de tu display.”

1. Pon el Venlab en **modo DIODO** (símbolo →|)
1. Identifica primero los pines COMUNES: prueba todas las combinaciones. Los pines comunes (cátodo) darán lectura con muchos otros pines.
1. Para cada pin no-común, registra qué segmento se ilumina débilmente cuando tocas con las puntas.
1. Dibuja tu mapa: “Pin 1 = segmento e, Pin 2 = segmento d, etc.”

**Tabla para rellenar (interactiva en la webapp):**

|Pin|Segmento|Verificado|
|---|--------|----------|
|1  |___     |☐         |
|2  |___     |☐         |
|…  |…       |…         |
|10 |___     |☐         |

**Red de seguridad: Mapa SVG Interactivo**
Si Noa se atasca identificando pines (tarea de alta fricción), puede pulsar “¿Necesitas ayuda?” para abrir un SVG interactivo del display:

- Muestra el display visto desde arriba con los 10 pines numerados
- Al tocar un pin, el segmento correspondiente se ilumina en rojo en el SVG
- Los pines comunes (cátodo) se marcan con un icono GND
- Esto NO reemplaza la actividad manual con el Venlab (que sigue siendo el objetivo), sino que actúa como “chuleta” para evitar frustración si lleva más de 5 minutos atascada
- Al usar la ayuda, se muestra un mensaje: “Usa esto como referencia, pero intenta verificar cada pin con el Venlab. La diferencia entre mirar un mapa y explorar el terreno es lo que separa a los turistas de los exploradores 🗺️”
- El mapa incluye la orientación correcta: “muesca/punto arriba, pin 1 abajo a la izquierda”

#### Fase 3 — CONSTRUYE PASO A PASO

**Nivel 1: Enciende UN segmento**

1. Pincha el display en la breadboard (a caballo del surco central)
1. Identifica un pin de cátodo común → cable al raíl −
1. Elige un pin de segmento → R de 330Ω → raíl +
1. ¿Se enciende? ¡Primer segmento!

**Nivel 2: Forma el número “1”**

- Conecta segmentos b y c (cada uno con su propia R de 330Ω)
- Solo 2 resistencias necesarias

**Nivel 3: Forma el número “7”**

- Conecta segmentos a, b, c (3 resistencias)

**Nivel 4: Forma el “8” (todos los segmentos)**

- Conecta a, b, c, d, e, f, g (7 resistencias)
- Este es el circuito completo

**Nivel BONUS: Añade el potenciómetro**

- Sustituye la conexión directa de UN segmento por: pot → R → segmento
- Al girar el pot, ese segmento se atenúa o se intensifica
- “Acabas de hacer un dimmer. Así funcionan los reguladores de luz de casa.”

#### Fase 4 — COMPRUEBA

|Medida                     |Esperado        |
|---------------------------|----------------|
|V en 1 segmento encendido  |≈ 2V            |
|V en su resistencia de 330Ω|≈ 8V            |
|¿V_segmento + V_R = 10V?   |¡Sí! (Kirchhoff)|
|I por 1 segmento           |≈ 24mA (8V/330Ω)|
|I total con 7 segmentos    |≈ 7 × 24 = 168mA|

**Reflexión final:** “Has aplicado: la Ley de Ohm (7 veces), cálculo de R para diodos, circuitos en paralelo (todos los segmentos), y medición con polimetro. Todo lo de tus 12 páginas de apuntes en un solo proyecto. Esto es exactamente cómo funcionan los marcadores de los campos de fútbol, los relojes digitales, y los displays de las gasolineras.”

**Logro al completar:** 🔢 “Hacker del Display” — “Has convertido apuntes en tecnología real. Nivel: ingeniera.”

**Teaser:** “🚀 PRÓXIMO NIVEL: Cuando llegue el kit Freenove ESP32, podrás programar este display para que cuente automáticamente del 0 al 9. Tu primer proyecto con código.”

-----

## 6. SECCIÓN CHULETA DE FÓRMULAS

Accesible siempre desde el menú principal. Contiene:

### 6.1 Ley de Ohm

```
V = I × R       I = V / R       R = V / I
```

V en voltios (V), I en amperios (A), R en ohmios (Ω)

### 6.2 Potencia y Energía

```
P = V × I       P = E / t       E = P × t
```

P en watios (W), E en julios (J) o kilovatios-hora (kWh)

### 6.3 Asociación de resistencias

```
Serie:    RT = R1 + R2 + … + Rn
Paralelo: 1/RT = 1/R1 + 1/R2 + … + 1/Rn
```

### 6.4 Serie vs Paralelo (tabla comparativa)

|          |Serie         |Paralelo      |
|----------|--------------|--------------|
|R total   |Se suman      |Inversos      |
|Corriente |Igual en todas|Se reparte    |
|Voltaje   |Se reparte    |Igual en todas|
|Potencia  |Se suma       |Se suma       |
|Si 1 falla|Todo off      |Rest ok       |

### 6.5 Conversiones — Escalera completa de prefijos

Escalera completa tal como aparece en los apuntes de Noa (pág 3):

|Prefijo        |Símbolo|Factor|Ejemplo eléctrico          |
|---------------|-------|------|---------------------------|
|Tera (T)       |T      |×10¹² |— (rarísimo en este nivel) |
|Giga (G)       |G      |×10⁹  |— (rarísimo en este nivel) |
|Mega (M)       |M      |×10⁶  |3,5MΩ = 3.500.000Ω         |
|Kilo (k)       |k      |×10³  |2,2kΩ = 2.200Ω             |
|— (unidad base)|—      |×1    |470Ω, 0,02A                |
|deci (d)       |d      |×10⁻¹ |(poco usado en electrónica)|
|centi (c)      |c      |×10⁻² |(poco usado en electrónica)|
|Mili (m)       |m      |×10⁻³ |20mA = 0,020A              |
|Micro (µ)      |µ      |×10⁻⁶ |3µA = 0,000003A            |
|Nano (n)       |n      |×10⁻⁹ |100nF (condensadores)      |
|Pico (p)       |p      |×10⁻¹²|22pF (condensadores)       |

**Conversiones más frecuentes en examen:**

|Conversión|Operación  |Ejemplo                  |
|----------|-----------|-------------------------|
|kΩ → Ω    |× 1.000    |2,2kΩ = 2.200Ω           |
|MΩ → Ω    |× 1.000.000|3,5MΩ = 3.500.000Ω       |
|MΩ → kΩ   |× 1.000    |3,5MΩ = 3.500kΩ          |
|mA → A    |÷ 1.000    |20mA = 0,020A            |
|µA → A    |÷ 1.000.000|3µA = 0,000003A = 3×10⁻⁶A|
|µA → mA   |÷ 1.000    |500µA = 0,5mA            |

**Truco:** Para subir en la escalera (de mili a unidad base) DIVIDES. Para bajar (de unidad base a mili) MULTIPLICAS. Entre cada escalón × o ÷ por el factor de salto.

### 6.6 Diodo LED

```
VR = VT − VD
R = VR / I
```

VD típico LED rojo ≈ 2V, I típico ≈ 20mA

### 6.7 Método de 5 pasos (circuito mixto)

1. Calcular RT (simplificar paralelos primero)
1. Calcular IT = VT / RT
1. Mirar qué magnitud es igual (I en serie, V en paralelo)
1. Aplicar Ley de Ohm en cada R
1. Calcular P = V × I en cada R

### 6.8 Terminología de examen

Vocabulario alternativo que puede aparecer en el examen (según los apuntes de Noa):

|Término en la app|Sinónimos en examen                                                                       |
|-----------------|------------------------------------------------------------------------------------------|
|Voltaje (V)      |Tensión, Diferencia de potencial (d.d.p.), Fuerza electromotriz (f.e.m.), Caída de tensión|
|Intensidad (I)   |Corriente, Flujo de electrones                                                            |
|Resistencia (R)  |Oposición al paso de corriente                                                            |
|Potencia (P)     |Energía por unidad de tiempo                                                              |
|Energía (E)      |Se mide en J (SI) o kWh (factura)                                                         |

-----

## 7. SECCIÓN INVENTARIO

Lista completa de componentes con estado (tiene/no tiene/preparar).

Incluye checklist de preparación:

- [ ] Vaciar bolsa de resistencias y medir cada una con Venlab
- [ ] Separar en montoncitos: 220Ω, 330Ω, 470Ω, 1kΩ, 10kΩ
- [ ] Cortar 10-15 cables de ~8cm del rollo y pelar 5mm de cada punta
- [ ] Ajustar Mean Well a 10,0V usando su potenciómetro interno Vo
- [ ] Verificar los 10V con el Venlab

-----

## 8. MODO SIMULACRO DE EXAMEN 📝

### 8.1 Concepto

Accesible desde el menú principal una vez completados los módulos 1-7. Genera ejercicios aleatorios de circuitos (serie, paralelo y mixto) que Noa debe resolver usando el método de 5 pasos, **sin fase Construye** — es puramente cálculo y razonamiento, como en un examen real.

### 8.2 Generador de circuitos aleatorios

La app genera circuitos con parámetros aleatorios dentro de rangos realistas:

**Nivel 1 — Serie pura:**

- 2-4 resistencias con valores aleatorios del set {100, 220, 330, 470, 1k, 2.2k, 4.7k, 10k}Ω
- VT aleatorio del set {3, 5, 9, 10, 12}V
- Pide: RT, IT, V en cada R, P en cada R

**Nivel 2 — Paralelo puro:**

- 2-3 resistencias en paralelo
- Mismos sets de valores
- Pide: RT, IT, I en cada rama, PT

**Nivel 3 — Mixto (el del examen):**

- 1 R en serie + 2 R en paralelo (como módulo 7)
- O 2 R en serie + ese bloque en paralelo con otra R
- Pide: resolución completa con método de 5 pasos

### 8.3 Flujo de interacción

1. Noa pulsa “Generar examen”
1. Se muestra el circuito (esquema visual) + datos (valores de R, VT)
1. Se presenta la **Tabla Dinámica vacía** (como en módulo 7)
1. Noa introduce valores paso a paso:
- Paso 1: “¿RT?” → input numérico → feedback inmediato (✅/❌ con tolerancia de redondeo)
- Paso 2: “¿IT?” → input numérico
- Paso 3: “¿Qué magnitud es igual?” → selección (I o V para cada grupo)
- Paso 4: “¿V1? ¿V2? ¿I1? ¿I2?” → inputs
- Paso 5: “¿P1? ¿P2? ¿PT?” → inputs
1. Al terminar: puntuación (X/Y pasos correctos) + tabla completa como resumen
1. Botón “Otro ejercicio” para generar un circuito nuevo

### 8.4 Feedback inteligente en errores

- Si RT es incorrecto: “Revisa: ¿calculaste el paralelo primero? Recuerda: 1/R_par = 1/R2 + 1/R3”
- Si IT es incorrecto pero RT era correcto: “Tu RT está bien. IT = VT/RT = [valor]/[su RT]. ¿Te equivocaste en la división?”
- Si las unidades están mal (ej. pone 13,9 en vez de 0,0139): “¡Cuidado! 13,9mA = 0,0139A. Las unidades importan.”
- Tolerancia de redondeo: acepta ±2% en el valor final (ej. 13,9mA y 13,8mA ambos válidos)

### 8.5 Logro

**📝 “Lista para el examen”** — Se desbloquea al completar 3 simulacros con ≥80% de aciertos.

-----

## 9. SISTEMA DE GAMIFICACIÓN

### 9.1 Progreso global

- Barra/anillo de progreso en home: X/9 módulos completados
- Cada módulo tiene sub-progreso: fases completadas dentro del módulo

### 9.2 Logros (badges)

|Módulo      |Logro                 |Icono|
|------------|----------------------|-----|
|1           |“Investigadora”       |🔍    |
|2           |“Trilingüe”           |⚡    |
|3           |“Hacedora”            |💡    |
|4           |“Descifradora”        |🔎    |
|5           |“Seriéfila”           |⛓️    |
|6           |“Arquitecta paralela” |🔀    |
|7           |“Jefa final”          |🧩    |
|8           |“DJ del Voltaje”      |🎛️    |
|8 (virtual) |“Simuladora”          |🧪    |
|Proyecto    |“Hacker del Display”  |🔢    |
|Simulacro ×3|“Lista para el examen”|📝    |
|Todos       |“Ingeniera”           |🏆    |

### 9.3 Mecánicas de engagement

- **Racha de aciertos**: 3 quizzes consecutivos correctos → animación especial
- **Pistas sin penalización**: no se penaliza pedir pista, se incentiva aprender
- **Error como oportunidad**: la explicación tras un error es MÁS detallada que tras un acierto
- **Conexiones cruzadas**: cuando un concepto del módulo 5 reutiliza algo del 3, se muestra un “link” visual (”¿Recuerdas el LED? Aquí es igual pero con 3 resistencias”)
- **Celebración al completar módulo**: confeti, frase motivacional, desbloqueo del siguiente

### 9.4 Elementos NO incluidos (decisiones de diseño)

- Sin timer/countdown (genera ansiedad)
- Sin ranking/competición (es individual)
- Sin penalización por errores (el objetivo es aprender, no aprobar)
- Sin vidas/corazones (puede intentar infinitas veces)

-----

## 10. DISEÑO Y UX

### 10.1 Estética general

- **Tema oscuro** (dark mode): fondo negro/gris muy oscuro
- **Acentos de color neón**: cada módulo tiene su color signature
- **Partículas animadas** de fondo (sutiles, no distractoras)
- **Tipografía bold** para títulos, legible para cuerpo
- **Mobile-first**: diseñado para iPhone al lado de la breadboard

### 10.2 Paleta de colores por módulo

|Módulo          |Color       |Hex    |
|----------------|------------|-------|
|1 Polimetro     |Cyan        |#22d3ee|
|2 Magnitudes    |Indigo      |#818cf8|
|3 LED           |Rosa        |#f472b6|
|4 Código colores|Esmeralda   |#34d399|
|5 Serie         |Violeta     |#a78bfa|
|6 Paralelo      |Verde       |#4ade80|
|7 Mixto         |Rojo/Naranja|#f97316|
|8 Potenciómetro |Ámbar       |#fbbf24|
|Proyecto Final  |Púrpura     |#c084fc|

### 10.3 Componentes UI reutilizables

- **ModuleCard**: tarjeta en home con emoji, título, color, estado (bloqueado/en progreso/completado)
- **PhaseTab**: navegación horizontal entre las 4-5 fases de un módulo
- **TheoryBlock**: bloque con referencia a página de apuntes + texto explicativo
- **QuizCard**: pregunta + opciones + pista + feedback
- **BuildStep**: paso numerado con icono de componente
- **WarningBox**: caja amarilla de precaución
- **MeasureChecklist**: medida + valor esperado + input para valor real + **feedback de tolerancia**
- **ToleranceCalc**: componente reutilizable que recibe (valor_teórico, valor_medido) y muestra feedback con colores (verde ≤5%, amarillo 5-15%, rojo >15%) y explicación contextual
- **DynamicCircuitTable**: tabla del método de 5 pasos que se rellena progresivamente (Módulo 7 y Simulacro)
- **AchievementPopup**: overlay de logro con animación
- **FormulaCard**: fórmula en monospace + nombre + descripción
- **ProgressRing**: anillo SVG animado de progreso
- **Seg7Display**: SVG interactivo del display de 7 segmentos (ya implementado en versión anterior)
- **Seg7PinMap**: SVG del display visto desde arriba con pines clickeables → iluminan segmento correspondiente (red de seguridad proyecto final)
- **VirtualLabSlider**: slider interactivo para simuladores LDR (luz) y termistor (temperatura) con circuito animado
- **ExamGenerator**: generador de circuitos aleatorios con inputs numéricos y validación con tolerancia de redondeo

### 10.4 Navegación

- **Home** → scroll vertical con todos los módulos
- **Módulo** → tabs horizontales (Entiende / Demuestra / Construye / Comprueba)
- **Botón ←** siempre visible para volver
- **Fórmulas e Inventario** accesibles desde botones fijos en home
- No hay menú hamburguesa ni navegación compleja: es lineal y progresivo

-----

## 11. RESTRICCIONES TÉCNICAS

### 11.1 Stack tecnológico

- **Bundler**: Vite (dev server + build)
- **Framework**: React 18 (JSX, hooks)
- **Estilos**: Tailwind CSS v3 (utility-first, dark mode con clase `dark:`)
- **Componentes UI**: shadcn/ui — instalar con `npx shadcn@latest add <componente>`
  - Componentes requeridos: Card, Tabs, Progress, Badge, Button, Accordion
- **Iconos**: lucide-react
- **Animaciones**: framer-motion (opcional, para transiciones y celebraciones)
- **Sin SSR, sin router** — es una SPA de página única con estado interno

### 11.2 Estructura de archivos

```
src/
├── components/          # Componentes UI reutilizables (TheoryBlock, QuizCard, etc.)
├── modules/
│   ├── Module1.jsx      # Un archivo por módulo (~200 líneas máx)
│   ├── Module2.jsx
│   └── ...
├── sections/            # Secciones especiales (Home, FormulaSheet, Inventory, Exam)
├── hooks/
│   └── useProgress.js   # Hook centralizado para progreso + localStorage
├── data/                # Datos estáticos: preguntas de quiz, textos, constantes
├── lib/
│   └── physics.js       # Funciones de cálculo (Ohm, serie, paralelo, tolerancia)
└── App.jsx              # Componente raíz con navegación interna (estado, no router)
```

### 11.3 Almacenamiento

- **localStorage** con clave `eletrinoa-progress`
- Schema JSON:
  ```json
  {
    "moduleProgress": {
      "1": { "phases": ["entiende", "demuestra"], "completed": true },
      "2": { "phases": ["entiende"], "completed": false }
    },
    "achievements": ["investigadora", "trilingue"],
    "examScores": [{ "score": 85, "date": "2026-03-01", "level": 2 }]
  }
  ```
- El hook `useProgress` expone: `getModuleProgress()`, `completePhase()`, `unlockAchievement()`, `getExamScores()`

### 11.4 Rendimiento

- Animaciones con CSS transitions o framer-motion (no Canvas)
- SVG inline para circuitos y display 7 segmentos
- `React.lazy()` opcional para code-splitting por módulo
- Evitar re-renders innecesarios (memoización donde sea necesario)

### 11.5 Compatibilidad y despliegue

- **Mobile-first**: diseñado para iPhone Safari (pantalla primaria)
- **Dark mode**: via Tailwind `dark:` classes (theme oscuro por defecto)
- **Deploy**: Vercel (`vercel --prod`)
- **SPA**: sin server-side rendering, sin React Router
- Compatible con Chrome mobile y Safari mobile

-----

## 12. CRITERIOS DE ÉXITO

### 12.1 Para Noa (la alumna)

- Puede explicar la Ley de Ohm con la analogía del tobogán
- Resuelve un circuito mixto con el método de 5 pasos sin ayuda
- Convierte kΩ↔Ω, mA↔A y MΩ↔kΩ sin errores (escalera completa)
- Sabe calcular P=V×I y E=P×t
- Entiende cómo funcionan LDR y termistor aunque no los tenga físicamente
- Enciende al menos 3 números diferentes en el display
- Completa 3 simulacros de examen con ≥80% de aciertos
- Se siente capaz y no intimidada por la electricidad

### 12.2 Para el padre (O)

- La webapp cubre el 100% del temario de los apuntes (21 contenidos mapeados)
- Puede usarse al lado de la breadboard sin fricción
- La calculadora de tolerancia evita frustración con medidas reales
- El simulacro de examen permite practicar sin breadboard (en el coche, en el sofá…)
- Noa la abre voluntariamente, no hay que obligarla
- Sirve como material de repaso antes del examen

### 12.3 Para la implementación

- Funciona sin errores en iPhone Safari y Chrome mobile (deploy en Vercel)
- Un componente por módulo, ~200 líneas máximo cada uno
- Sin errores en consola del navegador
- Todas las interacciones son touch-friendly (botones ≥ 44px)
- El progreso persiste en localStorage entre sesiones
- Deploy con `vercel --prod`
- Componentes shadcn/ui instalados con `npx shadcn@latest add <componente>`
