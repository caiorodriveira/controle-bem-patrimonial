import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { BemService } from 'src/app/services/bem/bem.service';
import Swal from 'sweetalert2';
import { EditarBemComponent } from '../editar-bem/editar-bem.component';


@Component({
  selector: 'app-scanear-bem',
  templateUrl: './scanear-bem.component.html',
  styleUrls: ['./scanear-bem.component.scss']
})
export class ScanearBemComponent {
    config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },
    // canvasStyles: [
    //   { /* layer */
    //     lineWidth: 1,
    //     fillStyle: '#00950685',
    //     strokeStyle: '#00950685',
    //   },
    //   { /* text */
    //     font: '17px serif',
    //     fillStyle: '#ff0000',
    //     strokeStyle: '#ff0000',
    //   }
    // ],
  };

  carregando: boolean = false;
  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  constructor(private codigo: NgxScannerQrcodeService, private bemService: BemService, public dialogRef: MatDialogRef<ScanearBemComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public buscar: boolean ) { }

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      this.handle(this.action, 'start');
    });
  }

  ngOnDestroy(): void {
    this.handle(this.action, 'stop');
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any) {
    if(e[0].type != 64){
      e && action && action.pause();
      this.action.pause();
      this.validarCodigo(e[0]);
    }

  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  validarCodigo(resultado: ScannerQRCodeResult){

    if(this.buscar){
      this.bemService.buscarBemPorCodigo(resultado.value).subscribe({
        next: (res) => {
          this.dialog.open(EditarBemComponent, {data: res});
          this.dialogRef.close();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Bem não encontrado ou código inválido',
            confirmButtonText: 'Scanear novamente',
            denyButtonText: 'Cancelar',
            showDenyButton: true
          }).then((res) => {
            if(res.isConfirmed) this.action.play();
            else this.action.stop() && this.dialogRef.close();
          })
        }
      })
    } else {
      this.dialogRef.close(resultado.value);
    }

  }


}
