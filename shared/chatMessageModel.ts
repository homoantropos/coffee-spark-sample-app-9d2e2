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

/**
 * Input to the chat agent.
 */
export interface ChatMessageModel {
  /**
   * Role of the message (agent or user)
   */
  role: 'user';

  /**
   * Text of the message
   */
  text: string;

  /**
   * Media attached to the message.
   */
  media?: MediaModel;
}

/**
 * Media attached to the message.
 */
export interface MediaModel {
  /**
   * Uploaded image as base64 data
   */
  base64Data: string;
  /**
   * Mime type of the image
   */
  mimeType: string;
}
