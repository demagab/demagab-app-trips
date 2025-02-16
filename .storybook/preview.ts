import { applicationConfig, type Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import '!style-loader!css-loader!sass-loader!../src/styles.scss';
import { inject, provideAppInitializer } from "@angular/core";
import { provideAnimations } from '@angular/platform-browser/animations';
import { PrimeNG } from "primeng/config";
import Aura from '@primeng/themes/aura';

setCompodocJson(docJson);

function provideTheme(): void {
  const config = inject(PrimeNG);
  config.theme.set({
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  });
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideAppInitializer(provideTheme),
      ],
    }),
  ],
};

export default preview;
