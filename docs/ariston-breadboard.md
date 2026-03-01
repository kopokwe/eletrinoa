# Breadboard Ariston — Referencia Tecnica

## Layout

```
            [  ]  <-- Muesca superior
      ________________________
     |        ARISTON         |
     |                        |
     | L  K J I H G    F E D C B  A |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
   --| .  . . . . . |  . . . . .  . | 5
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . | 10
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
   --| .  . . . . . |  . . . . .  . | 15
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . | 20
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
   --| .  . . . . . |  . . . . .  . | 25
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . | 30
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
   --| .  . . . . . |  . . . . .  . | 35
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . | 40
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
     | .  . . . . . |  . . . . .  . |
   --| .  . . . . . |  . . . . .  . | 45
     | .  . . . . . |  . . . . .  . |
     | L  K J I H G    F E D C B  A |
     |________________________|
            [      ]
```

## Estructura

- **Columnas**: A a L (12 columnas total)
- **Filas**: 1 a ~46
- **Canal central**: Separa lado izquierdo (G–L) del derecho (A–F)
- **Conectores laterales**: Pestanas para encastrar otras placas en filas 5, 15, 25, 35, 45

## Buses de alimentacion

| Columna | Posicion | Funcion |
|---------|----------|---------|
| **A** | Borde derecho | Bus de alimentacion (+V) |
| **L** | Borde izquierdo | Bus de alimentacion (−) |

## Conexiones internas

- **Lado derecho** (por fila): B, C, D, E, F estan conectados entre si (5 agujeros por fila)
- **Lado izquierdo** (por fila): G, H, I, J, K estan conectados entre si (5 agujeros por fila)
- **Columna A**: Bus continuo de alimentacion (no conectado a B–F por filas)
- **Columna L**: Bus continuo de alimentacion (no conectado a G–K por filas)
- **Canal central**: Aislamiento total entre lado izquierdo y derecho

## Uso en Eletrinoa

```
Columna A → Cable rojo Mean Well (+10V)
Columna L → Cable negro Mean Well (−)
Circuitos → Columnas B–F (derecha) y G–K (izquierda), filas 1–46
```

Para conectar +V a un circuito: cable desde columna A a la fila necesaria.
Para conectar − a un circuito: cable desde columna L a la fila necesaria.

## Diferencias vs breadboard moderna

| Aspecto | Moderna (ej. MB-102) | Ariston |
|---------|---------------------|---------|
| Buses | Tiras rojas/azules laterales | Columnas A y L |
| Columnas senal | a–e, f–j (10) | B–F, G–K (10) |
| Filas | ~30 | ~46 |
| Letras | Minusculas | Mayusculas |
| Encastre | No | Pestanas laterales |
