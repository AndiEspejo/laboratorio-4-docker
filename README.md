# Laboratorio 4 - Contenedores y Despliegue con Docker

Aplicacion web sencilla en **Node.js + Express** empaquetada en un contenedor Docker.
Arquitectura de Software - UdeA 2026.

## Endpoints

| Ruta | Que hace | Ejemplo |
|------|----------|---------|
| `GET /` | Mensaje de bienvenida | `http://localhost:3000/` |
| `GET /sumar?a=&b=` | Suma dos numeros | `http://localhost:3000/sumar?a=5&b=3` → `{"a":5,"b":3,"resultado":8}` |
| `GET /salud` | Revisa que el servicio este vivo | `http://localhost:3000/salud` |

## Estructura

```
laboratorio-4-docker/
├── app.js              # codigo de la app
├── package.json        # dependencias (express)
├── package-lock.json
├── Dockerfile          # instrucciones para construir la imagen
├── .dockerignore       # archivos que no se copian a la imagen
├── capturas/           # pantallazos para la entrega
└── documento-tecnico.md
```

## Correr sin Docker (opcional)

```bash
npm install
npm start
```

## Pasos con Docker

### 1. Construir la imagen

```bash
docker build -t miapp-docker:v1 .
docker images
```

### 2. Ejecutar el contenedor

```bash
docker run -d -p 3000:3000 --name miapp miapp-docker:v1
docker ps
```

`-p 3000:3000` conecta el puerto 3000 del computador con el puerto 3000 del contenedor.
Luego se abre en el navegador: http://localhost:3000

Comandos utiles:

```bash
docker logs miapp      # ver lo que imprime la app
docker stop miapp      # detener el contenedor
docker start miapp     # volver a iniciarlo
docker rm -f miapp     # borrarlo
```

### 3. Publicar en Docker Hub

Usuario de Docker Hub: `andresespejo`

```bash
docker login
docker tag miapp-docker:v1 andresespejo/miapp-docker:v1
docker push andresespejo/miapp-docker:v1
```

### 4. Probar en otro equipo

```bash
docker pull andresespejo/miapp-docker:v1
docker run -p 3000:3000 andresespejo/miapp-docker:v1
```

## Imagen vs Contenedor

- **Imagen:** la "plantilla" de solo lectura con el sistema base, Node, las dependencias y el codigo. Se crea con `docker build`.
- **Contenedor:** una instancia de esa imagen que se está ejecutando. Se crea con `docker run`. De una misma imagen se pueden sacar varios contenedores.
