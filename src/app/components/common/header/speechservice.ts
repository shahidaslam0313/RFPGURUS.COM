import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}
@Injectable()
export class SpeechRecognitionService {
    speechRecognition: any;
    constructor(private zone: NgZone) {
    }
    record(): Observable<any> {
        return Observable.create(observer => {
            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            this.speechRecognition.continuous = true;
            this.speechRecognition.lang = 'en-us';
            this.speechRecognition.maxAlternatives = 1;
            this.speechRecognition.onresult = speech => {
                let term = '';
                if (speech.results) {
                    const result = speech.results[speech.resultIndex];
                    const transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {

                        } else {
                            term = transcript;
                        }
                    }
                }
                this.zone.run(() => {
                    observer.next(term);
                });
            };
            this.speechRecognition.onerror = error => {
                observer.error(error);
            };
            this.speechRecognition.onend = () => {
                observer.complete();
            };
            this.speechRecognition.start();
        });
    }
    stop = () => {
        this.speechRecognition.stop();
    }
}
