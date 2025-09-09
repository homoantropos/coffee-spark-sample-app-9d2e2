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

interface Recommendation {
    name: string;
    modifiers: string[];
}

const defaultRecommendation = {
    name: 'Mocha',
    modifiers: ['double shots', 'chocolate sauce']
};

/**
 * Load the recommendation from the recommendation service.
 * 
 * This demonstrates how a tool call can access external services, such as a HTTP endpoint.
 */
// async function loadRecommendation(): Promise<Recommendation | undefined> {
//     console.info('Loading recommendation from service');
//     try {
//         const response = await fetch(`${process.env["LOCAL_RECOMMENDATION_SERVICE"]}/recommendation`);
//         if (response.ok) {
//             const result = await response.json();
//             return { name: result.name, modifiers: result.modifiers };
//         } else {
//             console.warn('Could not access local recommendation service.', { response: response });
//         }
//     } catch (error) {
//         console.error('Error loading recommendation from service.', { error: error });
//     }
//     return;
// }

export const getBaristaRecommendation = (
    drink: string,
    modifiers: string[] = []
  ): Recommendation => {
    console.info('[get_barista_recommendation]', {
      drink: drink,
      modifiers: modifiers,
    });

    const recommendation: Recommendation = {
        name: drink ?? defaultRecommendation.name,
        modifiers: modifiers ?? defaultRecommendation.modifiers,
      };
    
      console.info('[get_barista_recommendation] Returning barista recommendation.', {
        recommendation: recommendation,
      });

    // if (process.env["LOCAL_RECOMMENDATION_SERVICE"]) {
    //     recommendation = await loadRecommendation();
    // }
    // // Fall back to the default recommendation if it could not be loaded.
    // if (!recommendation) {
    //     recommendation = defaultRecommendation;
    //     console.warn('[get_barista_recommendation] Falling back to local recommendation');
    // }
    console.info('[get_barista_recommendation] Returning barista recommendation.', { recommendation: recommendation });
    return recommendation;
}
