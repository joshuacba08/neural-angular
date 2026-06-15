# HU-001 — Crear Theme Provider mínimo y validar tokens en Playground

## Contexto

El repositorio `neural-angular` ya existe.

Ya se completó y comiteó la primera base de `@neural/angular-ui`, incluyendo:

* Estructura inicial de `packages/ui`.
* CSS token foundation.
* Theme CSS entries.
* Dark theme.
* Light theme placeholder.
* Angular Material CSS variable mapping.
* Compatibility layer `--nn-*`.
* Metadata TypeScript de tokens.
* Documentación inicial.

Ahora necesitamos validar que la fundación visual funciona dentro de una app Angular real.

Esta HU debe crear un primer mecanismo mínimo de theme provider y una app/playground simple que consuma los estilos de `@neural/angular-ui`.

No implementar todavía componentes del UI kit como `NButton`, `NCard`, `NBadge`, `NChip`, etc.

---

## Historia de Usuario

Como desarrollador de Neural Angular,
quiero tener un Theme Provider mínimo y un playground Angular que consuma los tokens del paquete `@neural/angular-ui`,
para validar visualmente la base de diseño antes de empezar a implementar componentes reales.

---

## Objetivo principal

Crear una validación real y funcional de la fundación visual de `@neural/angular-ui`.

Al terminar esta HU debe existir:

1. Un provider mínimo para configurar el tema.
2. Una API simple para usar dark/light/system.
3. Un playground Angular que importe los estilos del paquete UI.
4. Una página visual que muestre tokens, superficies, texto, bordes, gradientes y estados.
5. Validación de que el paquete puede ser consumido desde una app Angular del monorepo.

---

## Alcance incluido

### 1. Crear Theme Provider mínimo en `packages/ui`

Crear una carpeta:

```txt
packages/ui/src/theme/
```

Con una estructura similar:

```txt
packages/ui/src/theme/
├─ index.ts
├─ theme-config.ts
├─ theme-provider.ts
└─ theme.types.ts
```

La API pública debe ser pequeña.

Ejemplo deseado:

```ts
import { provideNeuralTheme } from '@neural/angular-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNeuralTheme({
      defaultTheme: 'dark',
      storage: false
    })
  ]
};
```

Tipos mínimos:

```ts
export type NeuralThemeName = 'dark' | 'light' | 'system';

export interface NeuralThemeConfig {
  defaultTheme?: NeuralThemeName;
  storage?: boolean;
  storageKey?: string;
}
```

El provider debe:

* Ser compatible con Angular standalone.
* No depender de Angular Material todavía.
* No depender de GSAP.
* No manipular DOM durante SSR de forma insegura.
* Aplicar el tema usando `data-n-theme` en el documento solo en browser.
* Usar `DOCUMENT` desde Angular cuando sea necesario.
* Proteger cualquier acceso a `document`, `window`, `localStorage` o `matchMedia`.
* Ser minimalista.

Importante: si el workspace todavía no tiene Angular correctamente configurado para compilar librerías, adaptar la implementación de forma limpia sin meter hacks.

---

### 2. Crear servicio mínimo de theme

Crear un servicio simple, por ejemplo:

```txt
packages/ui/src/theme/theme.service.ts
```

O integrar la lógica en `theme-provider.ts` si queda más limpio.

Debe permitir:

```ts
setTheme(theme: NeuralThemeName): void;
getTheme(): NeuralThemeName;
```

Opcionalmente puede exponer signal si el proyecto ya usa Angular moderno:

```ts
readonly theme = signal<NeuralThemeName>('dark');
```

Reglas:

* Mantener API pequeña.
* No agregar features innecesarias.
* No crear todavía sistema avanzado de múltiples temas.
* No crear animaciones.
* No crear gestor de preferencias complejo.

---

### 3. Exportar theme API desde el paquete UI

Actualizar:

```txt
packages/ui/src/index.ts
packages/ui/src/theme/index.ts
```

Para que se pueda importar:

```ts
import {
  provideNeuralTheme,
  NeuralThemeService,
  type NeuralThemeConfig,
  type NeuralThemeName
} from '@neural/angular-ui';
```

Si por estructura del build es mejor exportar desde:

```ts
@neural/angular-ui/theme
```

también se puede preparar, pero mantener la raíz funcionando.

---

### 4. Crear o preparar `apps/playground`

Crear o configurar una app Angular mínima en:

```txt
apps/playground
```

Si ya existe, reutilizarla.

La app debe:

* Ser Angular standalone.
* Importar los estilos de `@neural/angular-ui`.
* Usar `provideNeuralTheme`.
* Mostrar una página de validación visual de tokens.
* No implementar componentes del UI kit todavía.

Si el workspace fue creado con Nx, usar generadores Nx adecuados si están disponibles.

Si no hay plugin Angular configurado, revisar la configuración existente y elegir la forma más limpia de crear la app sin romper el monorepo.

No instalar dependencias innecesarias.

---

### 5. Importar estilos globales del paquete UI en Playground

El playground debe consumir:

```css
@import "@neural/angular-ui/styles";
```

O, si los path aliases todavía no están listos:

```css
@import "../../../packages/ui/src/styles/index.css";
```

