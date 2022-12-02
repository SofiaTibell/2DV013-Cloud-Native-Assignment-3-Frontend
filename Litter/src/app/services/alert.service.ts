import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  timeoutHandle: NodeJS.Timeout | undefined;
  alert: string[] = [];
  typeOfAlert = 'none';

  add(message: string, type: string): void {
    this.typeOfAlert = type;
    if (this.alert.length > 0) {
      this.clear();
    }
    this.alert.push(message);
    this.showAlert();
  }
  
  showAlert(): void {
    const handle = this.timeoutHandle;
    if (handle) {
      clearTimeout(handle);
    }
    this.timeoutHandle = setTimeout(() => {
      this.clear();
    }, 5000);
  }
  
  clear(): void {
    this.alert = [];
  }
}
