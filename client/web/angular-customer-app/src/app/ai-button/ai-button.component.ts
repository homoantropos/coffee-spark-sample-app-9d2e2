import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
import { initializeApp } from '@angular/fire/app';
import { AI, getAI, GoogleAIBackend, getGenerativeModel } from '@angular/fire/ai';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ai-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-button.component.html',
  styleUrls: ['./ai-button.component.scss']
})
export class AiButtonComponent {
  isBodyVisible = false;

  fbApp: any;

  constructor(private chatService: ChatService) { }

  toggleBody() {
    this.isBodyVisible = !this.isBodyVisible;
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.fbApp = initializeApp(environment.firebase);

    const ai = getAI(this.fbApp, { backend: new GoogleAIBackend() });

    const model = getGenerativeModel(ai, { model: "gemini-2.5-flash-lite" });

    if (file) {
      const prompt = "What do you see?";

      const imagePart = await this.fileToGenerativePart(file);

      // @ts-ignore
      const result = await model.generateContent([prompt, imagePart]);

      const response = result.response;

      const text = response.text();

      console.log(text);
    }
  }

  async fileToGenerativePart(file: any) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;

        if (typeof result === 'string') {
          resolve(result.split(',')[1]);
        }
      };

      reader.readAsDataURL(file);
    });

    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type
      },
      fileData: undefined
    };
  }
}
