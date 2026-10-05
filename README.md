# Proyecto Venta — Dominio, Contrato de API y Modelo de Datos

Proyecto de práctica: arquitectura hexagonal (DDD) en NestJS, con doble implementación de persistencia (TypeORM / Prisma, intercambiables) y Unit of Work para transacciones multi-repositorio. El dominio es intencionalmente chico — el objetivo es la arquitectura, no la complejidad de negocio.

Sin autenticación, sin usuarios. Solo backend (controllers pensados para ser consumidos por tests / un cliente HTTP cualquiera).

**Base de datos: PostgreSQL** (vía Docker Compose), no SQLite. Esto es relevante porque cambia alguna decisión del schema respecto a lo que veníamos haciendo en el proyecto de alquiler (más abajo, sección 5, el porqué).

---

## 1. Entidades

| Entidad | Rol |
|---|---|
| **Categoria** | Agrupa productos. No tiene jerarquía ni comportamiento propio más allá de agrupar. |
| **Producto** | Pertenece a una Categoria. Tiene soft delete (activo/inactivo). |
| **Venta** | Aggregate root. Contiene una o más líneas de `DetalleVenta`. Inmutable una vez creada. |
| **DetalleVenta** | Entidad hija de `Venta` — **no tiene repositorio propio**, se persiste siempre junto con su `Venta`. |

---

## 2. Reglas de negocio

### Categoria
1. `nombre` es único.
2. No se puede eliminar una categoría que tenga **al menos un producto asociado** (activo o inactivo) — se valida contra el repositorio de `Producto`, por eso es un *process* cruzado, no una regla que viva solo dentro del módulo `categoria`.

### Producto
3. Pertenece a **exactamente una** Categoria (FK obligatoria, no nullable).
4. `nombre` es único.
5. Nace con `activo = true`.
6. **No existe DELETE físico.** "Eliminar" un producto es lógico: pasa a `activo = false` (soft delete). La fila nunca se borra.
7. Un producto inactivo se puede reactivar (`activo = true` de nuevo) — operación inversa, mismo mecanismo.
8. No se puede vender (agregar como línea de una Venta) un producto **inactivo**.

### Venta / DetalleVenta
9. Una Venta debe tener **al menos un** `DetalleVenta` — no se permite una venta vacía.
10. La `cantidad` de cada línea debe ser **mayor a cero**.
11. El `precioUnitario` de cada línea es un **snapshot** del precio del producto en el momento de la venta — no se recalcula después, aunque el precio del producto cambie más adelante. Esto es intencional: una venta ya hecha no debe cambiar de valor retroactivamente si el producto se reprecia.
12. `subtotal` de cada línea = `cantidad × precioUnitario`. `total` de la Venta = suma de los `subtotal` de todas sus líneas.
13. Una Venta, una vez creada, es **inmutable** — no hay endpoint de edición ni de borrado. Refleja la realidad de negocio: no se "edita" una venta ya facturada.

---

## 3. Procesos transaccionales (`processes/`)

Estas son las operaciones que cruzan más de un repositorio y por lo tanto necesitan Unit of Work (atomicidad real: o se aplican todos los cambios, o ninguno).

### `CrearVentaUseCase`
Toca `IProductoRepository` **y** `IVentaRepository` en la misma transacción:
1. Por cada línea del request, busca el `Producto` por id. Si no existe → `ProductoNotFoundException`.
2. Si el producto existe pero está inactivo → `ProductoInactivoException`.
3. Calcula `precioUnitario` (= precio actual del producto, capturado ahora) y `subtotal` por línea.
4. Calcula el `total` de la Venta.
5. Crea `Venta` + sus `DetalleVenta` en una sola operación.

### `EliminarCategoriaUseCase`
Toca `ICategoriaRepository` **y** `IProductoRepository`:
1. Busca la categoría. Si no existe → `CategoriaNotFoundException`.
2. Cuenta productos asociados vía `IProductoRepository`. Si hay al menos uno → `CategoriaConProductosException`.
3. Elimina la categoría (esta sí es un DELETE físico — una categoría sin productos no tiene nada que perder guardado).

