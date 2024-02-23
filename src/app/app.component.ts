import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IElectronAPI } from './electron';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  nvmVersionsList = signal<string[]>([]);
  outputLog = signal('');
  commandInProgress = signal(false);

  nvmVersion?: string;
  currentNvmVersion = signal('');

  private onOutput = (): void => {
    this.loadAllNvmVersions();
    this.commandInProgress.set(false);
    this.changeDetectorRef.detectChanges();
  };
  private pushToLog = (data: string): void => {
    if (data) {
      this.outputLog.set(this.outputLog() + data);
      this.changeDetectorRef.detectChanges();
    }
  };

  get electronApi(): IElectronAPI {
    return window.electronAPI;
  }

  ngOnInit(): void {
    this.loadAllNvmVersions();
  }

  loadAllNvmVersions(): void {
    try {
      this.electronApi.execNvmCmd('list', (output: string) => {
        const versionsList = output.match(/\d+\.\d+\.\d+/g);
        const currentVersionMatch = output.match(/\* (\d+\.\d+\.\d+)/);
        this.nvmVersionsList.set(versionsList || []);
        this.currentNvmVersion.set(
          currentVersionMatch ? currentVersionMatch[1] || '' : '',
        );
        this.changeDetectorRef.detectChanges();
      });
    } catch (e) {}
  }

  changeNvmVersion(version: string): void {
    this.executeNvmCommand(`use ${version}`);
  }

  uninstallNvmVersion(version: string): void {
    const confirmed = confirm(
      `Are you sure you want to uninstall version ${version}?`,
    );
    if (!confirmed) {
      return;
    }
    this.executeNvmCommand(`uninstall ${version}`);
  }

  installNvmVersion(version?: string): void {
    if (!version) {
      return;
    }
    this.executeNvmCommand(`install ${version}`);
  }

  openLink(url: string): void {
    this.electronApi.openExternalUrl(url);
  }

  private executeNvmCommand(command: string): void {
    this.commandInProgress.set(true);
    this.changeDetectorRef.detectChanges();
    this.electronApi.execNvmCmd(command, this.onOutput, this.pushToLog);
  }
}
