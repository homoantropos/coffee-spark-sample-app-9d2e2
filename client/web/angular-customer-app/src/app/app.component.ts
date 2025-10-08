/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AI, getAI, getGenerativeModel, GoogleAIBackend } from '@angular/fire/ai'
import { initializeApp } from '@angular/fire/app'
import { AiButtonComponent } from './ai-button/ai-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    LoginComponent,
    AiButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly viewCodeLink = environment.viewCodeLink;
  readonly viewCodeMessage = environment.viewCodeMessage;

  fbApp;

  constructor() {
    this.fbApp = initializeApp(environment.firebase);

    const ai = getAI(this.fbApp, { backend: new GoogleAIBackend() });

    const model = getGenerativeModel(ai, { model: "gemini-2.5-flash-lite" });

    const prompt = "Write a story about a magic backpack."

    model.generateContent(prompt).then(result => {
      const response = result.response;

      const text = response.text();

      console.log('TEXT: ', text);
    });
  }
}