El resto de las operaciones (alta/baja/modificación/consulta simples) viven dentro de su propio módulo, sin necesidad de `processes/`, porque solo tocan un repositorio.

---

## 4. Contrato de API

Todas las respuestas de error siguen el formato ya establecido en el proyecto hermano (`alquiler-equipos`):
```json
{ "statusCode": 404, "message": "..." }
```

### 4.1 Categorías — `/categorias`

| Método | Ruta | Body | Respuesta éxito | Errores |
|---|---|---|---|---|
| POST | `/categorias` | `{ "nombre": string }` | `201` → `Categoria` | `409` nombre duplicado |
| GET | `/categorias` | — | `200` → `Categoria[]` | — |
| GET | `/categorias/:id` | — | `200` → `Categoria` | `404` no existe |
| PATCH | `/categorias/:id` | `{ "nombre"?: string }` | `200` → `Categoria` | `404` no existe · `409` nombre duplicado |
| DELETE | `/categorias/:id` | — | `200` → `Categoria` (la borrada) | `404` no existe · `409` tiene productos asociados |

**Forma de `Categoria`:**
```json
{ "id": 1, "nombre": "Bebidas", "creadoEn": "2026-10-03T00:00:00.000Z" }
```

### 4.2 Productos — `/productos`

| Método | Ruta | Body | Respuesta éxito | Errores |
|---|---|---|---|---|
| POST | `/productos` | `{ "nombre": string, "precio": number, "categoriaId": number }` | `201` → `Producto` | `404` categoría no existe · `409` nombre duplicado |
| GET | `/productos?activo=true\|false` (query opcional) | — | `200` → `Producto[]` | — |
| GET | `/productos/:id` | — | `200` → `Producto` | `404` no existe |
| PATCH | `/productos/:id` | `{ "nombre"?: string, "precio"?: number, "categoriaId"?: number }` | `200` → `Producto` | `404` no existe (producto o categoría nueva) · `409` nombre duplicado |
| PATCH | `/productos/:id/inactivar` | — | `200` → `Producto` (con `activo: false`) | `404` no existe · `409` ya estaba inactivo |
| PATCH | `/productos/:id/activar` | — | `200` → `Producto` (con `activo: true`) | `404` no existe · `409` ya estaba activo |

**Forma de `Producto`:**
```json
{
  "id": 1,
  "nombre": "Coca-Cola 500ml",
  "precio": 1200.5,
  "activo": true,
  "categoriaId": 1,
  "creadoEn": "2026-10-03T00:00:00.000Z"
}
```

### 4.3 Ventas — `/ventas`

| Método | Ruta | Body | Respuesta éxito | Errores |
|---|---|---|---|---|
| POST | `/ventas` | `{ "detalles": [{ "productoId": number, "cantidad": number }] }` | `201` → `Venta` | `400` sin detalles o cantidad ≤ 0 · `404` algún producto no existe · `409` algún producto inactivo |
| GET | `/ventas` | — | `200` → `Venta[]` | — |
| GET | `/ventas/:id` | — | `200` → `Venta` | `404` no existe |

**Forma de `Venta`:**
```json
{
  "id": 1,
  "fecha": "2026-10-03T00:00:00.000Z",
  "total": 3601.5,
  "detalles": [
    { "id": 1, "productoId": 1, "cantidad": 3, "precioUnitario": 1200.5, "subtotal": 3601.5 }
  ]
}
```

Notá que no hay `PATCH` ni `DELETE` para `/ventas` — regla de negocio #13.

---

## 5. Infraestructura: PostgreSQL vía Docker Compose

### `docker-compose.yaml`

Va en la **raíz del proyecto**, al lado de `package.json`.

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: venta-hexagonal-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: venta_user
      POSTGRES_PASSWORD: venta_pass
      POSTGRES_DB: venta_hexagonal
    ports:
      - "5432:5432"
    volumes:
      - venta_hexagonal_data:/var/lib/postgresql/data

volumes:
  venta_hexagonal_data:
