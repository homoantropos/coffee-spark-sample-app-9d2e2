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

import { Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatbotComponent,
  },
  // {
  //   path: 'order',
  //   component: OrderpageComponent,
  // },
  // { path: '/config.html', redirectTo: '/config.html'},
  // { path: '/config', redirectTo: '/config.html'},
  { path: '**', redirectTo: '/chat' },
];
