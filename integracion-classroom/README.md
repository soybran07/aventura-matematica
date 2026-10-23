# Calificaciones institucionales de Balam

Implementación para MATEMATICAS - EXT SEC, curso 889024738153. Usa cuentas de jaliscoedu.mx inscritas en el curso. El juego público de GitHub permanece como práctica; la evaluación se abre desde las tareas creadas por esta aplicación web.

## Criterio

Cada mundo tiene seis retos. La nota sobre 100 es 100 × aciertos al primer intento / 6, redondeada a dos decimales. Los intentos y las pistas se registran por separado. No se califica la habilidad de movimiento. La primera ruta iniciada se conserva durante la evaluación. El profesor revisa el cuaderno y publica la nota final.

El servidor verifica la cuenta de Google y la inscripción, valida respuestas y secuencia y conserva los resultados en las propiedades privadas del proyecto. No acepta identidades ni calificaciones proporcionadas por el navegador. Solo escribe `draftGrade`, nunca `assignedGrade`. Los resultados de vista docente no se envían como notas de estudiantes.

## Instalación

1. Crear un proyecto independiente de Apps Script con la cuenta docente institucional. Copiar `Codigo.gs` y `appsscript.json` completos. El paquete contiene servidor, banco de problemas y cliente de evaluación; no se necesitan archivos HTML adicionales.
2. Revisar y autorizar los permisos de correo, lectura de cursos e inscripción y administración de actividades/calificaciones. Se usa el servicio avanzado Classroom v1 para habilitar la API en el proyecto predeterminado.
3. Ejecutar `configurarClassroom` desde el editor. Crea cinco tareas en borrador desde este proyecto, requisito de Google para que luego pueda calificarlas.
4. Implementar como **Aplicación web**, ejecutar como **el propietario docente**, acceso **solo al dominio institucional**. No usar acceso anónimo. Si la organización bloquea la API o las aplicaciones web, se requiere habilitación del administrador escolar.
5. Ejecutar `publicarTareas` después de la implementación. Agrega el enlace de la aplicación y publica las cinco tareas. Los materiales anteriores con enlaces de GitHub se conservan como práctica.
6. Inscribir alumnos y probar con una cuenta institucional de alumno y otra de profesor. Si no se puede verificar el correo, se deniega el acceso; no se sustituye con un correo escrito por el usuario.

## Estado de validación

Pruebas locales: identidad vacía y externa rechazadas; cuenta no inscrita rechazada; un alumno no puede configurar tareas; secuencia y respuestas validadas; intentos conservados; reenvío idempotente; cinco notas de 66.67/100 calculadas correctamente; solo borradores; vista docente sin escritura de notas.

Pendiente hasta completar la autorización: habilitación de API, despliegue institucional y prueba real de envío a Classroom. No se han creado notas reales durante las pruebas.

## Archivos de mantenimiento

`Codigo.gs` es el paquete listo para copiar. `servidor.gs`, `bridge.js` y `cliente-evaluacion.js` son fuentes de desarrollo locales; el banco proviene de `sumas/datos.js`. El aspecto del juego se carga desde un commit fijo del repositorio público, sin enviar datos de estudiantes a GitHub.
