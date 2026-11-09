# Balam · siete aventuras institucionales

Aplicación de MATEMATICAS - EXT SEC (889024738153), cuentas jaliscoedu.mx inscritas en el curso. Proyecto independiente del sistema Multimarcas.

## Uso

En Classroom, abrir la tarea Balam correspondiente y su enlace JUGAR Y REGISTRAR CALIFICACIÓN. Los enlaces públicos de GitHub son práctica local; no envían notas. Hay siete tareas: dos juegos de valor posicional (10 y 8 retos; tres rutas) y cinco mundos de suma y resta (6 retos cada uno; dos rutas).

El paisaje, las plataformas, los guardianes, los huecos y la historia del Templo de la Noche comparten un motor. Las preguntas conservan el banco anterior. La acción se pausa al responder. El movimiento asistido permite superar obstáculos y recoger monedas, sin modificar las respuestas matemáticas.

## Calificación

- Nota base sobre 100: aciertos al primer intento / total de retos × 100, dos decimales.
- Un error real registrado habilita monedas mayas escondidas. Hay tres identificadores únicos por mundo; algunos tienen ubicaciones alternativas en el jardín final para que un error tardío también permita recuperarse.
- Cada moneda suma +0.5 sobre 10, equivalente a +5/100. Máximo tres monedas, +15/100. Nota total máxima: 100.
- Cada moneda solo cuenta una vez. Los errores motores, caídas y guardianes no restan puntos.
- El servidor valida identidad, inscripción, secuencia, respuestas, elegibilidad para el bono, identificadores únicos y límites. La detección física de recogida se ejecuta en el navegador: es una actividad formativa, no un examen protegido contra manipulación del cliente.
- Se escribe únicamente draftGrade. El profesor revisa el cuaderno y devuelve/publica la nota.
- El resultado se envía al terminar los retos; recoger monedas después vuelve a calcular y sincronizar la nota. Si falla la conexión, el progreso queda guardado y Comprobar envío reintenta.

## Estado al 26 de octubre de 2026

Apps Script autorizado, Classroom API operativa, aplicación web versión 5 desplegada como docente y acceso limitado al dominio institucional. Siete tareas publicadas. Los datos de alumnos permanecen en propiedades privadas del proyecto, fuera del repositorio público. El acceso se deniega si no se puede verificar la identidad o la inscripción.

Validación: 54 preguntas de los dos primeros juegos comparadas con el banco original; 60 variantes aritméticas conservadas. Recorridos de plataformas asistidos en todos los niveles, obstáculos, pisotones, recuperación tardía de tres monedas, redondeo y límite100. Pruebas del servidor: identidad y rol, rutas, secuencia, tipos de respuesta numérica/construcción/comparación, reintentos idempotentes, monedas únicas y escrituras exclusivamente de draftGrade. Prueba real con cuenta docente: carga, inicio, respuesta incorrecta y corrección. Aún falta confirmar una partida completa y su nota desde una cuenta real de alumno.

Una nueva visita recupera el resultado del mismo alumno y mundo. Para una evaluación independiente en otra sesión se requiere ampliar el puente con sesiones y nuevas tareas asociadas al proyecto; duplicar manualmente una tarea no configura ese vínculo.

## Mantenimiento

Codigo.gs contiene servidor, banco, puente y cliente listos para Apps Script. appsscript.json declara permisos y Classroom v1. configurarClassroom crea/reutiliza las tareas del proyecto sin duplicarlas; publicarTareas publica los enlaces y el criterio. Las actualizaciones se despliegan como nueva versión sobre la misma implementación para conservar las URL de Classroom. No se necesitan permisos nuevos para este rediseño.

## Actualización de movimiento y vidas

Plataformas procedurales con semilla por entrada al nivel, variación de anchura, altura, separación y número de plataformas. La distribución permanece estable durante esa partida y al reaparecer. Tres corazones (seis medios corazones); cactus: medio corazón; caída o contacto lateral: un corazón. Protección de 1.8 segundos tras recibir daño. La bandera central se activa al cruzarla con la mitad de las puertas resueltas. Agotar los corazones devuelve al inicio o a la bandera central activada y repone los tres; respuestas y monedas se conservan. Los resultados académicos siguen guardándose en el servidor independientemente de las vidas. Se bloquea el desplazamiento de la página y se ajusta el escenario a la ventana; los diálogos conservan desplazamiento interno.

Validación adicional: 280 recorridos completos con semillas y mundos distintos, cactus de medio corazón, protección contra daño repetido, reinicio de vidas, reaparición en checkpoint y conservación de preguntas y monedas.

## Ruta ordenada y pantallas compactas

Los niveles se recorren así: números (dos), sumas y restas (cinco) y multiplicación (cinco). Se desbloquea el siguiente cuando se registran todas las respuestas del anterior. Se respetan los resultados existentes y la dificultad elegida se conserva al reanudar un nivel institucional. El servidor verifica los requisitos al abrir enlaces y al registrar avances, incluidas las llamadas desde pestañas antiguas. La práctica pública comprueba el progreso guardado en el navegador.

## Juego 03 · Concretando lo aprendido — Examen

El examen de valor posicional se abre después de los juegos 01 y 02. El identificador interno 12 (enlace `?nivel=13`) mantiene los enlaces anteriores. Publicar con `publicarExamenPosicional` desde la cuenta docente, después de actualizar la misma implementación web. Crea o recupera la tarea de 100 puntos en el tema 01, con enlace institucional y sin permisos nuevos. Hasta publicar la tarea, el examen no bloquea los demás niveles del curso.

Hay 12 preguntas: tres de identificación, tres de valor, tres de construcción y tres de comparación. El servidor prepara un banco por intento, registra la primera opción de cada reto y controla el plazo. Cada acierto agrega un tramo a la estela; 12/12 = 10. El tiempo limita cuántos retos se responden, pero no agrega puntos. Apoyo 210 s, normal 150 s, reto 120 s. El resultado queda en borrador en Classroom; la práctica pública puede repetirse y no envía notas. Al caducar un intento en una pestaña cerrada, el servidor finaliza y sincroniza al regresar al examen. El código se ejecuta con `python integracion-classroom/armar-examen.py` para actualizar el paquete `Codigo.gs`.

Para próximos temas, se puede reutilizar la arena y la validación con un banco y una tarea independientes para cada examen. Mantener por separado la nota académica y cualquier bonificación de velocidad.