```

Levantala con:
```bash
docker compose up -d
```

Notas rápidas:
- El volumen nombrado (`venta_hexagonal_data`) persiste los datos entre `docker compose down` / `up`. Si querés arrancar de cero, `docker compose down -v` (el `-v` borra también el volumen).
- Puerto `5432` expuesto al host — si ya tenés otro Postgres corriendo ahí (por otro proyecto, por ejemplo `kiosco-branca`), cambiá el mapeo a algo como `"5433:5432"` y ajustá el `DATABASE_URL` acorde.
- `restart: unless-stopped` para que el contenedor vuelva solo si reiniciás la máquina, sin tener que acordarte de levantarlo a mano cada vez.

### `.env` en la raíz

```
DATABASE_URL="postgresql://venta_user:venta_pass@localhost:5432/venta_hexagonal?schema=public"
```

Esta misma variable la van a leer **tanto Prisma como TypeORM** (cada uno la parsea a su manera — Prisma la toma tal cual en el `datasource`, TypeORM normalmente la desglosás o usás `url: process.env.DATABASE_URL` directo en el `TypeOrmModule.forRoot(...)`).

---

## 6. Modelo de datos — `prisma/schema.prisma`

Este archivo va en la **raíz del proyecto** (no dentro de `src/`) — es donde la CLI de Prisma lo busca por defecto.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Categoria {
  id        Int        @id @default(autoincrement())
  nombre    String     @unique
  creadoEn  DateTime   @default(now())
  productos Producto[]

  @@map("categorias")
}

model Producto {
  id            Int            @id @default(autoincrement())
  nombre        String         @unique
  precio        Decimal        @db.Decimal(10, 2)
  activo        Boolean        @default(true)
  creadoEn      DateTime       @default(now())
  categoriaId   Int
  categoria     Categoria      @relation(fields: [categoriaId], references: [id])
  detallesVenta DetalleVenta[]

  @@map("productos")
}

model Venta {
  id       Int            @id @default(autoincrement())
  fecha    DateTime       @default(now())
  total    Decimal        @db.Decimal(10, 2)
  detalles DetalleVenta[]

  @@map("ventas")
}

model DetalleVenta {
  id             Int      @id @default(autoincrement())
  ventaId        Int
  venta          Venta    @relation(fields: [ventaId], references: [id])
  productoId     Int
  producto       Producto @relation(fields: [productoId], references: [id])
  cantidad       Int
  precioUnitario Decimal  @db.Decimal(10, 2)
  subtotal       Decimal  @db.Decimal(10, 2)

  @@map("detalles_venta")
}
```

Y después de crear/editar el schema, cada vez:
```bash
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
```

### Notas de diseño sobre el schema

- **`precio`/`total`/`subtotal` ahora como `Decimal`, no `Float`.** Esto es un cambio real respecto a lo que veníamos haciendo en SQLite: `Decimal` de Prisma **sí está soportado sobre Postgres** (no lo estaba sobre SQLite, por eso en el proyecto de alquiler usábamos `Float`/`number` a secas). Para dinero, `Decimal` es la decisión correcta — evita los errores de redondeo de punto flotante que `Float`/`number` de JS sí tienen (ej: `0.1 + 0.2 !== 0.3`). El `@db.Decimal(10, 2)` fija precisión 10 (dígitos totales) y escala 2 (decimales) — alcanza de sobra para precios de un comercio.
- **Ojo con el tipo en TypeScript**: Prisma mapea `Decimal` al tipo `Prisma.Decimal` (una clase propia, no un `number` nativo de JS) — para operar con él (sumar, multiplicar) usás sus métodos (`.plus()`, `.times()`, `.toNumber()`) en vez de operadores aritméticos directos. Esto lo vas a tener que manejar en el mapper al convertir entre el modelo de Prisma y tu Value Object de dominio (`Cost`, o como lo llames en este proyecto) — ahí sí podés guardar el valor interno como `number` si tu dominio no necesita precisión arbitraria, con `.toNumber()` al leer y pasando el `number` de nuevo al crear/actualizar (Prisma lo acepta y lo convierte).
- **Lo mismo aplica para TypeORM**: la columna equivalente ahí es `@Column('decimal', { precision: 10, scale: 2 })` — pero TypeORM por default devuelve los `decimal` como `string` (no `number`), por una razón similar a la de Prisma (evitar pérdida de precisión silenciosa). Vas a necesitar parsear ese `string` a `number` en el mapper, o configurar un `transformer` en la columna para que lo haga automático.
- **Nombre de modelo vs. nombre de tabla**: usé `@@map(...)` para que la tabla real en SQL tenga nombre en minúsculas con snake_case (`detalles_venta`), mientras el modelo de Prisma (y el tipo TypeScript generado) queda en PascalCase (`DetalleVenta`) — es la convención más común en proyectos Prisma.
- Acordate del alias al importar en el mapper: `import { Producto as ProductoPrismaModel } from '@prisma/client'` — mismo nombre que tu clase de dominio.

