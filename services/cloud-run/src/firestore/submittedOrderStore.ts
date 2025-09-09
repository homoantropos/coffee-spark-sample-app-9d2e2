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

import { FieldValue, Firestore, Timestamp } from '@google-cloud/firestore';
import { BeverageModel } from '@ai-barista/shared';
import { beverageConverter } from './beverageConverter';

/**
 * @class SubmittedOrderSTore
 * @classdesc Manages final order submissions to Firestore.
 */
export class SubmittedOrderStore {
  private readonly firestore = new Firestore();

  /**
  * Offset in the future in milliseconds when the saved record should expire and get deleted.
  */
  private readonly expirationOffset = 12 * 60 * 60 * 1000; // 12 hours.

  /**
   * Name of the collection in Firestore where orders are stored.
   */
  private readonly collectionName = 'submittedOrders';

  /**
   * Name of collection inside the user's document where orders are stored.
   */
  private readonly subCollectionName = 'orders';

  /**
   * ID of the user who submitted the order.
   */
  private userId: string

  constructor(userId: string) {
    this.userId = userId
  }

  /**
   * 
   * @param name Name for the order
   * @param beverages List of beverages
   * @returns ID of the document reference that was stored in Firestore.
   */
  async submitOrder(name: string, beverages: BeverageModel[]): Promise<string> {
    const expirationTime = Timestamp.fromMillis(new Date().getTime() + this.expirationOffset);

    // Set up a collection under the user's ID.
    const userCollection = this.firestore
      .collection(this.collectionName)
      .doc(this.userId);

    // Set the expiration time for the entire user collection
    await userCollection.set({
      expiresAt: expirationTime
    }, { merge: true });

    // Convert beverages into a data structure for Firestore.
    const convertedBeverages = beverageConverter.toFirestore(beverages);

    // Add the order.
    const docRef = await userCollection
      .collection(this.subCollectionName)
      .add({
        name: name,
        beverages: convertedBeverages,
        expiresAt: expirationTime,
        submittedAt: FieldValue.serverTimestamp()
      });

    return docRef.id;
  }
}