Preferir el import por paquete si el workspace lo permite.

Si se necesita ajustar `tsconfig.base.json` para path alias, hacerlo de forma limpia:

```json
{
  "compilerOptions": {
    "paths": {
      "@neural/angular-ui": ["packages/ui/src/index.ts"],
      "@neural/angular-ui/tokens": ["packages/ui/src/tokens/index.ts"]
    }
  }
}
```

Si se agrega alias para styles, documentar la decisión.

---

### 6. Crear página visual de validación

En el playground crear una vista simple, por ejemplo:

```txt
apps/playground/src/app/pages/token-preview/
```

o directamente en `app.component`.

Debe mostrar:

* Background canvas.
* Surface 1, 2, 3, 4.
* Text levels 1, 2, 3, 4.
* Primary, secondary, tertiary colors.
* Status colors: success, warning, danger, info.
* Border levels.
* Radius examples.
* Gradient examples.
* Elevation examples.
* Glow examples.
* Typography examples.
* Spacing scale básica.
* Un toggle simple dark/light/system si es viable.

Importante:

* Esto no debe usar `NButton` ni `NCard`, porque todavía no existen.
* Usar HTML normal con clases demo dentro del playground.
* Las clases demo deben vivir dentro del playground, no dentro del paquete UI.
* El paquete UI solo debe proveer tokens y theme API.

---

### 7. Crear estilos demo solo en playground

Crear estilos propios del playground, por ejemplo:

```txt
apps/playground/src/app/app.component.scss
```

o equivalente.

Estos estilos pueden usar tokens:

```css
.preview-card {
  background: var(--n-surface-1);
  color: var(--n-text-1);
  border: 1px solid var(--n-border-1);
  border-radius: var(--n-radius-lg);
}
```

No mover estos estilos demo a `packages/ui`.

---

### 8. Actualizar documentación

Actualizar:

```txt
docs/ui/getting-started.md
docs/ui/implementation-plan.md
packages/ui/README.md
```

Debe quedar documentado:

* Cómo importar estilos.
* Cómo usar `provideNeuralTheme`.
* Cómo aplicar `data-n-theme`.
* Que el playground valida tokens.
* Que todavía no existen componentes reales.

Ejemplo de documentación esperada:

```ts
import { provideNeuralTheme } from '@neural/angular-ui';

export const appConfig = {
  providers: [
    provideNeuralTheme({
      defaultTheme: 'dark'
    })
  ]
};
```

```css
@import "@neural/angular-ui/styles";
```

---

## Fuera de alcance

No hacer en esta HU:

* No crear `NButton`.
* No crear `NCard`.
* No crear `NIcon`.
* No crear `NBadge`.
* No crear `NChip`.
* No crear layouts.
* No crear SSR package.
* No crear CLI.
* No crear schematics.
* No crear adapters.
* No integrar GSAP.
* No integrar Lucide todavía.
* No crear Angular Material theme avanzado.
* No migrar todos los HTML del design system.
* No copiar componentes del export original.

---

## Consideraciones SSR

El Theme Provider debe ser seguro para SSR.

Cualquier acceso a APIs de navegador debe estar protegido:

```txt
document
window
localStorage
matchMedia
```

Usar estrategias como:

* `isPlatformBrowser`.
* `inject(PLATFORM_ID)`.
* `DOCUMENT`.
* Guards internos.
* No ejecutar lógica browser-only en server.

El server no debe romper si el provider se registra en una app SSR futura.

---

## Criterios de aceptación

La HU estará completa cuando:

1. Exista una API mínima `provideNeuralTheme`.
2. Exista tipo `NeuralThemeName`.
3. Exista tipo `NeuralThemeConfig`.
4. Exista un servicio o mecanismo mínimo para aplicar tema.
5. El tema se aplique usando `data-n-theme`.
6. El acceso a browser APIs esté protegido.
7. `@neural/angular-ui` exporte la API de theme.
8. Exista `apps/playground` como app Angular funcional o preparada correctamente según el workspace.
9. El playground importe los estilos de `@neural/angular-ui`.
10. El playground muestre una vista visual de tokens.
11. La vista use tokens reales `--n-*`.
12. No se hayan creado componentes UI reales todavía.
13. No se hayan instalado dependencias innecesarias.
14. La documentación haya sido actualizada.
15. El build/check disponible en el repo pase, o se explique claramente por qué todavía no aplica.

---

## Validación manual esperada

Poder correr el playground con el comando correspondiente del workspace, por ejemplo:

```bash
pnpm nx serve playground
```

o el comando real que aplique según la configuración actual.

En el navegador debe verse una página tipo:

```txt
Neural Angular Playground
Token Preview
Theme: dark / light / system
Color Tokens
Surface Tokens
Text Tokens
Gradient Tokens
Elevation Tokens
```

---

## Resultado esperado al finalizar

Al final, entregar resumen con:

```txt
Files created
Files updated
Theme API created
Playground route/page created
How to run playground
SSR guards implemented
Known limitations
Recommended next HU
```

La siguiente HU recomendada debe ser:

```txt
HU-002 — Crear NButton y NCard como primeros componentes reales del UI kit
```

---

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add theme provider and token playground"
```