---

## 7. Dependencias — instalación con `pnpm`

Un solo comando para todo lo que vas a necesitar (asumiendo que ya hiciste `nest new` y tenés el esqueleto de Nest con sus dependencias base):

```bash
pnpm add @nestjs/config @nestjs/typeorm typeorm pg @prisma/client class-validator class-transformer
pnpm add -D prisma @types/pg
```

Qué es cada cosa y por qué está:

| Paquete | Para qué |
|---|---|
| `@nestjs/config` | Carga el `.env` (`ConfigModule.forRoot()`) y te da `ConfigService` para leer `DATABASE_URL` tipado, en vez de `process.env.DATABASE_URL` pelado por todos lados. |
| `@nestjs/typeorm` | El wrapper de Nest sobre TypeORM — te da `TypeOrmModule.forRoot(...)` / `.forFeature(...)` e inyección de `Repository<T>` vía DI. |
| `typeorm` | El ORM en sí. |
| `pg` | El driver de PostgreSQL que usa TypeORM por debajo (sin esto, `type: 'postgres'` en `TypeOrmModule.forRoot` no tiene con qué conectarse). |
| `@types/pg` (dev) | Tipos de TypeScript para `pg` — el paquete `pg` es JS puro, no trae sus propios `.d.ts`. |
| `@prisma/client` | El cliente generado que vas a importar en tu `PrismaService` (`import { PrismaClient } from '@prisma/client'`) — se regenera con `prisma generate` cada vez que cambiás el schema. |
| `prisma` (dev) | La **CLI** de Prisma (`migrate`, `generate`, `studio`) — va como dev dependency porque no se usa en runtime, solo durante desarrollo/build. |
| `class-validator` | Decoradores (`@IsString()`, `@IsInt()`, `@Min()`, etc.) para validar los DTOs de entrada en los controllers. |
| `class-transformer` | Lo que usa Nest internamente (junto al `ValidationPipe`) para transformar el JSON crudo del body en una instancia de clase del DTO antes de validarla — sin esto, `class-validator` no tiene instancias de clase sobre las que correr los decoradores. |

**No hace falta `@nestjs/mapped-types`** salvo que quieras usar `PartialType()` para generar los DTOs de `PATCH` a partir de los de `POST` (te ahorra repetir campos opcionales a mano) — si querés esa comodidad: `pnpm add @nestjs/mapped-types`.

**Sobre el `ValidationPipe` global**: una vez instalados `class-validator`/`class-transformer`, no te olvides de activarlo en `main.ts`:
```ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
```
`whitelist`/`forbidNonWhitelisted` para que propiedades no declaradas en el DTO sean rechazadas (seguridad básica), `transform: true` para que los parámetros de ruta/query lleguen ya convertidos al tipo declarado (ej. `:id` como `number`, no `string`).

---

## 8. Qué falta decidir (para cuando te pongas a codear)

- [ ] Nombre del proyecto / repo.
- [ ] Qué ORM arrancás implementando primero (recomiendo TypeORM primero, ya tenés el patrón fresco del proyecto de alquiler; Prisma después, comparando).
- [ ] Si vas a mantener las dos implementaciones vivas en el mismo repo desde el día uno, o las vas armando una por vez.